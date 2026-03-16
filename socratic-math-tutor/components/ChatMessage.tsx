import React, { useEffect, useRef, useState } from 'react';
import { translateText } from '../services/geminiService';
import { Language, Message } from '../types';
import { socraticInsightsTranslations } from '../utils/translations';

interface ChatMessageProps {
  message: Message;
  language: Language;
  t: any;
}

declare global {
  interface Window {
    katex: any;
  }
}

const CompassIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.729 2.756.75.75 0 0 0 1.487.185 2.336 2.336 0 0 1 2.242-2.242V6Zm1.42 6.81a.75.75 0 0 0-1.42.48v.535a2.336 2.336 0 0 1-2.242 2.242.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 1.5 0v-.816a3.836 3.836 0 0 0 1.729-2.756.75.75 0 0 0-1.487-.185Z" clipRule="evenodd" />
  </svg>
);

const QuestionMarkCircleIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.539 1.345 1.402 3.755.053 4.956-.379.338-.86.726-1.123 1.091a.75.75 0 0 1-1.218-.868c.365-.513.916-.957 1.353-1.346.993-.884 1.11-2.122-.052-2.705ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
  </svg>
);

const SpeakerIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
  </svg>
);

const StopIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
  </svg>
);

const GlobeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.03 8.25c0-.986.233-1.921.648-2.753A7.501 7.501 0 0 1 12 3.75c1.68 0 3.238.562 4.498 1.516a9.011 9.011 0 0 1-1.884 1.34A12.01 12.01 0 0 0 12 6c-1.396 0-2.72.23-3.97.643.072.531.134 1.069.185 1.607Zm3.023 6.643c.18 1.196.444 2.378.784 3.535a7.502 7.502 0 0 1-3.692-2.316 11.966 11.966 0 0 0 2.908-1.219Zm-2.908-2.643c-.234-.963-.377-1.967-.417-2.992.934.34 1.91.597 2.916.762-.057 1.053-.134 2.115-.228 3.18-.75-.246-1.482-.544-2.188-.888l-.083-.062Zm10.025-1.423c.34-.972.597-1.983.763-3.024a7.485 7.485 0 0 1 2.38 3.425c-.97.228-1.97.363-2.986.402l-.157.006.002-.409Zm-5.334 3.488a38.48 38.48 0 0 1-1.632-3.877c1.396-.239 2.825-.366 4.276-.374l.156.004c-.066 1.48-.65 2.902-1.638 4.14-.388.083-.78.151-1.173.207h.011ZM7.766 12c.164 1.53.42 3.033.762 4.5.88.167 1.772.288 2.677.36.195-1.3.33-2.617.402-3.945-1.297-.083-2.573-.298-3.805-.63l-.036-.01V12Zm9.332 5.068a11.97 11.97 0 0 1-2.907 1.219 16.516 16.516 0 0 1-.785-3.535c1.405.344 2.766.76 4.072 1.233l-.38.083Z" clipRule="evenodd" />
  </svg>
);

interface SocraticQuestionLineProps {
  children: React.ReactNode;
  insightText: string;
  t: any;
}

const SocraticQuestionLine: React.FC<SocraticQuestionLineProps> = ({ children, insightText, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative my-4 group/question" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-400 via-sky-400 to-amber-300 rounded-full opacity-80" />
      <div className="ml-3 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-cyan-50/60 border border-cyan-100 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/question:animate-[shimmer_2s_infinite]" />
        <div className="relative z-10 flex justify-between items-start gap-3 p-3 pl-4">
          <div className="text-slate-800 font-medium leading-relaxed flex-1">{children}</div>
          <div className="relative shrink-0 mt-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
                isOpen ? 'bg-slate-950 border-slate-950 text-white' : 'bg-white border-cyan-100 text-cyan-700 hover:bg-cyan-50'
              }`}
              aria-label={t.whyQuestion}
              title={t.whyTooltip}
            >
              <QuestionMarkCircleIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{t.whyQuestion}</span>
            </button>

            <div className={`absolute right-0 bottom-full w-64 pb-3 z-30 min-h-[1rem] ${!isOpen && 'hidden'}`}>
              <div className="bg-slate-900 text-white text-xs p-4 rounded-2xl shadow-xl relative ring-1 ring-white/10 backdrop-blur-xl">
                <div className="flex justify-between items-start mb-2 border-b border-white/10 pb-2">
                  <div className="font-bold text-cyan-200 uppercase text-[10px] tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {t.socraticInsight}
                  </div>
                </div>
                <p className="leading-relaxed text-slate-200">{insightText}</p>
                <div className="absolute right-5 -bottom-1.5 w-3 h-3 bg-slate-900 border-r border-b border-slate-700/50 rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const cleanTextForSpeech = (text: string): string =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/\$\$(.*?)\$\$/g, '$1')
    .replace(/\$(.*?)\$/g, '$1')
    .replace(/^[\*\-]\s/gm, '')
    .replace(/^\d+\.\s/gm, '');

const ChatMessage: React.FC<ChatMessageProps> = ({ message, language, t }) => {
  const isUser = message.role === 'user';
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslated, setShowTranslated] = useState(false);

  const insights = socraticInsightsTranslations[language];
  const textToDisplay = showTranslated && translatedText ? translatedText : message.text;
  const isGuiding =
    !isUser && (textToDisplay.includes('?') || textToDisplay.includes("Let's") || textToDisplay.includes('Vamos') || textToDisplay.includes('Voyons'));

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(textToDisplay));
    const langMap: Record<Language, string> = {
      en: 'en-US',
      pt: 'pt-BR',
      es: 'es-ES',
      fr: 'fr-FR'
    };

    utterance.lang = langMap[language];
    utterance.rate = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleTranslate = async () => {
    if (showTranslated) {
      setShowTranslated(false);
      return;
    }

    if (translatedText) {
      setShowTranslated(true);
      return;
    }

    setIsTranslating(true);
    try {
      const result = await translateText(message.text, language);
      setTranslatedText(result);
      setShowTranslated(true);
    } catch (error) {
      console.error('Translation failed', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const renderInlineContent = (text: string, keyPrefix: string) => {
    const parts = text.split(/(\$[^$]+?\$)/g);

    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('$') && part.endsWith('$')) {
            const formula = part.slice(1, -1);
            try {
              if (window.katex) {
                const html = window.katex.renderToString(formula, { displayMode: false, throwOnError: false });
                return (
                  <span
                    key={`${keyPrefix}-${index}`}
                    className={`inline-block mx-0.5 px-1.5 py-0.5 rounded-md align-middle ${
                      isUser ? 'bg-white/20 border border-white/10' : 'bg-cyan-50 text-slate-900 border border-cyan-100 font-medium'
                    }`}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              }
            } catch (error) {
              console.error(error);
            }
          }

          return part.split(/(\*\*.*?\*\*)/g).map((subPart, subIndex) => {
            if (subPart.startsWith('**') && subPart.endsWith('**')) {
              return (
                <strong key={`${keyPrefix}-${index}-${subIndex}`} className={isUser ? 'font-bold text-white' : 'font-bold text-slate-900'}>
                  {subPart.slice(2, -2)}
                </strong>
              );
            }

            return subPart.split(/(~~.*?~~)/g).map((subSubPart, subSubIndex) => {
              if (subSubPart.startsWith('~~') && subSubPart.endsWith('~~')) {
                return (
                  <s key={`${keyPrefix}-${index}-${subIndex}-${subSubIndex}`} className={isUser ? 'text-white/70' : 'text-slate-400'}>
                    {subSubPart.slice(2, -2)}
                  </s>
                );
              }

              return <span key={`${keyPrefix}-${index}-${subIndex}-${subSubIndex}`}>{subSubPart}</span>;
            });
          });
        })}
      </>
    );
  };

  const formatContent = (text: string) => {
    const blockParts = text.split(/(\$\$[\s\S]*?\$\$)/g);

    return blockParts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const formula = part.slice(2, -2);
        try {
          if (window.katex) {
            const html = window.katex.renderToString(formula, { displayMode: true, throwOnError: false });
            return (
              <div
                key={index}
                className={`my-5 py-5 px-6 rounded-2xl overflow-x-auto text-center text-lg relative ${
                  isUser ? 'bg-black/20 border border-white/10 text-white' : 'bg-cyan-50 border-l-4 border-cyan-400 text-slate-800 shadow-sm'
                }`}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
        } catch (error) {
          console.error(error);
        }
      }

      const lines = part.split('\n');
      return (
        <React.Fragment key={index}>
          {lines.map((line, lineIdx) => {
            if (line.trim() === '') {
              return <br key={`${index}-${lineIdx}`} />;
            }

            const unorderedListMatch = line.match(/^[\*\-]\s+(.+)$/);
            if (unorderedListMatch) {
              return (
                <div key={`${index}-${lineIdx}`} className={`flex items-start gap-3 my-1.5 ${isUser ? 'pl-0' : 'pl-2'}`}>
                  <span className={`mt-2 w-1.5 h-1.5 rounded-full ${isUser ? 'bg-white/60' : 'bg-cyan-400'}`} />
                  <div className="flex-1 leading-relaxed">{renderInlineContent(unorderedListMatch[1], `${index}-${lineIdx}-ul`)}</div>
                </div>
              );
            }

            const orderedListMatch = line.match(/^(\d+)\.\s+(.+)$/);
            if (orderedListMatch) {
              return (
                <div key={`${index}-${lineIdx}`} className={`flex items-start gap-2 my-1.5 ${isUser ? 'pl-0' : 'pl-2'}`}>
                  <span className={`font-bold font-mono text-xs mt-1 min-w-[1.2rem] ${isUser ? 'text-white/80' : 'text-cyan-600'}`}>
                    {orderedListMatch[1]}.
                  </span>
                  <div className="flex-1 leading-relaxed">{renderInlineContent(orderedListMatch[2], `${index}-${lineIdx}-ol`)}</div>
                </div>
              );
            }

            const isQuestionLine = !isUser && line.trim().endsWith('?') && line.trim().length > 5;
            const content = renderInlineContent(line, `${index}-${lineIdx}`);

            if (isQuestionLine) {
              const insightIndex = (message.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + lineIdx) % insights.length;
              return (
                <SocraticQuestionLine key={`${index}-${lineIdx}`} insightText={insights[insightIndex]} t={t}>
                  {content}
                </SocraticQuestionLine>
              );
            }

            return <div key={`${index}-${lineIdx}`} className="min-h-[1.5em]">{content}</div>;
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`flex w-full mb-8 animate-fade-in group ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[92%] md:max-w-[75%] rounded-[1.8rem] p-6 relative transition-all duration-300 hover:scale-[1.01] transform-gpu ${
          isUser
            ? 'bg-gradient-to-br from-white/18 to-white/6 backdrop-blur-xl text-white border border-white/18 rounded-br-md shadow-[0_8px_32px_rgba(15,23,42,0.15)]'
            : 'bg-white/96 backdrop-blur-sm text-slate-600 border border-white/60 rounded-bl-md shadow-xl shadow-slate-950/5'
        } ${isGuiding && !isUser ? 'ring-1 ring-cyan-100 shadow-cyan-100/40' : ''}`}
      >
        {!isUser && (
          <div className="absolute -left-3 -top-3 md:-left-4 md:-top-4 w-10 h-10 bg-white border border-cyan-100 rounded-full flex items-center justify-center shadow-md z-10">
            <span className="text-sm font-black tracking-tight text-cyan-700">S</span>

            {isGuiding && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[3px] border border-cyan-100 shadow-sm text-cyan-500 animate-pulse" title="Guiding Step">
                <CompassIcon className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        )}

        {!isUser && isGuiding && (
          <div className="absolute -right-2 -top-2 z-20 animate-fade-in select-none" title={t.socraticInsight}>
            <div className="bg-gradient-to-br from-white to-cyan-50 p-1.5 rounded-full shadow-[0_2px_8px_rgba(34,211,238,0.15)] border border-cyan-100 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-300 hover:scale-110">
              <span className="text-xs font-black tracking-tight text-cyan-700">S</span>
            </div>
          </div>
        )}

        {message.image && (
          <div className="mb-4 overflow-hidden rounded-2xl border border-white/30 shadow-md bg-black/5">
            <img src={message.image} alt="Problem Upload" className="max-w-full max-h-80 object-contain w-full" />
          </div>
        )}

        {showTranslated && (
          <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1 ${isUser ? 'text-white/60' : 'text-cyan-500'}`}>
            <GlobeIcon className="w-3 h-3" />
            {t.translatedBadge}
          </div>
        )}

        <div className={`text-[15px] md:text-base leading-relaxed tracking-wide ${isUser ? 'text-white/95 font-light' : 'text-slate-600'}`}>
          {formatContent(textToDisplay)}
        </div>

        <div className={`mt-4 flex items-center justify-between border-t ${isUser ? 'border-white/10' : 'border-slate-100'} pt-3`}>
          <div className={`text-[10px] font-medium tracking-widest uppercase ${isUser ? 'text-white/40' : 'text-slate-300'}`}>
            {isUser ? t.student : t.socraticTutor}
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                showTranslated
                  ? isUser
                    ? 'text-cyan-100 bg-white/10 ring-1 ring-white/20'
                    : 'text-cyan-700 bg-cyan-50 ring-1 ring-cyan-200'
                  : isUser
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-slate-400 hover:text-cyan-700 hover:bg-slate-50'
              }`}
              title={showTranslated ? t.showOriginal : t.translate}
            >
              <GlobeIcon className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isTranslating ? t.translating : showTranslated ? t.showOriginal : t.translate}</span>
            </button>

            {!isUser && (
              <button
                onClick={handleSpeak}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  isSpeaking ? 'text-cyan-700 bg-cyan-50 ring-1 ring-cyan-200' : 'text-slate-400 hover:text-cyan-700 hover:bg-slate-50'
                }`}
                title={isSpeaking ? t.stopReading : t.readAloud}
              >
                {isSpeaking ? <StopIcon className="w-3.5 h-3.5" /> : <SpeakerIcon className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSpeaking ? t.stopReading : t.readAloud}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
