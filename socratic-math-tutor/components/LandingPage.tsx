import React from 'react';
import { BackgroundLayer } from './BackgroundElements';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface LandingPageProps {
  onStart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const flags: Record<Language, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
  es: '🇪🇸',
  fr: '🇫🇷'
};

const LandingPage: React.FC<LandingPageProps> = ({ onStart, language, setLanguage }) => {
  const t = translations[language];

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans">
      <BackgroundLayer />

      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 flex">
          {(Object.keys(flags) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-lg transition-all ${
                language === lang ? 'bg-white shadow-sm scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
              title={lang.toUpperCase()}
            >
              {flags[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="z-10 flex flex-col items-center text-center px-6 max-w-4xl animate-fade-in">
        <div className="mb-8 relative group cursor-default">
          <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl relative">
            <span className="text-5xl md:text-7xl">🦉</span>
            <div className="absolute -inset-4 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]">
              <div className="w-2 h-2 bg-white rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_10px_white]"></div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
          {t.landingTitle}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">
            Tutor
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-indigo-100 font-light max-w-2xl leading-relaxed mb-12 tracking-wide opacity-90">
          {t.landingSubtitle}
        </p>

        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t.startLearning}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </button>

        <div className="mt-16 text-white/30 text-xs font-medium uppercase tracking-[0.2em]">
          {t.poweredBy}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
