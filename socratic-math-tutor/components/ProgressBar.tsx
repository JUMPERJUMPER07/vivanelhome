import React from 'react';

interface ProgressBarProps {
  stepCount: number;
  label?: string;
  stepLabel?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ stepCount, label = 'Session Depth', stepLabel = 'Step' }) => {
  // We estimate a typical Socratic session might take around 10 steps to solve a complex problem deeply.
  // This is a visual heuristic to give the user a sense of forward momentum.
  const maxSteps = 10;
  // Cap visual percentage at 100% even if steps go over, but keep showing step count.
  const percentage = Math.min((stepCount / maxSteps) * 100, 100);

  return (
    <div className="w-full max-w-[90%] md:max-w-[75%] mx-auto mb-8 animate-fade-in">
      <div className="flex justify-between items-end mb-2 px-1">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>
           <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
             {label}
           </span>
        </div>
        <span className="text-[10px] font-medium text-white/70 bg-white/10 px-2 py-0.5 rounded-full border border-white/5 backdrop-blur-md">
          {stepLabel} {stepCount}
        </span>
      </div>
      
      {/* Bar Track */}
      <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 relative shadow-inner">
        {/* Background segments for texture/scale */}
        <div className="absolute inset-0 flex justify-between px-[1px]">
             {[...Array(maxSteps)].map((_, i) => (
                 <div key={i} className="w-[1px] h-full bg-white/5"></div>
             ))}
        </div>
        
        {/* Fill Gradient */}
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-400 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
