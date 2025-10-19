import React from 'react';
import { useAppContext } from '../context/AppContext';

const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; description: string; color: string }> = ({ icon, title, description, color }) => (
  <div className={`p-6 rounded-2xl bg-white border border-gray-200 shadow-sm`}>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mt-4">{title}</h3>
    <p className="text-gray-500 mt-2">{description}</p>
  </div>
);

const HowItWorksCard: React.FC<{ title: string; steps: string[]; color: string }> = ({ title, steps, color }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className={`text-2xl font-bold ${color}`}>{title}</h3>
        <ul className="mt-6 space-y-4">
            {steps.map((step, index) => (
                 <li key={index} className="flex items-start">
                    <span className={`mr-4 font-bold text-lg ${color}`}>{index + 1}.</span>
                    <span className="text-gray-600">{step}</span>
                </li>
            ))}
        </ul>
    </div>
);


export const LandingPage: React.FC = () => {
    const { setPage } = useAppContext();
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Header */}
      <header className="py-4 px-6 md:px-12">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-9 h-9 text-blue-600" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_2)"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#2563EB"/></g><defs><clipPath id="clip0_1_2"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
            <h1 className="text-2xl font-bold text-gray-800">Yer<span className="text-blue-600">Var</span></h1>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setPage('login')} className="text-gray-600 font-semibold hover:text-blue-600">Daxil ol</button>
            <button onClick={() => setPage('register')} className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">Qeydiyyat</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="text-center py-20 md:py-32 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter">YerVar — Yolda Qalma!</h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-500">Soruşma, bax, gör! Real vaxtda boş yerləri tap və ya təklif et.</p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button onClick={() => setPage('login')} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
            Sərnişin kimi daxil ol
          </button>
          <button onClick={() => setPage('login')} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0013.938 2H6.062a2.25 2.25 0 00-2.05 1.012L2.012 7.05A2.25 2.25 0 002 8.062v4.876a2.25 2.25 0 001.012 2.05l1.999 1.999a2.25 2.25 0 002.05 1.012h7.876a2.25 2.25 0 002.05-1.012l1.999-1.999a2.25 2.25 0 001.012-2.05V8.062a2.25 2.25 0 00-1.012-2.05L15.988 3.012zM12.938 4a.75.75 0 01.684.338l1.999 4.001a.75.75 0 01-.684 1.162H5.062a.75.75 0 01-.684-1.162l1.999-4.001A.75.75 0 017.062 4h5.876zM5 14a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" /></svg>
            Sürücü kimi daxil ol
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900">Niyə YerVar?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Real-time izləmə"
              description="Sürücünün harada olduğunu xəritədə canlı izləyin. Gəlmə vaxtını dəqiq bilin."
              color="bg-blue-100"
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
              title="Komissiyasız"
              description="Sürücülər gedişdən komissiya ödəmir. Sadəcə abunə sistemi."
              color="bg-green-100"
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
              title="Təhlükəsizlik"
              description="Verifikasiya olunmuş sürücülər, reytinq sistemi və SOS düyməsi."
              color="bg-purple-100"
            />
          </div>
        </div>
      </section>

       {/* How it works Section */}
       <section className="py-20 px-6 md:px-12">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900">Necə İşləyir?</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
                   <HowItWorksCard 
                        title="Sərnişin üçün"
                        color="text-blue-600"
                        steps={[
                            "Tətbiqi aç, haradan-haraya gedəcəyini seç",
                            "Mövcud təklifləri xəritədə gör",
                            "Sürücü ilə əlaqə saxla və rezerv et",
                            "Real vaxtda izlə və yola çıx!"
                        ]}
                   />
                   <HowItWorksCard 
                        title="Sürücü üçün"
                        color="text-green-600"
                        steps={[
                            'Elan yarat: "Yer var!" statusu əlavə et',
                            "Sərnişinlərdən müraciət gözlə",
                            '"Hərəkətə başladım" düyməsinə bas',
                            "GPS-lə sərnişinlərə görün və qazanc əldə et!"
                        ]}
                   />
                </div>
            </div>
       </section>
      
       {/* Final CTA */}
       <section className="bg-blue-600">
        <div className="container mx-auto py-20 px-6 text-center">
            <h2 className="text-4xl font-extrabold text-white">Hazırsan? İndi başla!</h2>
            <p className="mt-4 text-lg text-blue-200">Sərnişinlər üçün tamamilə pulsuzdur</p>
            <button onClick={() => setPage('register')} className="mt-8 bg-white text-blue-600 font-bold px-10 py-4 rounded-lg text-lg hover:bg-gray-100 transition-transform hover:scale-105">
                İndi Qeydiyyatdan Keç
            </button>
        </div>
       </section>
    </div>
  );
};
