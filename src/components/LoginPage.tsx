import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  CheckCircle,
  Target,
  Route,
  AlertCircle,
  Sparkles,
  Settings,
  Database
} from 'lucide-react';
import { signInStudent, isSupabaseConfigured } from '../services/supabase';
import { PageId } from '../types';

interface LoginPageProps {
  onNavigate: (page: PageId) => void;
  onLoginSuccess: (user: { id: string; email: string; fullName: string }) => void;
  onUseDemo: () => void;
  onOpenSupabaseConfig: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  onLoginSuccess,
  onUseDemo,
  onOpenSupabaseConfig,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isConfigured) {
      setErrorMessage('Supabase credentials are not connected yet. Please configure your project URL and Anon key.');
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setLoading(true);

    try {
      const data = await signInStudent(email.trim(), password);
      if (data?.user) {
        onLoginSuccess({
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
        });
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      const msg = err?.message || '';

      if (msg.includes('Invalid login credentials') || msg.includes('invalid_grant')) {
        setErrorMessage('Email or password is incorrect.');
      } else if (msg.includes('Email not confirmed')) {
        setErrorMessage('Please verify your email before signing in.');
      } else if (msg.includes('fetch') || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setErrorMessage('Unable to connect. Please try again.');
      } else {
        setErrorMessage(msg || 'An error occurred while signing in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex">
      {/* Left Side: Professional CareerLens Branding & Journey */}
      <div className="hidden lg:flex lg:w-1/2 bg-white border-r border-slate-200 p-12 flex-col justify-between">
        <div>
          <div
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 cursor-pointer inline-flex"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
              CL
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900">
              CareerLens <span className="text-blue-600">AI</span>
            </span>
          </div>

          <div className="mt-20 max-w-md">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Student Career Intelligence
            </span>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 leading-tight">
              See your skills. <br />
              Find your gaps. <br />
              <span className="text-blue-600">Build your career.</span>
            </h1>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Your personal career profile, backed by evidence. Private data isolation with Row Level Security.
            </p>

            {/* Subtle Visual Career Journey */}
            <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Evidence Pipeline
              </span>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                  Evidence
                </span>
                <span className="text-slate-400">&rarr;</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  Skills
                </span>
                <span className="text-slate-400">&rarr;</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  Career Gap
                </span>
                <span className="text-slate-400">&rarr;</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <Route className="w-3.5 h-3.5 text-blue-600" />
                  Roadmap
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} CareerLens AI</span>
          <span className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Row Level Security Active
          </span>
        </div>
      </div>

      {/* Right Side: Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <div
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                CL
              </div>
              <span className="font-bold text-sm text-slate-900">CareerLens AI</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to your CareerLens account.
            </p>
          </div>

          {/* Config Warning banner if Supabase not configured */}
          {!isConfigured && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start justify-between gap-3">
              <div>
                <strong>Supabase Setup Required:</strong> To enable real authentication, connect your Supabase project URL &amp; Anon Key.
              </div>
              <button
                type="button"
                onClick={onOpenSupabaseConfig}
                className="shrink-0 font-bold underline text-amber-800 hover:text-amber-950"
              >
                Connect
              </button>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="pt-2 text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Create account
            </button>
          </div>

          {/* Clean Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#F8F9FB] px-2 text-slate-400 font-mono text-[10px]">
                or explore without account
              </span>
            </div>
          </div>

          {/* Clearly Separated DEMO MODE Button */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Hackathon Demonstrator</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Experience the platform using local demo student Alex Morgan. Does not modify or store real data.
            </p>
            <button
              type="button"
              onClick={onUseDemo}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Try Demo Mode</span>
            </button>
          </div>

          {/* Supabase Connection Setup Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={onOpenSupabaseConfig}
              className="text-[11px] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 font-mono"
            >
              <Database className="w-3 h-3 text-slate-400" />
              <span>{isConfigured ? 'Supabase Connected' : 'Connect Supabase Credentials'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
