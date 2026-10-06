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
  MailCheck,
  Database
} from 'lucide-react';
import { signUpStudent, isSupabaseConfigured } from '../services/supabase';
import { PageId } from '../types';

interface SignUpPageProps {
  onNavigate: (page: PageId) => void;
  onSignUpSuccess: (user: { id: string; email: string; fullName: string }) => void;
  onOpenSupabaseConfig: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onNavigate,
  onSignUpSuccess,
  onOpenSupabaseConfig,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailVerificationNeeded, setEmailVerificationNeeded] = useState(false);

  const isConfigured = isSupabaseConfigured();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isConfigured) {
      setErrorMessage('Supabase is not connected. Please connect your Supabase project URL & Anon key first.');
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await signUpStudent(email.trim(), password, fullName.trim());

      // If Supabase has email confirmation enabled, user session will be null or user.identities may be empty
      if (data?.user && !data.session) {
        setEmailVerificationNeeded(true);
      } else if (data?.user) {
        onSignUpSuccess({
          id: data.user.id,
          email: data.user.email || email,
          fullName: fullName.trim(),
        });
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      const msg = err?.message || '';
      if (msg.includes('User already registered')) {
        setErrorMessage('An account with this email already exists. Please sign in.');
      } else if (msg.includes('Password should be')) {
        setErrorMessage(msg);
      } else {
        setErrorMessage(msg || 'Failed to create account. Please check your information.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (emailVerificationNeeded) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <MailCheck className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Check your email to verify your account
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            We sent a verification link to <strong className="text-slate-900">{email}</strong>. Once confirmed, you can log in to access your personal evidence dashboard.
          </p>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Go to Sign In
            </button>
            <button
              onClick={() => setEmailVerificationNeeded(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Back to form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex">
      {/* Left Side: Branding */}
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
              Create Student Account
            </span>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 leading-tight">
              Start building your evidence-backed career profile.
            </h1>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Every student gets an isolated, private workspace. Your repositories, certifications, and target career goals are secured with PostgreSQL Row Level Security.
            </p>

            <div className="mt-8 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero keyword ATS guesswork</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified code artifact extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dynamic growth loop that adapts as you build</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Row Level Security guarantees your data is never visible to other students.
        </div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create your CareerLens account
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Get started with evidence-based career intelligence.
            </p>
          </div>

          {/* Config Warning banner if Supabase not configured */}
          {!isConfigured && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start justify-between gap-3">
              <div>
                <strong>Supabase Setup Required:</strong> To enable real accounts, connect your project credentials.
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

          {/* Error message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane.doe@university.edu"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Password <span className="font-normal text-slate-400">(min. 8 characters)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
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

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
