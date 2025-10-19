// FIX: Implemented AppContext to manage application state.
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Ride, Page, AppContextType } from '../types';
import { generateAvatar } from '../utils/avatar';
import { notificationService } from '../services/notificationService';

const API_BASE_URL = 'http://localhost:3001/api';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rides, setRides] = useState<Ride[]>([]);
  const [pastRides, setPastRides] = useState<Ride[]>([]);

  const fetchCurrentUser = useCallback(async () => {
    // A more robust solution would use httpOnly cookies or secure tokens.
    // For this simulation, we check localStorage first.
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser({ ...user, avatar: generateAvatar(user.email) });
        setIsLoading(false);
        return;
    }
    // If not in localStorage, try fetching from a session (simulated)
    try {
      const response = await fetch(`${API_BASE_URL}/user/me`, {credentials: 'include'});
      if (response.ok) {
        const user = await response.json();
        const userWithAvatar = { ...user, avatar: generateAvatar(user.email) };
        setCurrentUser(userWithAvatar);
        localStorage.setItem('currentUser', JSON.stringify(userWithAvatar));
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processRides = (rides: any[]): Ride[] => {
    return rides.map(ride => ({
        ...ride,
        driver: {
            ...ride.driver,
            avatarLetter: ride.driver.name.charAt(0).toUpperCase()
        }
    }));
  };

  const fetchRides = useCallback(async () => {
    try {
        const [ridesResponse, pastRidesResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/rides`, {credentials: 'include'}),
            fetch(`${API_BASE_URL}/rides/past`, {credentials: 'include'})
        ]);
        if (ridesResponse.ok) {
            const data = await ridesResponse.json();
            setRides(processRides(data));
        }
        if (pastRidesResponse.ok) {
            const data = await pastRidesResponse.json();
            setPastRides(processRides(data));
        }
    } catch (error) {
        console.error("Error fetching rides:", error);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchRides();
      notificationService.requestPermission();
    }
  }, [currentUser, fetchRides]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const userWithAvatar = { ...data.user, avatar: generateAvatar(data.user.email) };
        setCurrentUser(userWithAvatar);
        localStorage.setItem('currentUser', JSON.stringify(userWithAvatar));
        return { success: true, message: 'Login successful' };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: 'An error occurred' };
    }
  };

  const register = async (userData: Omit<User, 'id' | 'avatar'> & { password?: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        notificationService.showNotification('Welcome!', { body: 'Registration successful. Please log in.' });
        setPage('login');
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch (error) {
      return { success: false, message: 'An error occurred' };
    }
  };

  const logout = async () => {
    try {
        await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        setPage('landing');
    }
  };

  const forgotPassword = async (email: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return { success: response.ok, message: data.message };
    } catch (error) {
        return { success: false, message: 'An error occurred' };
    }
  };
  
  const resetPassword = async (data: { email: string, token: string, newPassword: string}) => {
     try {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const resData = await response.json();
        return { success: response.ok, message: resData.message };
    } catch (error) {
        return { success: false, message: 'An error occurred' };
    }
  };
  
  const updateProfile = async (data: { name: string, phone: string }) => {
      if (!currentUser) return { success: false, message: "Not logged in" };
      try {
          const response = await fetch(`${API_BASE_URL}/user/profile`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include', // Important for session-based auth
              body: JSON.stringify(data),
          });
          const resData = await response.json();
          if (response.ok) {
              const updatedUser = { ...currentUser, ...resData.user };
              setCurrentUser(updatedUser);
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
              return { success: true, message: resData.message, user: updatedUser };
          }
          return { success: false, message: resData.message };
      } catch (error) {
          return { success: false, message: 'An error occurred' };
      }
  };

  const changePassword = async (data: { currentPassword: string, newPassword: string }) => {
      if (!currentUser) return { success: false, message: "Not logged in" };
      try {
          const response = await fetch(`${API_BASE_URL}/user/change-password`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(data),
          });
          const resData = await response.json();
          return { success: response.ok, message: resData.message };
      } catch (error) {
          return { success: false, message: 'An error occurred' };
      }
  };


  const createRide = async (rideData: Omit<Ride, 'id' | 'driver' | 'passengers'>) => {
    if (!currentUser || currentUser.role !== 'driver') {
      return { success: false, message: 'Only drivers can create rides.' };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/rides/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(rideData),
      });
      const newRide = await response.json();
      if (response.ok) {
        setRides(prev => [processRides([newRide])[0], ...prev]);
        notificationService.showNotification('Ride Created!', { body: `Your ride from ${newRide.from} to ${newRide.to} is live.` });
        return { success: true, message: 'Ride created successfully', ride: newRide };
      }
      return { success: false, message: newRide.message || 'Failed to create ride' };
    } catch (error) {
      return { success: false, message: 'An error occurred' };
    }
  };

  const rateRide = async (rideId: string, rating: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rides/${rideId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rating }),
      });
      const data = await response.json();
      if (response.ok && currentUser) {
        // Update local state to immediately reflect the change
        setPastRides(prevRides => 
            prevRides.map(ride => {
                if (ride.id === rideId) {
                    const newRatings = { ...(ride.passengerRatings || {}), [currentUser.id]: rating };
                    return { ...ride, passengerRatings: newRatings };
                }
                return ride;
            })
        );
        // Also refetch all rides to get updated driver ratings
        fetchRides();
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'An error occurred while submitting rating.' };
    }
  };

  const value: AppContextType = {
    page,
    setPage,
    currentUser,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
    rides,
    pastRides,
    createRide,
    fetchRides,
    rateRide
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};