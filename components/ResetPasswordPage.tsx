import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const ResetPasswordPage: React.FC = () => {
    const { setPage, resetPassword } = useAppContext();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (password !== confirmPassword) {
            setError('Şifrələr eyni deyil.');
            return;
        }
        if (password.length < 6) {
            setError('Şifrə ən az 6 simvol olmalıdır.');
            return;
        }
        setIsLoading(true);
        
        const result = await resetPassword({ email, token, newPassword: password });

        setIsLoading(false);
        if (result.success) {
            setMessage('Şifrəniz uğurla dəyişdirildi. Daxil ol səhifəsinə yönləndirilirsiniz...');
            setTimeout(() => setPage('login'), 2000);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Yeni şifrə təyin et</h1>
                    <p className="text-gray-500 mt-2">Məlumatları daxil edərək şifrənizi yeniləyin.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputField label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" required />
                    <InputField label="Bərpa Kodu" name="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Server konsolundakı kodu daxil edin" type="text" required />
                    <InputField label="Yeni Şifrə" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" type="password" required />
                    <InputField label="Yeni Şifrəni təsdiq et" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" type="password" required />
                    
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    {message && <p className="text-sm text-green-600 text-center">{message}</p>}

                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                        {isLoading ? 'Dəyişdirilir...' : 'Şifrəni dəyiş'}
                    </button>
                </form>
                 <div className="text-center text-sm text-gray-500">
                    <button onClick={() => setPage('login')} className="hover:underline">← Daxil ol səhifəsinə qayıt</button>
                </div>
            </div>
        </div>
    );
};

const InputField: React.FC<{label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type: string; required?: boolean;}> = 
({label, name, value, onChange, placeholder, type, required}) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
            <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
    </div>
);
