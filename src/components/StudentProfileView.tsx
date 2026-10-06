import React from 'react';
import {
  User,
  Mail,
  ShieldCheck,
  FolderGit2,
  CheckCircle2,
  Target,
  LogOut,
  Sparkles,
  ExternalLink,
  Calendar,
  Lock
} from 'lucide-react';
import { StudentProfile, AuthUser, PageId } from '../types';

interface StudentProfileViewProps {
  profile: StudentProfile;
  authUser: AuthUser | null;
  onNavigate: (page: PageId) => void;
  onLogout: () => void;
  onOpenSupabaseConfig: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  profile,
  authUser,
  onNavigate,
  onLogout,
  onOpenSupabaseConfig,
}) => {
  const isDemo = authUser?.isDemo ?? true;
  const displayName = authUser?.fullName || profile.name || 'Student';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Personal student identity, credentials, and security settings.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={displayName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  {displayName}
                </h2>
                {isDemo ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    DEMO ACCOUNT
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    AUTHENTICATED
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {profile.email || (isDemo ? 'demo@careerlens.ai' : '')}
              </p>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                <span>Computer Science</span> &bull; <span>Undergraduate</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {!isDemo && (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Readiness Score
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {profile.profileEvidenceScore}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Evidence Items
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {profile.evidenceList.length}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Detected Skills
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {profile.skills.length}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Target Role
            </span>
            <div className="text-sm font-bold text-slate-900 mt-2 truncate">
              Full Stack Dev
            </div>
          </div>
        </div>

        {/* Security & Data Privacy Section */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Security &amp; PostgreSQL Isolation
          </h3>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Row Level Security (RLS) is Active</span>
            </div>
            <p className="leading-relaxed">
              Your profile, uploaded repositories, and competency ratings are tied exclusively to your authenticated user ID (<code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-[11px]">{authUser?.id || 'demo'}</code>). No other student can query or access your records.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onOpenSupabaseConfig}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Inspect Supabase Database Schema &amp; Policies
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
