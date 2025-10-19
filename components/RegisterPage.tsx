import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
    const { setPage, register } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'passenger' as UserRole,
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (role: UserRole) => {
        setFormData(prev => ({ ...prev, role }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Şifrələr eyni deyil.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Şifrə ən az 6 simvol olmalıdır.');
            return;
        }
        setIsLoading(true);
        const result = await register({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            password: formData.password
        });
        if (!result.success) {
            setError(result.message);
        }
        // On success, the AppContext will navigate to the login page
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                     <div className="flex justify-center items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                           <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_2)"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="white"/></g><defs><clipPath id="clip0_1_2"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Qeydiyyat</h1>
                    <p className="text-gray-500 mt-2">Hesab yaradın və başlayın</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputField label="Ad Soyad" name="name" value={formData.name} onChange={handleChange} placeholder="Ad Soyadınız" type="text" icon={<svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>} required />
                    <InputField label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" type="email" icon={<svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} required />
                    <InputField label="Telefon" name="phone" value={formData.phone} onChange={handleChange} placeholder="+994501234567" type="tel" icon={<svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.254 6.254l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>} required />
                    
                    <div>
                        <label className="text-sm font-medium text-gray-700">Hesab növü</label>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                            <RoleButton label="Sərnişin" isActive={formData.role === 'passenger'} onClick={() => handleRoleChange('passenger')} />
                            <RoleButton label="Sürücü" isActive={formData.role === 'driver'} onClick={() => handleRoleChange('driver')} />
                        </div>
                    </div>

                    <InputField label="Şifrə" name="password" value={formData.password} onChange={handleChange} placeholder="********" type="password" icon={<svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} required />
                    <InputField label="Şifrəni təsdiq edin" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="********" type="password" icon={<svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} required />
                    
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                        {isLoading ? 'Qeydiyyatdan keçirilir...' : 'Qeydiyyatdan keç'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500 space-y-2">
                    <p>
                        Artıq hesabınız var?{' '}
                        <button onClick={() => setPage('login')} className="font-medium text-blue-600 hover:underline">Daxil ol</button>
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

const RoleButton: React.FC<{label: string; isActive: boolean; onClick: () => void;}> = ({label, isActive, onClick}) => (
    <button type="button" onClick={onClick} className={`w-full py-2.5 text-sm font-semibold rounded-md border-2 transition-colors ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
        {label}
    </button>
);