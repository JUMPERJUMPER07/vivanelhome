import React from 'react';
import { Language, ThinkingStyle } from '../types';
import TypingIndicator from './TypingIndicator';

interface SettingsModalProps {
  currentStyle: ThinkingStyle;
  onStyleChange: (style: ThinkingStyle) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  privacyMode: boolean;
  onTogglePrivacyMode: () => void;
  hasPinProtection: boolean;
  onSetPin: () => void;
  onRemovePin: () => void;
  autoLockMinutes: number;
  onAutoLockChange: (minutes: number) => void;
  onClose: () => void;
  t: any;
}

const styles: { id: ThinkingStyle; name: string; description: string; previewIcon: React.ReactNode }[] = [
  {
    id: 'Bounce',
    name: 'Bouncing Dots',
    description: 'Playful and friendly',
    previewIcon: (
      <div className="flex space-x-1 items-center h-4">
        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
      </div>
    )
  },
  {
    id: 'Pulse',
    name: 'Pulsing Orb',
    description: 'Subtle and calm',
    previewIcon: <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
  },
  {
    id: 'Orbit',
    name: 'Orbit Ring',
    description: 'Focused and technical',
    previewIcon: <div className="w-4 h-4 border-2 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
  },
  {
    id: 'Minimal',
    name: 'Minimal',
    description: 'Text only, no animation',
    previewIcon: <span className="w-8 h-0.5 bg-slate-300 rounded-full" />
  },
  {
    id: 'Hidden',
    name: 'Disabled',
    description: 'No indicator shown',
    previewIcon: (
      <div className="w-4 h-4 border border-slate-400 rounded-full relative flex items-center justify-center">
        <div className="w-full h-[1px] bg-slate-400 rotate-45 absolute" />
      </div>
    )
  }
];

const languageOptions: { id: Language; name: string; flag: string }[] = [
  { id: 'en', name: 'English', flag: 'EN' },
  { id: 'pt', name: 'Portugues', flag: 'PT' },
  { id: 'es', name: 'Espanol', flag: 'ES' },
  { id: 'fr', name: 'Francais', flag: 'FR' }
];

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentStyle,
  onStyleChange,
  language,
  setLanguage,
  privacyMode,
  onTogglePrivacyMode,
  hasPinProtection,
  onSetPin,
  onRemovePin,
  autoLockMinutes,
  onAutoLockChange,
  onClose,
  t
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl flex flex-col max-h-[90vh]">
        <div className="bg-slate-950 p-5 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-cyan-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            {t.settings}
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.language}</h3>
            <div className="grid grid-cols-2 gap-3">
              {languageOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLanguage(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                    language === opt.id
                      ? 'bg-cyan-50 border-cyan-500 shadow-sm text-cyan-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-200'
                  }`}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-[11px] font-bold tracking-wider text-white">
                    {opt.flag}
                  </span>
                  <span className="font-medium text-sm">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border-b border-slate-100 p-8 flex flex-col items-center justify-center min-h-[140px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t.livePreview}</span>
            {currentStyle === 'Hidden' ? (
              <div className="text-slate-400 italic text-sm border border-dashed border-slate-300 rounded-lg px-4 py-2 bg-white/50">
                {t.indicatorDisabled}
              </div>
            ) : (
              <div className="w-full max-w-[220px] transform scale-90 sm:scale-100 transition-transform">
                <TypingIndicator style={currentStyle} className="mb-0" label={t.thinking} />
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.selectStyle}</h3>

            <div className="space-y-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => onStyleChange(style.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                    currentStyle === style.id
                      ? 'border-cyan-500 bg-cyan-50/70 shadow-sm'
                      : 'border-slate-100 bg-white hover:border-cyan-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className={`font-semibold text-sm ${currentStyle === style.id ? 'text-cyan-800' : 'text-slate-700'}`}>
                      {style.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{style.description}</span>
                  </div>

                  <div className={`p-2 rounded-xl flex items-center justify-center w-11 h-11 ${
                    currentStyle === style.id ? 'bg-white shadow-sm' : 'bg-slate-50'
                  }`}
                  >
                    {style.previewIcon}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/70">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.securityTitle}</h3>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-800">{t.privacyMode}</div>
                    <div className="mt-1 text-sm text-slate-500">{t.privacyModeDesc}</div>
                  </div>
                  <button
                    onClick={onTogglePrivacyMode}
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                      privacyMode ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {privacyMode ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="font-semibold text-slate-800">{t.pinProtection}</div>
                <div className="mt-1 text-sm text-slate-500">{t.pinProtectionDesc}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={onSetPin}
                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                  >
                    {hasPinProtection ? t.changePin : t.setPin}
                  </button>
                  {hasPinProtection && (
                    <button
                      onClick={onRemovePin}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                    >
                      {t.removePin}
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="font-semibold text-slate-800">{t.autoLock}</div>
                <div className="mt-3 flex gap-2">
                  {[5, 10, 15].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => onAutoLockChange(minutes)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold ${
                        autoLockMinutes === minutes ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {minutes}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
