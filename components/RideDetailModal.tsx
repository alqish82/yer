import React from 'react';
import { Ride } from '../types';

export const RideDetailModal: React.FC<{ ride: Ride; onClose: () => void }> = ({ ride, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-50" onClick={onClose}>
            <div 
                className="bg-white w-full max-w-2xl rounded-t-2xl shadow-2xl p-8 transform transition-transform duration-300 ease-in-out animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                        <svg className="w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Real-time xəritə</h2>
                    <p className="text-gray-500">Sürücü hərəkətdədir</p>
                </div>
                
                {/* Driver Info */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 font-bold text-xl rounded-full flex items-center justify-center">
                            {ride.driver.avatarLetter}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{ride.driver.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                <svg className="w-4 h-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <span>{ride.driver.rating}</span>
                                <span className="text-gray-300">|</span>
                                <span>{ride.driver.vehicle}</span>
                            </div>
                        </div>
                    </div>
                     <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">{ride.price} ₼</p>
                        <p className="text-sm text-gray-500">{ride.driver.vehicle}</p>
                    </div>
                </div>

                {/* Route Info */}
                <div className="space-y-3 my-6">
                    <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3 border border-green-200">
                        <div className="w-5 h-5 flex items-center justify-center bg-green-200 rounded-full">
                           <svg className="w-3 h-3 text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
                        </div>
                        <div>
                            <p className="text-xs text-green-700">Başlanğıc</p>
                            <p className="font-semibold text-green-900">{ride.from}</p>
                        </div>
                    </div>
                     <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-3 border border-red-200">
                        <div className="w-5 h-5 flex items-center justify-center bg-red-200 rounded-full">
                           <svg className="w-3 h-3 text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
                        </div>
                        <div>
                            <p className="text-xs text-red-700">Bitmə</p>
                            <p className="font-semibold text-red-900">{ride.to}</p>
                        </div>
                    </div>
                </div>
                
                {/* ETA */}
                <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between border border-blue-200">
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-semibold text-blue-900">Təxmini çatma vaxtı</span>
                    </div>
                    <span className="text-xl font-bold text-blue-900">{ride.eta || '--'} dəqiqə</span>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.254 6.254l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                    <span>Sürücü ilə əlaqə saxla</span>
                </button>
                {/* FIX: Removed non-standard 'jsx' prop from <style> tag. */}
                <style>{`
                    .animate-slide-up {
                        animation: slide-up 0.3s ease-out forwards;
                    }
                    @keyframes slide-up {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};