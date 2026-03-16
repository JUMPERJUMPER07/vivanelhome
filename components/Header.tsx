
import React from 'react';
import { Activity, Radio, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onLogout?: () => void;
  userDrt?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onLogout,
  userDrt
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 border border-white/5 backdrop-blur-xl p-3 rounded-2xl shadow-lg relative overflow-hidden shrink-0">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="flex items-center gap-4 relative z-10 pl-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 flex items-center justify-center text-white ring-1 ring-white/20">
          <Activity size={20} strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight leading-none flex items-center gap-2">
            Preserve <span className="text-cyan-400 font-normal opacity-80">Receiver</span>
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
             <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
             <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">
               System Operational
             </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10 pr-1">
        {userDrt && (
          <div className="flex flex-col items-end mr-2 pr-4 border-r border-slate-700/50">
            <span className="text-xs font-bold text-slate-200 tracking-tight">DRT {userDrt}</span>
            <span className="text-[10px] text-slate-500">Radiology Technician</span>
          </div>
        )}

        <div className="flex items-center gap-1 bg-slate-950/50 p-1 rounded-xl border border-slate-800/50">
          <button 
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Configurações"
          >
            <Settings size={18} />
          </button>
          
          {onLogout && (
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
