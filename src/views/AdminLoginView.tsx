import React, { useState } from 'react';
import { ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

interface AdminLoginViewProps {
  onNavigate: (view: ViewMode) => void;
  targetViewAfterLogin?: ViewMode;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onNavigate,
  targetViewAfterLogin = 'admin-trainings',
}) => {
  const { login, isAdminLoggedIn } = useAuth();

  const [username, setUsername] = useState('admin@company.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Username / Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    const result = login(username, password);
    if (result.success) {
      onNavigate(targetViewAfterLogin);
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  const autofillCredentials = () => {
    setUsername('admin@company.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12 space-y-6">
      {/* Login Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 sm:p-8 text-white text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Console Login</h1>
            <p className="text-xs text-slate-300 mt-1">
              Protected authentication required for training coordination and request triage.
            </p>
          </div>
        </div>

        {/* Credentials Helper Card */}
        <div className="bg-amber-50/80 border-b border-amber-200/80 p-4 text-xs text-amber-900 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-amber-950">
              <KeyRound className="w-3.5 h-3.5 text-amber-700" />
              Hardcoded Credentials:
            </span>
            <div className="font-mono text-[11px] text-amber-800 space-y-0.5">
              <div>Username: <span className="font-bold">admin@company.com</span> (or <span className="font-bold">admin</span>)</div>
              <div>Password: <span className="font-bold">admin123</span></div>
            </div>
          </div>
          <button
            type="button"
            onClick={autofillCredentials}
            className="px-2.5 py-1 rounded bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-[11px] font-bold transition-colors shrink-0"
          >
            Auto Fill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5">
          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isAdminLoggedIn && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You are currently authenticated as Admin.</span>
              </span>
              <button
                type="button"
                onClick={() => onNavigate('admin-trainings')}
                className="font-bold text-emerald-900 underline"
              >
                Go to Portal
              </button>
            </div>
          )}

          {/* Username / Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-username"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Admin Username or Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@company.com"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Sign In to Admin Portal</span>
          </button>
        </form>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium"
          >
            &larr; Return to Employee Home (No login needed)
          </button>
        </div>
      </div>
    </div>
  );
};
