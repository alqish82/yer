// FIX: Replaced placeholder content with actual type definitions.
export type UserRole = 'passenger' | 'driver';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string; // data URI for SVG avatar
  rating?: number;
  ratingCount?: number;
}

// This is the shape of driver info nested inside a Ride object
export interface RideDriver {
  id:string;
  name: string;
  rating: number;
  vehicle: string;
  avatarLetter: string;
}

export interface Ride {
  id: string;
  from: string;
  to: string;
  departureTime: string; // ISO string
  availableSeats: number;
  price: number;
  driver: RideDriver;
  passengers: { id: string; name: string; avatar?: string; }[];
  eta?: number; // minutes
  passengerRatings?: { [passengerId: string]: number };
}

export type Page = 'landing' | 'login' | 'register' | 'forgot-password' | 'reset-password';

export interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: Omit<User, 'id' | 'avatar'> & { password?: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (data: { email: string, token: string, newPassword: string}) => Promise<{ success: boolean; message: string }>;
  updateProfile: (data: { name: string, phone: string }) => Promise<{ success: boolean; message: string; user?: User }>;
  changePassword: (data: { currentPassword: string, newPassword: string }) => Promise<{ success: boolean; message: string }>;
  rides: Ride[];
  pastRides: Ride[];
  createRide: (rideData: Omit<Ride, 'id' | 'driver' | 'passengers'>) => Promise<{ success: boolean; message: string; ride?: Ride }>;
  fetchRides: () => void;
  rateRide: (rideId: string, rating: number) => Promise<{ success: boolean; message: string }>;
}