
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Activity, Lock, User, ArrowRight, ShieldCheck, AlertCircle, FileBadge, CreditCard, Key, Check } from 'lucide-react';

interface LoginProps {
  onLogin: (user: string) => void;
}

type AuthMode = 'login' | 'first_access';
type FirstAccessStep = 'validation' | 'create_password';

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [firstAccessStep, setFirstAccessStep] = useState<FirstAccessStep>('validation');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Login State
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // First Access State
  const [cpf, setCpf] = useState('');
  const [drt, setDrt] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // CPF Mask Logic
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    // Apply mask 000.000.000-00
    value = value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

    setCpf(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        if (data.user) {
          onLogin(data.user.email || 'User');
        }
      } else {
        // Lógica Primeiro Acesso
        if (firstAccessStep === 'validation') {
          // Etapa 1: Validar CPF e DRT (Mantendo validação local por enquanto)
          const cleanCpf = cpf.replace(/\D/g, '');
          // Regex: 4 to 10 digits, optional /XX suffix (state)
          const drtRegex = /^\d{4,10}(\/[A-Z]{2})?$/;

          if (!drtRegex.test(drt)) {
            throw new Error('Formato do DRT inválido. Use apenas números ou formato Números/UF (ex: 12345/SP).');
          }

          if (cleanCpf.length !== 11) {
            throw new Error('CPF inválido. Certifique-se de digitar os 11 números.');
          }

          // Success validation
          setFirstAccessStep('create_password');
          setIsLoading(false);

        } else {
          // Etapa 2: Cadastro no Supabase
          if (newPassword.length < 6) {
            throw new Error('A senha deve ter no mínimo 6 caracteres.');
          }

          if (newPassword !== confirmPassword) {
            throw new Error('As senhas não coincidem.');
          }

          // Cadastro: Usando DRT como parte do email fictício p/ demo
          const fakeEmail = `${drt.replace(/[^a-zA-Z0-9]/g, '')}@preserve.local`;

          const { data, error } = await supabase.auth.signUp({
            email: fakeEmail,
            password: newPassword,
            options: {
              data: {
                cpf: cpf,
                drt: drt
              }
            }
          });

          if (error) throw error;

          if (data.user) {
            onLogin(drt);
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      if (mode === 'login' || (mode === 'first_access' && firstAccessStep === 'create_password')) {
        setIsLoading(false);
      }
    }
  };

  const toggleMode = (newMode: AuthMode) => {
    setMode(newMode);
    setFirstAccessStep('validation'); // Reset step when changing tabs
    setError('');
    setIsLoading(false);
    // Reset inputs
    setNewPassword('');
    setConfirmPassword('');
  };

  // Color theme helpers based on mode
  const accentColor = mode === 'login' ? 'cyan' : 'emerald';
  const accentText = mode === 'login' ? 'text-cyan-400' : 'text-emerald-400';
  const accentBorder = mode === 'login' ? 'border-cyan-500' : 'border-emerald-500';
  const accentRing = mode === 'login' ? 'focus:ring-cyan-500/20' : 'focus:ring-emerald-500/20';
  const accentFocusBorder = mode === 'login' ? 'focus:border-cyan-500/50' : 'focus:border-emerald-500/50';

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">

      {/* --- High-Tech Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Radial Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-[400px] bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-500 ring-1 ring-white/5 flex flex-col overflow-hidden">

        {/* Top Decorative Line */}
        <div className={`h-1 w-full transition-all duration-700 bg-gradient-to-r ${mode === 'login' ? 'from-cyan-600 via-blue-500 to-indigo-600' : 'from-emerald-600 via-teal-500 to-cyan-600'}`}></div>

        <div className="p-8 pb-10">

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] flex items-center justify-center text-white mb-4 transition-all duration-500 ring-1 ring-white/10 ${mode === 'login' ? 'from-cyan-600 to-blue-700 shadow-cyan-500/20' : 'from-emerald-600 to-teal-700 shadow-emerald-500/20'}`}>
              <Activity size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight text-center">Preserve <span className={`transition-colors duration-500 ${accentText}`}>Receiver</span></h1>
            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-[0.2em] mt-1 opacity-70">
              Contingency System
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-950/80 p-1 rounded-xl mb-8 border border-slate-800 relative">
            <button
              type="button"
              onClick={() => toggleMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 z-10 ${mode === 'login' ? 'text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => toggleMode('first_access')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 z-10 ${mode === 'first_access' ? 'text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Primeiro Acesso
            </button>

            {/* Sliding Background */}
            <div
              className={`absolute top-1 bottom-1 rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 ease-out`}
              style={{
                left: mode === 'login' ? '4px' : '50%',
                width: 'calc(50% - 4px)'
              }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Error Message with Shake Animation */}
            {error && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 animate-in slide-in-from-top-2 fade-in duration-200">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed font-medium">{error}</p>
              </div>
            )}

            {mode === 'login' ? (
              // LOGIN FORM
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <InputGroup
                  label="E-mail"
                  icon={<User size={16} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  accentClass={mode === 'login' ? 'group-focus-within:text-cyan-400' : 'group-focus-within:text-emerald-400'}
                  borderClass={accentFocusBorder}
                  ringClass={accentRing}
                />
                <InputGroup
                  label="Senha"
                  icon={<Lock size={16} />}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  accentClass={mode === 'login' ? 'group-focus-within:text-cyan-400' : 'group-focus-within:text-emerald-400'}
                  borderClass={accentFocusBorder}
                  ringClass={accentRing}
                />
              </div>
            ) : (
              // FIRST ACCESS FORM
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">

                {firstAccessStep === 'validation' ? (
                  <>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 mb-2">
                      <p className="text-[10px] text-emerald-400/80 leading-relaxed font-mono">
                        {'>'} Informe seu DRT e CPF para validar seu cadastro.
                      </p>
                    </div>

                    <InputGroup
                      label="DRT / Registro"
                      icon={<FileBadge size={16} />}
                      value={drt}
                      onChange={(e) => setDrt(e.target.value.toUpperCase())}
                      placeholder="Ex: 12345/SP"
                      accentClass="group-focus-within:text-emerald-400"
                      borderClass="focus:border-emerald-500/50"
                      ringClass="focus:ring-emerald-500/20"
                      autoFocus
                    />

                    <InputGroup
                      label="CPF"
                      icon={<CreditCard size={16} />}
                      value={cpf}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      accentClass="group-focus-within:text-emerald-400"
                      borderClass="focus:border-emerald-500/50"
                      ringClass="focus:ring-emerald-500/20"
                    />
                  </>
                ) : (
                  // STEP 2: CREATE PASSWORD
                  <>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 mb-2">
                      <p className="text-[10px] text-emerald-400/80 leading-relaxed font-mono">
                        {'>'} Validação OK. DRT identificado.<br />
                        {'>'} Defina sua credencial de acesso.
                      </p>
                    </div>

                    <div className="space-y-1.5 opacity-60">
                      <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider ml-1">Usuário de Acesso</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          value={drt}
                          disabled
                          className="w-full bg-slate-900 border border-slate-800 text-slate-400 text-sm rounded-lg block pl-10 p-3 font-bold cursor-not-allowed"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-500">
                          <Check size={14} />
                        </div>
                      </div>
                    </div>

                    <InputGroup
                      label="Nova Senha"
                      icon={<Key size={16} />}
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      accentClass="group-focus-within:text-emerald-400"
                      borderClass="focus:border-emerald-500/50"
                      ringClass="focus:ring-emerald-500/20"
                      autoFocus
                    />

                    <InputGroup
                      label="Confirmar Senha"
                      icon={<Check size={16} />}
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a senha"
                      accentClass="group-focus-within:text-emerald-400"
                      borderClass={newPassword && confirmPassword && newPassword !== confirmPassword ? 'focus:border-red-500/50 border-red-500/50' : 'focus:border-emerald-500/50'}
                      ringClass={newPassword && confirmPassword && newPassword !== confirmPassword ? 'focus:ring-red-500/20' : 'focus:ring-emerald-500/20'}
                    />

                    {newPassword && confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-[10px] text-red-400 pl-1 animate-in slide-in-from-left-2 mt-1">As senhas não conferem</p>
                    )}
                  </>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2 text-white font-bold rounded-lg text-sm px-5 py-3.5 transition-all duration-300 mt-2
                ${mode === 'login'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] border border-cyan-500/30'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] border border-emerald-500/30'}
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:translate-y-[-1px] active:scale-[0.98]'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="tracking-wide text-xs uppercase">
                    {mode === 'login'
                      ? 'Autenticando...'
                      : firstAccessStep === 'validation' ? 'Validando...' : 'Criando Senha...'}
                  </span>
                </>
              ) : (
                <>
                  <span className="tracking-wide text-xs uppercase">
                    {mode === 'login'
                      ? 'Entrar no Sistema'
                      : firstAccessStep === 'validation' ? 'Validar Credenciais' : 'Definir Senha'}
                  </span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-center gap-2 text-slate-500">
            <ShieldCheck size={12} className={mode === 'login' ? "text-cyan-500" : "text-emerald-500"} />
            <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Secure Connection • 256-Bit Encryption</span>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-slate-950/90 p-2.5 text-center border-t border-slate-800 backdrop-blur-md">
          <p className="text-[9px] text-slate-600 font-mono tracking-wide">SYS.ID: PRC-RECEIVER-2.4.0 • BUILD: 20240520</p>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component for cleaner render
interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  accentClass: string;
  borderClass: string;
  ringClass: string;
  autoFocus?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label, icon, value, onChange, type = "text", placeholder, accentClass, borderClass, ringClass, autoFocus
}) => {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 transition-colors group-focus-within:text-slate-300">{label}</label>
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 transition-all duration-300 group-focus-within:scale-110 ${accentClass}`}>
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`
                        w-full bg-slate-950/50 border border-slate-700 text-slate-200 text-sm rounded-lg 
                        block pl-10 p-3 placeholder-slate-600 shadow-inner
                        transition-all duration-300 ease-out outline-none focus:ring-2
                        ${borderClass} ${ringClass}
                        focus:bg-slate-900/80
                    `}
          placeholder={placeholder}
          required
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};
