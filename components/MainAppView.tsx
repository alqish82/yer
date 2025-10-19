// FIX: Implemented MainAppView component for logged-in users.
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Ride } from '../types';
import { suggestRoute } from '../services/geminiService';
import { RideDetailModal } from './RideDetailModal';
import { UserProfileModal } from './UserProfileModal';

const Header: React.FC = () => {
    const { currentUser, logout } = useAppContext();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    if (!currentUser) return null;

    return (
        <>
            <header className="bg-white shadow-sm p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <svg className="w-9 h-9 text-blue-600" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_2)"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#2563EB" /></g><defs><clipPath id="clip0_1_2"><rect width="24" height="24" fill="white" /></clipPath></defs></svg>
                        <h1 className="text-2xl font-bold text-gray-800">Yer<span className="text-blue-600">Var</span></h1>
                    </div>
                    <div className="flex items-center space-x-4">
                         <div className="text-right hidden sm:block">
                            <span className="font-semibold text-gray-700">{currentUser.name}</span>
                            <p className="text-xs text-gray-500 capitalize">{currentUser.role === 'driver' ? 'Sürücü' : 'Sərnişin'}</p>
                        </div>
                        <button onClick={() => setIsProfileModalOpen(true)} title="Profil Tənzimləmələri" className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors">
                            <img src={currentUser.avatar} alt="User Avatar" />
                        </button>
                        <button onClick={logout} className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            Çıxış
                        </button>
                    </div>
                </div>
            </header>
            {isProfileModalOpen && <UserProfileModal onClose={() => setIsProfileModalOpen(false)} />}
        </>
    );
}

const RideCard: React.FC<{ ride: Ride; onSelect: (ride: Ride) => void }> = ({ ride, onSelect }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(ride)}>
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-lg text-gray-800">{ride.from} → {ride.to}</p>
                <p className="text-sm text-gray-500">Çıxış: {new Date(ride.departureTime).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <p className="font-bold text-xl text-blue-600">{ride.price} ₼</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center">
                    {ride.driver.avatarLetter}
                </div>
                <span className="font-semibold text-gray-700">{ride.driver.name}</span>
            </div>
            <span className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-full">{ride.availableSeats} yer var</span>
        </div>
    </div>
);

const DriverDashboard: React.FC = () => {
    const { createRide, rides, currentUser } = useAppContext();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState('3');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestionLoading, setSuggestionLoading] = useState(false);
    
    const driverRides = rides.filter(ride => ride.driver.id === currentUser?.id);

    const handleSuggest = async () => {
        if (!from) return;
        setSuggestionLoading(true);
        const suggestion = await suggestRoute(from);
        if (!suggestion.startsWith("Error:")) {
            setTo(suggestion);
        }
        setSuggestionLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const rideData = {
            from,
            to,
            price: parseFloat(price),
            availableSeats: parseInt(seats, 10),
            departureTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // Set departure to 15 mins from now
        };
        await createRide(rideData);
        setFrom('');
        setTo('');
        setPrice('');
        setIsSubmitting(false);
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Yeni Gediş Yarat</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Haradan</label>
                            <input type="text" value={from} onChange={e => setFrom(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <div>
                             <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700">Haraya</label>
                                <button type="button" onClick={handleSuggest} disabled={suggestionLoading || !from} className="text-xs text-blue-600 hover:underline disabled:text-gray-400">
                                    {suggestionLoading ? 'Təklif alınır...' : 'AI Təklifi Al'}
                                </button>
                             </div>
                            <input type="text" value={to} onChange={e => setTo(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700">Qiymət (₼)</label>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Boş yer sayı</label>
                            <input type="number" value={seats} onChange={e => setSeats(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                           {isSubmitting ? 'Yaradılır...' : 'Elan et'}
                        </button>
                    </form>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Aktiv Gedişləriniz</h2>
                    <div className="space-y-4">
                       {driverRides.length > 0 ? (
                           driverRides.map(ride => <div key={ride.id} className="bg-white p-4 rounded-lg border">{ride.from} → {ride.to}</div>)
                       ) : (
                           <p className="text-gray-500">Hazırda aktiv gedişiniz yoxdur.</p>
                       )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StarRating: React.FC<{ rating: number; totalStars?: number }> = ({ rating, totalStars = 5 }) => {
    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <svg
                        key={index}
                        className={`w-5 h-5 ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            })}
        </div>
    );
};

const StarRatingInput: React.FC<{ onRate: (rating: number) => void }> = ({ onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);

    const handleClick = (rating: number) => {
        setCurrentRating(rating);
        onRate(rating);
    };

    return (
        <div className="flex items-center space-x-2">
            <div className="flex">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                            type="button"
                            key={ratingValue}
                            className={`p-1 focus:outline-none transition-colors ${
                                ratingValue <= (hoverRating || currentRating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            onClick={() => handleClick(ratingValue)}
                            onMouseEnter={() => setHoverRating(ratingValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            disabled={!!currentRating}
                            aria-label={`Rate ${ratingValue} out of 5 stars`}
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                    );
                })}
            </div>
            {currentRating > 0 && <span className="text-sm font-semibold text-green-600">Təşəkkürlər!</span>}
        </div>
    );
};

const PastRideCard: React.FC<{ ride: Ride }> = ({ ride }) => {
    const { currentUser, rateRide } = useAppContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const userRating = currentUser ? ride.passengerRatings?.[currentUser.id] : undefined;

    const handleRate = async (rating: number) => {
        setIsSubmitting(true);
        setError('');
        const result = await rateRide(ride.id, rating);
        if (!result.success) {
            setError(result.message);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-gray-800">{ride.from} → {ride.to}</p>
                    <p className="text-xs text-gray-500">{new Date(ride.departureTime).toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                 <p className="font-bold text-lg text-gray-600">{ride.price} ₼</p>
            </div>
             <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                     <div className="w-8 h-8 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center">
                        {ride.driver.avatarLetter}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">{ride.driver.name}</p>
                        <div className="flex items-center space-x-1">
                             <StarRating rating={ride.driver.rating} />
                             <span className="text-xs text-gray-500">({ride.driver.rating})</span>
                        </div>
                    </div>
                </div>
                 <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">Sizin rəyiniz:</p>
                    {userRating ? (
                        <div className="mt-1">
                            <StarRating rating={userRating} />
                        </div>
                    ) : (
                        <StarRatingInput onRate={handleRate} />
                    )}
                 </div>
            </div>
            {error && <p className="text-xs text-red-500 mt-2 text-right">{error}</p>}
        </div>
    );
};


const PassengerDashboard: React.FC = () => {
    const { rides, pastRides } = useAppContext();
    const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Mövcud Gedişlər</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rides.length > 0 ? (
                    rides.map(ride => <RideCard key={ride.id} ride={ride} onSelect={setSelectedRide} />)
                ) : (
                    <p className="text-gray-500 col-span-full">Hazırda mövcud gediş yoxdur.</p>
                )}
            </div>

            <div className="mt-12">
                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Keçmiş Gedişlər</h2>
                 <div className="space-y-4">
                    {pastRides.length > 0 ? (
                        pastRides.map(ride => <PastRideCard key={ride.id} ride={ride} />)
                    ) : (
                        <p className="text-gray-500">Keçmiş gedişiniz yoxdur.</p>
                    )}
                 </div>
            </div>

            {selectedRide && <RideDetailModal ride={selectedRide} onClose={() => setSelectedRide(null)} />}
        </div>
    );
};

export const MainAppView: React.FC = () => {
    const { currentUser } = useAppContext();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {currentUser?.role === 'driver' ? <DriverDashboard /> : <PassengerDashboard />}
            </main>
        </div>
    );
};