import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const ForgotPasswordPage: React.FC = () => {
    const { setPage, forgotPassword } = useAppContext();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        const result = await forgotPassword(email);
        
        setIsLoading(false);
        if (result.success) {
            setMessage("Bərpa kodu üçün server konsolunu yoxlayın. Növbəti səhifəyə yönləndirilirsiniz...");
            setTimeout(() => setPage('reset-password'), 3000);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Şifrəni unutmusunuz?</h1>
                    <p className="text-gray-500 mt-2">Emailinizi daxil edin, sizə bərpa kodu göndərək (konsola).</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputField label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" required />
                    
                    {message && <p className="text-sm text-green-600 text-center">{message}</p>}
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}


                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                        {isLoading ? 'Göndərilir...' : 'Bərpa Kodu Göndər'}
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
