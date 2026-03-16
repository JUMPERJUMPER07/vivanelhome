
import React, { useState, useEffect } from 'react';
import { AppSettings } from '../types';
import { X, Server, Save, Activity, Database, Settings, ShieldCheck, Zap, Network, AlertTriangle, CheckCircle2, RefreshCcw, Wifi, Lock, Globe, HardDrive } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [activeTab, setActiveTab] = useState<'pacs' | 'ris' | 'workflow'>('pacs');
  const [isTestingRis, setIsTestingRis] = useState(false);
  const [risConnectionStatus, setRisConnectionStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setLocalSettings(settings);
      setRisConnectionStatus('idle');
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  // --- Validation Helpers ---
  const isValidPort = (port: number) => port > 0 && port <= 65535;
  const isValidAETitle = (ae: string) => /^[A-Z0-9_]{1,16}$/.test(ae);
  const isValidHost = (host: string) => host.length > 0 && !/\s/.test(host);

  const hasErrors = () => {
    if (!isValidAETitle(localSettings.pacs.aeTitle)) return true;
    if (!isValidPort(localSettings.pacs.port)) return true;

    if (localSettings.ris.enabled) {
      if (!isValidHost(localSettings.ris.host)) return true;
      if (!isValidPort(localSettings.ris.port)) return true;
      if (!isValidAETitle(localSettings.ris.aeTitle)) return true;
    }
    return false;
  };

  const handleSave = () => {
    if (!hasErrors()) {
      onSave(localSettings);
      onClose();
    }
  };

  const handleTestRisConnection = () => {
    if (hasErrors()) return;
    setIsTestingRis(true);
    setRisConnectionStatus('idle');

    setTimeout(() => {
      setIsTestingRis(false);
      setRisConnectionStatus(Math.random() > 0.1 ? 'success' : 'failed');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#080c14] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-white/5 relative">

        {/* Background Ambient Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        {/* Header */}
        <div className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-slate-950/50 backdrop-blur relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shadow-xl group">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-lg group-hover:bg-cyan-500/20 transition-all"></div>
              <Settings size={24} className="text-cyan-400 relative z-10" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Administração do Sistema
                <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  v2.4.0-PRO
                </span>
              </h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Configuração de Rede DICOM & Regras de Workflow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-slate-500 transition-all active:scale-95"
          >
            <X size={24} />
          </button>
        </div>

        {/* Pro Navigation Tabs */}
        <div className="flex px-6 pt-2 border-b border-slate-800/50 bg-slate-900/30 gap-8 relative z-10">
          {[
            { id: 'pacs', label: 'PACS LISTENER', icon: Server, color: 'cyan' },
            { id: 'ris', label: 'RIS INTEGRATION', icon: Database, color: 'indigo' },
            { id: 'workflow', label: 'WORKFLOW RULES', icon: Zap, color: 'emerald' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                  relative py-4 text-xs font-bold uppercase tracking-[0.1em] transition-all flex items-center gap-3
                  before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent 
                  ${activeTab === tab.id
                  ? `text-${tab.color}-400 before:via-${tab.color}-500 before:to-transparent opacity-100`
                  : 'text-slate-500 hover:text-slate-300 before:via-transparent before:to-transparent opacity-70 hover:opacity-100'}
                `}
            >
              <tab.icon size={16} className={`${activeTab === tab.id ? `drop-shadow-[0_0_8px_rgba(var(--${tab.color}-500),0.5)]` : ''}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto relative z-10">

          {activeTab === 'pacs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">

              {/* Left Column: Identity */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-[#0b1221] p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Activity size={20} className="text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Identidade DICOM</h3>
                    </div>

                    <div className="space-y-6">
                      <InputGroup
                        label="AE Title (Application Entity)"
                        value={localSettings.pacs.aeTitle}
                        onChange={(v) => setLocalSettings({ ...localSettings, pacs: { ...localSettings.pacs, aeTitle: v.toUpperCase().trim() } })}
                        placeholder="PRESERVER_SCP"
                        helperText="Identificador único na rede (Max 16 chars)."
                        isValid={isValidAETitle(localSettings.pacs.aeTitle)}
                        errorMessage="Formato: A-Z, 0-9, _"
                        icon={<Server size={14} />}
                      />

                      <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800/50">
                        <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-3 flex items-center gap-2">
                          <Globe size={12} /> Endereço de Rede (Bind)
                        </h4>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-slate-400">Interface IP</span>
                          <span className="px-2 py-1 bg-cyan-950/30 text-cyan-400 rounded border border-cyan-900/50">0.0.0.0 (Any)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex gap-4">
                  <ShieldCheck className="text-amber-500 shrink-0" size={24} />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-500">Requer Reinicialização</h4>
                    <p className="text-xs text-amber-500/70 leading-relaxed">
                      Alterações de porta ou AE Title exigem restart do serviço backend para revalidar regras de firewall.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Parameters */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#0b1221] p-6 rounded-xl border border-slate-800">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                    <Network size={20} className="text-slate-400" />
                    Parâmetros de Escuta
                  </h3>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <InputGroup
                      label="Porta TCP (DICOM)"
                      value={localSettings.pacs.port}
                      type="number"
                      onChange={(v) => setLocalSettings({ ...localSettings, pacs: { ...localSettings.pacs, port: parseInt(v) || 0 } })}
                      placeholder="104"
                      isValid={isValidPort(localSettings.pacs.port)}
                      errorMessage="Range: 1-65535"
                      icon={<Lock size={14} />}
                    />
                    <div className="space-y-1.5 opacity-50 cursor-not-allowed">
                      <label className="text-[10px] uppercase font-bold text-slate-500 ml-0.5">PDU Size (bytes)</label>
                      <div className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-400 rounded-lg px-3 py-2.5 font-mono">
                        16384 (Default)
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800/50">
                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block flex items-center gap-2">
                      <Zap size={12} className="text-yellow-500" /> WebSocket Real-time Gateway
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-500 text-xs font-mono font-bold">ws://</span>
                      </div>
                      <input
                        type="text"
                        value={localSettings.pacs.wsUrl.replace('ws://', '')}
                        onChange={(e) => setLocalSettings({ ...localSettings, pacs: { ...localSettings.pacs, wsUrl: `ws://${e.target.value}` } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-12 pr-4 text-xs text-cyan-300 font-mono shadow-inner focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all group-hover:border-slate-600"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Activity size={12} className="text-slate-600 animate-pulse" />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">
                      Endpoint utilizado para streaming de progresso e notificações em tempo real para o frontend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ris' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-500">

              {/* Integration Toggle Card */}
              <div className="lg:col-span-1">
                <div className={`
                      h-full p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center gap-6
                      ${localSettings.ris.enabled ? 'bg-indigo-950/10 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'bg-slate-900/50 border-slate-800 grayscale'}
                   `}>
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${localSettings.ris.enabled ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'bg-slate-800 text-slate-600'}`}>
                    <Database size={40} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Integração MWL</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                      Habilita consulta de Worklist em provedor RIS externo (Modality Worklist Protocol).
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      checked={localSettings.ris.enabled}
                      onChange={(e) => setLocalSettings({ ...localSettings, ris: { ...localSettings.ris, enabled: e.target.checked } })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-slate-400 peer-checked:after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 transition-colors border border-slate-700 peer-checked:border-indigo-500"></div>
                  </label>
                </div>
              </div>

              {/* Configuration Panel */}
              <div className={`lg:col-span-2 space-y-6 transition-all duration-300 ${!localSettings.ris.enabled ? 'opacity-30 pointer-events-none grayscale' : ''}`}>

                <div className="bg-[#0b1221] p-6 rounded-xl border border-slate-800 relative overflow-hidden">
                  {/* Corner Decor */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Server size={18} className="text-indigo-400" /> Servidor Remoto (Provider)
                    </h3>
                    <div className={`px-3 py-1 rounded-full border text-[10px] font-bold flex items-center gap-2 ${risConnectionStatus === 'success' ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' :
                        risConnectionStatus === 'failed' ? 'bg-red-950/30 border-red-500/30 text-red-400' :
                          'bg-slate-900 border-slate-700 text-slate-500'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${risConnectionStatus === 'idle' ? 'bg-slate-500' : risConnectionStatus === 'success' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                      {risConnectionStatus === 'idle' ? 'NOT TESTED' : risConnectionStatus === 'success' ? 'ONLINE' : 'OFFLINE'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <InputGroup
                        label="Hostname / IP"
                        value={localSettings.ris.host}
                        onChange={(v) => setLocalSettings({ ...localSettings, ris: { ...localSettings.ris, host: v } })}
                        placeholder="192.168.1.50"
                        isValid={isValidHost(localSettings.ris.host)}
                        icon={<Globe size={14} />}
                      />
                    </div>
                    <InputGroup
                      label="Porta"
                      type="number"
                      value={localSettings.ris.port}
                      onChange={(v) => setLocalSettings({ ...localSettings, ris: { ...localSettings.ris, port: parseInt(v) || 0 } })}
                      placeholder="104"
                      isValid={isValidPort(localSettings.ris.port)}
                      icon={<Lock size={14} />}
                    />
                    <InputGroup
                      label="Called AE Title"
                      value={localSettings.ris.aeTitle}
                      onChange={(v) => setLocalSettings({ ...localSettings, ris: { ...localSettings.ris, aeTitle: v.toUpperCase().trim() } })}
                      placeholder="RIS_SERVER"
                      isValid={isValidAETitle(localSettings.ris.aeTitle)}
                      icon={<Server size={14} />}
                    />

                    <div className="md:col-span-2 border-t border-slate-800/50 pt-4 flex items-center gap-6">
                      <div className="flex-1">
                        <InputGroup
                          label="Polling (Segundos)"
                          type="number"
                          value={localSettings.ris.pollingInterval}
                          onChange={(v) => setLocalSettings({ ...localSettings, ris: { ...localSettings.ris, pollingInterval: parseInt(v) || 30 } })}
                          placeholder="30"
                          isValid={localSettings.ris.pollingInterval >= 5}
                          helperText="Intervalo de consulta automática."
                          icon={<RefreshCcw size={14} />}
                        />
                      </div>
                      <div className="flex-none pt-6">
                        <button
                          type="button"
                          onClick={handleTestRisConnection}
                          disabled={isTestingRis || hasErrors()}
                          className="h-[42px] px-6 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg border border-indigo-500 shadow-lg shadow-indigo-900/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
                        >
                          {isTestingRis ? <RefreshCcw size={14} className="animate-spin" /> : <Wifi size={14} />}
                          TEST CONNECTIVITY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4 duration-500 space-y-6">
              <div className="bg-[#0b1221] rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap size={16} className="text-emerald-500" />
                    Automação de Lista
                  </h3>
                  <span className="text-[10px] bg-emerald-950/30 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/50">ACTIVE</span>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-colors group cursor-pointer" onClick={() => setLocalSettings({ ...localSettings, workflow: { ...localSettings.workflow, autoHideLinked: !localSettings.workflow?.autoHideLinked } })}>
                    <div className={`mt-1 p-2 rounded-lg transition-colors duration-300 ${localSettings.workflow?.autoHideLinked ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">Clean-up Automático</span>
                        <div className={`w-3 h-3 rounded-full border border-slate-600 transition-colors ${localSettings.workflow?.autoHideLinked ? 'bg-emerald-500 border-emerald-400' : 'bg-transparent'}`}></div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                        Remove os exames da lista "PACS Received" imediatamente após a confirmação do vínculo. Mantém a interface limpa e focada em novos exames.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Bar */}
        <div className="p-6 border-t border-slate-800 bg-[#080c14] flex justify-between items-center z-10 relative">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold transition-all ${hasErrors()
                ? 'bg-red-950/30 border-red-500/30 text-red-400'
                : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
              }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${hasErrors() ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`}></div>
              {hasErrors() ? 'CONFIGURATION INVALID' : 'SYSTEM READY'}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={hasErrors()}
              className="relative group bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-2.5 rounded-lg text-xs font-bold transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none uppercase tracking-wider overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              <Save size={16} />
              Salvar Parâmetros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Modern Input Component ---
interface InputGroupProps {
  label: string;
  value: string | number;
  onChange: (val: any) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  helperText?: string;
  isValid?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label, value, onChange, type = 'text', placeholder, helperText, isValid = true, errorMessage, icon
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className={`text-[10px] uppercase font-bold transition-colors ml-0.5 flex items-center gap-1.5 ${isFocused ? 'text-cyan-400' : 'text-slate-500'}`}>
        {icon} {label}
      </label>
      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
                        w-full bg-[#0f172a] border text-sm text-white rounded-lg px-4 py-3 outline-none transition-all font-mono shadow-inner
                        ${!isValid
              ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.2)]'
              : isFocused
                ? 'border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'border-slate-800 hover:border-slate-700'}
                    `}
        />
        {!isValid && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
            <AlertTriangle size={16} />
          </div>
        )}
      </div>
      {(!isValid && errorMessage) ? (
        <p className="text-[10px] text-red-400 animate-pulse ml-1 flex items-center gap-1 font-bold">
          <AlertTriangle size={10} /> {errorMessage}
        </p>
      ) : helperText && (
        <p className="text-[10px] text-slate-500 ml-1 leading-tight opacity-70">{helperText}</p>
      )}
    </div>
  );
};
