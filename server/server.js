const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

// --- MIDDLEWARE ---
app.use(cors({
    // A more permissive CORS configuration for development to handle various client origins.
    origin: (origin, callback) => callback(null, true),
    credentials: true
})); 
app.use(express.json());
app.use(cookieParser());

// Robust Session Middleware Setup
app.use(session({
    secret: 'yer-var-super-secret-key-change-in-production', // Should be a long, random string from env variables
    resave: false,
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
        secure: false, // Set to true if you are using https
        httpOnly: true, // Prevents client-side JS from reading the cookie
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));


// --- IN-MEMORY DATABASE (for simulation) ---
let users = [];
let rides = [];
let pastRides = [];
const passwordResetTokens = {}; // Store: { email: { token: '...', expires: 123456789 } }

const initializeData = async () => {
    // USERS DATA (with hashed passwords)
    const driverPassword = await bcrypt.hash('driverpass', 10);
    const passengerPassword = await bcrypt.hash('password123', 10);
    
    users = [
        {
            id: 'driver-1',
            name: 'Rəşad Həsənov',
            email: 'rashad@example.com',
            phone: '+994559876543',
            role: 'driver',
            passwordHash: driverPassword,
            rating: 4.8,
            ratingCount: 25,
        },
        {
            id: 'driver-2', // Added another driver for variety
            name: 'Leyla Əliyeva',
            email: 'leyla@example.com',
            phone: '+994511234567',
            role: 'driver',
            passwordHash: await bcrypt.hash('leylapass', 10),
            rating: 4.9,
            ratingCount: 42,
        },
        {
            id: '1',
            name: 'Elvin Məmmədov',
            email: 'elvin@example.com',
            phone: '+994501234567',
            role: 'passenger',
            passwordHash: passengerPassword,
        }
    ];

    // RIDES DATA
    rides = [
        {
          id: 'ride-1',
          from: 'Bakı, 28 May',
          to: 'Sumqayıt',
          departureTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          availableSeats: 3,
          price: 5,
          driver: {
            id: 'driver-1',
            name: 'Rəşad Həsənov',
            rating: users.find(u => u.id === 'driver-1').rating, // Dynamic rating
            vehicle: 'Mercedes Vito',
            avatarLetter: 'R'
          },
          passengers: [],
          eta: 45,
          passengerRatings: {},
        },
         {
          id: 'ride-2',
          from: 'Bakı, Nərimanov',
          to: 'Gəncə',
          departureTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          availableSeats: 2,
          price: 15,
          driver: {
            id: 'driver-2',
            name: 'Leyla Əliyeva',
            rating: users.find(u => u.id === 'driver-2').rating, // Dynamic rating
            vehicle: 'Mercedes E-Class',
            avatarLetter: 'L'
          },
          passengers: [],
          eta: 240,
          passengerRatings: {},
        },
    ];
    
    // PAST RIDES DATA
    pastRides = [
        {
            id: 'past-ride-1',
            from: 'İçərişəhər',
            to: 'Gənclik Mall',
            departureTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            availableSeats: 0,
            price: 4,
            driver: {
              id: 'driver-1',
              name: 'Rəşad Həsənov',
              rating: users.find(u => u.id === 'driver-1').rating,
              vehicle: 'Mercedes Vito',
              avatarLetter: 'R'
            },
            passengers: [{ id: '1', name: 'Elvin Məmmədov' }],
            passengerRatings: {},
        },
        {
            id: 'past-ride-2',
            from: 'Heydər Əliyev Mərkəzi',
            to: 'Nizami küçəsi',
            departureTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            availableSeats: 0,
            price: 3,
            driver: {
              id: 'driver-2',
              name: 'Leyla Əliyeva',
              rating: users.find(u => u.id === 'driver-2').rating,
              vehicle: 'Mercedes E-Class',
              avatarLetter: 'L'
            },
            passengers: [{ id: '1', name: 'Elvin Məmmədov' }],
            passengerRatings: {
                 '1': 5 // Example: Elvin has already rated this ride with 5 stars
            },
        }
    ];

    console.log('Initial data and users seeded successfully.');
};

// --- ROUTER ---
const apiRouter = express.Router();


// AUTHENTICATION
apiRouter.post('/auth/register', async (req, res) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return res.status(400).json({ message: 'Bütün xanaları doldurun.' });
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Bu email ilə artıq hesab mövcuddur.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), name, email, phone, role, passwordHash };
    if (role === 'driver') {
        newUser.rating = 0;
        newUser.ratingCount = 0;
    }
    users.push(newUser);
    console.log('New user registered:', { id: newUser.id, email: newUser.email });
    res.status(201).json({ message: 'Qeydiyyat uğurlu oldu! İndi daxil ola bilərsiniz.' });
});

apiRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Email və ya şifrə yanlışdır.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Email və ya şifrə yanlışdır.' });
    }

    const { passwordHash, ...userWithoutPassword } = user;
    
    // Store user info in session
    req.session.user = userWithoutPassword;

    res.json({ message: 'Uğurla daxil oldunuz!', user: userWithoutPassword });
});

apiRouter.post('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again.' });
    }
    res.clearCookie('connect.sid'); // The default cookie name for express-session
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// PASSWORD RECOVERY
apiRouter.post('/auth/forgot-password', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
        const token = uuidv4().slice(0, 8).toUpperCase(); // Simple 8-char token for simulation
        const expires = Date.now() + 15 * 60 * 1000; // Token is valid for 15 minutes
        passwordResetTokens[email] = { token, expires };
        console.log(`--- PASSWORD RESET REQUEST --- | User: ${email} | Reset Token: ${token} ---`);
    }
    res.json({ message: 'Əgər bu email ilə hesab mövcuddursa, bərpa kodu konsola göndərildi.' });
});

apiRouter.post('/auth/reset-password', async (req, res) => {
    const { email, token, newPassword } = req.body;
    const tokenInfo = passwordResetTokens[email];

    if (!tokenInfo || tokenInfo.token !== token || Date.now() > tokenInfo.expires) {
        return res.status(400).json({ message: 'Bərpa kodu yanlış və ya müddəti bitib.' });
    }
    
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'İstifadəçi tapılmadı.' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    delete passwordResetTokens[email]; // Invalidate the token after use

    res.json({ message: 'Şifrəniz uğurla yeniləndi!' });
});

// --- PROTECTED ROUTES (Middleware to check session) ---
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).json({ message: "Authentication required" });
};

// USER PROFILE
apiRouter.get('/user/me', requireAuth, (req, res) => {
    // The user object is already attached to the session
    res.json(req.session.user);
});

apiRouter.put('/user/profile', requireAuth, (req, res) => {
    const { name, phone } = req.body;
    const user = users.find(u => u.id === req.session.user.id);
    if (user) {
        user.name = name || user.name;
        user.phone = phone || user.phone;
        const { passwordHash, ...userWithoutPassword } = user;
        // Update the session user
        req.session.user = userWithoutPassword;
        res.json({ message: "Profil uğurla yeniləndi!", user: userWithoutPassword });
    } else {
        res.status(404).json({ message: "İstifadəçi tapılmadı." });
    }
});

apiRouter.post('/user/change-password', requireAuth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = users.find(u => u.id === req.session.user.id);

    if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı." });
    
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Hazırkı şifrə yanlışdır." });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    res.json({ message: "Şifrə uğurla dəyişdirildi!" });
});


// RIDES
apiRouter.get('/rides', (req, res) => {
    // Make sure driver ratings are up-to-date
    const currentRides = rides.map(ride => {
        const driver = users.find(u => u.id === ride.driver.id);
        if (driver) {
            ride.driver.rating = driver.rating;
        }
        return ride;
    });
    res.json(currentRides);
});

apiRouter.get('/rides/past', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    // Return past rides where the user was a passenger
    const userPastRides = pastRides.filter(ride => 
        ride.passengers.some(p => p.id === userId)
    ).map(ride => {
        // also ensure rating is up-to-date
        const driver = users.find(u => u.id === ride.driver.id);
         if (driver) {
            ride.driver.rating = driver.rating;
        }
        return ride;
    });
    res.json(userPastRides);
});

apiRouter.post('/rides/:rideId/rate', requireAuth, (req, res) => {
    const { rideId } = req.params;
    const { rating } = req.body;
    const passengerId = req.session.user.id;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    const ride = pastRides.find(r => r.id === rideId);
    if (!ride) {
        return res.status(404).json({ message: "Ride not found." });
    }

    if (!ride.passengers.some(p => p.id === passengerId)) {
        return res.status(403).json({ message: "You were not a passenger on this ride." });
    }

    if (ride.passengerRatings && ride.passengerRatings[passengerId]) {
        return res.status(400).json({ message: "You have already rated this ride." });
    }

    // Update rating
    ride.passengerRatings = ride.passengerRatings || {};
    ride.passengerRatings[passengerId] = rating;

    // Update driver's average rating
    const driver = users.find(u => u.id === ride.driver.id);
    if (driver) {
        const currentRating = driver.rating || 0;
        const ratingCount = driver.ratingCount || 0;
        driver.rating = ((currentRating * ratingCount) + rating) / (ratingCount + 1);
        driver.ratingCount = ratingCount + 1;
        driver.rating = Math.round(driver.rating * 10) / 10; // round to 1 decimal place
    }
    
    res.status(200).json({ success: true, message: "Rating submitted successfully." });
});

apiRouter.post('/rides/create', requireAuth, (req, res) => {
    const { from, to, price, availableSeats, departureTime } = req.body;
    const driver = users.find(u => u.id === req.session.user.id);

    if (!driver || driver.role !== 'driver') {
        return res.status(403).json({ message: "Only drivers can create rides." });
    }

    const newRide = {
        id: uuidv4(), from, to, price, availableSeats, departureTime,
        passengers: [],
        passengerRatings: {},
        driver: {
            id: driver.id,
            name: driver.name,
            rating: driver.rating,
            vehicle: 'Mercedes Vito',
            avatarLetter: driver.name.charAt(0).toUpperCase()
        }
    };
    rides.unshift(newRide);
    res.status(201).json(newRide);
});

app.use('/api', apiRouter);

// Asynchronous startup function
const startServer = async () => {
  try {
    await initializeData();
    
    app.listen(port, () => {
      console.log(`YerVar server is running and ready on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();