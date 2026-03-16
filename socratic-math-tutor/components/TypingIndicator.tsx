import React from 'react';
import { ThinkingStyle } from '../types';

interface TypingIndicatorProps {
  style?: ThinkingStyle;
  className?: string;
  label?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ style = 'Bounce', className = '', label = 'Thinking' }) => {
  if (style === 'Hidden') {
    return null;
  }

  const renderAnimation = () => {
    switch (style) {
      case 'Pulse':
        return <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]" />;
      case 'Orbit':
        return <div className="w-5 h-5 border-2 border-cyan-100 border-t-cyan-500 rounded-full animate-spin" />;
      case 'Minimal':
        return null;
      case 'Bounce':
      default:
        return (
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        );
    }
  };

  return (
    <div className={`flex w-full mb-6 justify-start animate-fade-in ${className}`}>
      <div className="mr-2 relative">
        <div className="w-8 h-8 bg-white border border-cyan-100 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-xs font-black tracking-tight text-cyan-700">S</span>
        </div>
      </div>
      <div
        className={`bg-white border border-slate-100 rounded-3xl rounded-bl-sm p-5 shadow-sm shadow-slate-200 flex items-center space-x-2 ${
          style === 'Minimal' ? 'py-3' : ''
        }`}
      >
        <div className="text-xs font-semibold text-slate-400 mr-2 tracking-wide uppercase">
          {style === 'Minimal' ? `${label}...` : label}
        </div>
        {renderAnimation()}
      </div>
    </div>
  );
};

export default TypingIndicator;
