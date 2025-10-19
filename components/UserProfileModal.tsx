
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const UserProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { currentUser, updateProfile, changePassword } = useAppContext();
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
    
    // State for profile form
    const [name, setName] = useState(currentUser?.name || '');
    const [phone, setPhone] = useState(currentUser?.phone || '');
    const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    // State for password form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: 'bg-gray-200' });


    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProfileLoading(true);
        setProfileMessage({ type: '', text: '' });

        // Phone number validation
        const phoneRegex = /^\+994\d{9}$/;
        if (!phoneRegex.test(phone)) {
            setProfileMessage({ type: 'error', text: 'Telefon nömrəsi +994XXXXXXXXX formatında olmalıdır.' });
            setIsProfileLoading(false);
            return;
        }

        const result = await updateProfile({ name, phone });
        if (result.success) {
            setProfileMessage({ type: 'success', text: result.message });
        } else {
            setProfileMessage({ type: 'error', text: result.message });
        }
        setIsProfileLoading(false);
    };
    
    const calculatePasswordStrength = (password: string) => {
        if (!password) {
            setPasswordStrength({ score: 0, label: '', color: 'bg-gray-200' });
            return;
        }
        
        let score = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
        };

        if (checks.length) score++;
        if (checks.lowercase) score++;
        if (checks.uppercase) score++;
        if (checks.number) score++;
        
        if (password.length < 8 || score <= 2) {
            setPasswordStrength({ score: 1, label: 'Zəif', color: 'bg-red-500' });
        } else if (score === 3) {
            setPasswordStrength({ score: 2, label: 'Orta', color: 'bg-yellow-500' });
        } else { // 4
            setPasswordStrength({ score: 3, label: 'Güclü', color: 'bg-green-500' });
        }
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pass = e.target.value;
        setNewPassword(pass);
        calculatePasswordStrength(pass);
    };


    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setPasswordMessage({ type: 'error', text: 'Yeni şifrələr eyni deyil.' });
            return;
        }
        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'Şifrə ən az 6 simvol olmalıdır.' });
            return;
        }
        setIsPasswordLoading(true);
        setPasswordMessage({ type: '', text: '' });
        const result = await changePassword({ currentPassword, newPassword });
        if (result.success) {
            setPasswordMessage({ type: 'success', text: result.message });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            calculatePasswordStrength(''); // Reset strength meter
        } else {
            setPasswordMessage({ type: 'error', text: result.message });
        }
        setIsPasswordLoading(false);
    };

    if (!currentUser) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 transform transition-transform duration-300 ease-in-out animate-fade-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Profil Tənzimləmələri</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>
                
                {/* User Info Display */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
                    <img src={currentUser.avatar} alt="User Avatar" className="w-16 h-16 rounded-full" />
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{currentUser.name}</h3>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                        <p className="text-sm text-gray-500">{currentUser.phone}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${currentUser.role === 'driver' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                           {currentUser.role === 'driver' ? 'Sürücü' : 'Sərnişin'}
                        </span>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-4">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <TabButton title="Profil" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                        <TabButton title="Şifrə" isActive={activeTab === 'password'} onClick={() => setActiveTab('password')} />
                    </nav>
                </div>

                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <InputField label="Ad Soyad" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" required />
                        <InputField label="Telefon" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" required />
                        {profileMessage.text && <p className={`text-sm text-center ${profileMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{profileMessage.text}</p>}
                        <button type="submit" disabled={isProfileLoading} className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                            {isProfileLoading ? 'Yenilənir...' : 'Yadda saxla'}
                        </button>
                    </form>
                )}

                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <InputField label="Hazırkı şifrə" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" required />
                        <div>
                            <InputField label="Yeni şifrə" name="newPassword" value={newPassword} onChange={handleNewPasswordChange} type="password" required />
                             {newPassword && (
                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div 
                                            className={`h-1.5 rounded-full ${passwordStrength.color}`}
                                            style={{ width: `${(passwordStrength.score / 3) * 100}%`, transition: 'width 0.3s ease-in-out' }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 w-12 text-right">{passwordStrength.label}</span>
                                </div>
                            )}
                        </div>
                        <InputField label="Yeni şifrəni təsdiq et" name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" required />
                        {passwordMessage.text && <p className={`text-sm text-center ${passwordMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{passwordMessage.text}</p>}
                        <button type="submit" disabled={isPasswordLoading} className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                           {isPasswordLoading ? 'Dəyişdirilir...' : 'Dəyişdir'}
                        </button>
                    </form>
                )}
                
                 <style>{`
                    .animate-fade-in {
                        animation: fade-in 0.2s ease-out forwards;
                    }
                    @keyframes fade-in {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                `}</style>
            </div>
        </div>
    );
};

const TabButton: React.FC<{title: string; isActive: boolean; onClick: () => void}> = ({title, isActive, onClick}) => (
    <button
        onClick={onClick}
        className={`${
            isActive
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none`}
    >
        {title}
    </button>
);


const InputField: React.FC<{label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type: string; required?: boolean;}> = 
({label, name, value, onChange, type, required}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
            <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
    </div>
);
