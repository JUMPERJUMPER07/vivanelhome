import React from 'react';

export const Constellation = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <div className={`absolute pointer-events-none opacity-30 ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/40 fill-none" strokeWidth="0.5">
      <circle cx="10" cy="10" r="1.5" fill="white" className="animate-pulse" />
      <circle cx="90" cy="30" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
      <circle cx="50" cy="80" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '2s' }} />
      <circle cx="20" cy="60" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: `${delay}s` }} />
      <path d="M10 10 L90 30 L50 80 L20 60 Z" className="stroke-white/20" />
      <line x1="10" y1="10" x2="50" y2="80" className="stroke-white/20" />
      <line x1="20" y1="60" x2="90" y2="30" className="stroke-white/20" />
    </svg>
  </div>
);

export const Polyhedron = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none opacity-20 ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none" strokeWidth="0.3">
      <path d="M50 10 L90 35 L90 75 L50 95 L10 75 L10 35 Z" />
      <line x1="50" y1="10" x2="50" y2="50" />
      <line x1="50" y1="50" x2="90" y2="35" />
      <line x1="50" y1="50" x2="90" y2="75" />
      <line x1="50" y1="50" x2="50" y2="95" />
      <line x1="50" y1="50" x2="10" y2="75" />
      <line x1="50" y1="50" x2="10" y2="35" />
    </svg>
  </div>
);

export const BackgroundLayer = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <Constellation className="w-96 h-96 -top-10 -left-10 animate-float" />
    <Constellation className="w-80 h-80 top-1/3 right-0 animate-float-delayed" delay={0.5} />
    <Polyhedron className="w-64 h-64 bottom-20 left-10 animate-float" />
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
  </div>
);
