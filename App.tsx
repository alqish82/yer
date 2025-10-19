// FIX: Implementing root App component with context and routing.
import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { MainAppView } from './components/MainAppView';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';

const AppContent: React.FC = () => {
    const { page, currentUser, isLoading } = useAppContext();

    if (isLoading) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="text-xl font-semibold text-gray-700">Yüklənir...</div></div>
    }

    if (currentUser) {
        return <MainAppView />;
    }

    switch (page) {
        case 'login':
            return <LoginPage />;
        case 'register':
            return <RegisterPage />;
        case 'forgot-password':
            return <ForgotPasswordPage />;
        case 'reset-password':
            return <ResetPasswordPage />;
        case 'landing':
        default:
            return <LandingPage />;
    }
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
