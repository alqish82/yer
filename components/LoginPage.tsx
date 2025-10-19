// FIX: Implementing LoginPage component.
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const LoginPage: React.FC = () => {
    const { setPage, login } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
        }
        // On success, AppContext will handle navigation
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_2)"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="white" /></g><defs><clipPath id="clip0_1_2"><rect width="24" height="24" fill="white" /></clipPath></defs></svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Xoş gəlmisiniz!</h1>
                    <p className="text-gray-500 mt-2">Hesabınıza daxil olun</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputField label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" icon={<svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} required />
                    <InputField label="Şifrə" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" type="password" icon={<svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} required />
                    
                    <div className="flex items-center justify-end">
                        <button type="button" onClick={() => setPage('forgot-password')} className="text-sm font-medium text-blue-600 hover:underline">Şifrəni unutmusunuz?</button>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                        {isLoading ? 'Daxil olunur...' : 'Daxil ol'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500 space-y-2">
                    <p>
                        Hesabınız yoxdur?{' '}
                        <button onClick={() => setPage('register')} className="font-medium text-blue-600 hover:underline">Qeydiyyatdan keç</button>
                    </p>
                     <p>
                        <button onClick={() => setPage('landing')} className="hover:underline">← Ana səhifəyə qayıt</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

const InputField: React.FC<{label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type: string; required?: boolean; icon: React.ReactElement;}> = 
({label, name, value, onChange, placeholder, type, required, icon}) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 relative">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {icon}
            </span>
            <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
    </div>
);