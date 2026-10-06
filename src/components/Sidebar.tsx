import React, { useState } from 'react';
import { PageId, StudentProfile, AuthUser } from '../types';
import {
  LayoutDashboard,
  FolderGit2,
  CheckCircle,
  Target,
  Route,
  TrendingUp,
  BrainCircuit,
  RotateCcw,
  Sparkles,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Compass,
  LogOut,
  ShieldCheck,
  User,
  Database
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  profile: StudentProfile;
  authUser: AuthUser | null;
  onResetDemo: () => void;
  onOpenHowItWorks: () => void;
  onLogout: () => void;
  onOpenSupabaseConfig: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  profile,
  authUser,
  onResetDemo,
  onOpenHowItWorks,
  onLogout,
  onOpenSupabaseConfig,
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isDemo = authUser?.isDemo ?? true;

  const mainNavItems: {
    id: PageId;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    highlight?: boolean;
    pageTarget?: PageId;
  }[] = [
    {
      id: 'overview' as PageId,
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: `${profile.profileEvidenceScore}%`,
    },
    {
      id: 'build-profile' as PageId,
      label: 'My Evidence',
      icon: <FolderGit2 className="w-4 h-4" />,
      badge: `${profile.evidenceList.length}`,
    },
    {
      id: 'skill-profile' as PageId,
      label: 'Skills',
      icon: <CheckCircle className="w-4 h-4" />,
      badge: `${profile.skills.length}`,
    },
    {
      id: 'career-gap' as PageId,
      label: 'Career Gap',
      icon: <Target className="w-4 h-4" />,
      badge: 'Full Stack',
    },
    {
      id: 'roadmap' as PageId,
      label: 'Roadmap',
      icon: <Route className="w-4 h-4" />,
      badge: `${profile.roadmap.length} steps`,
    },
    {
      id: 'continuous-growth' as PageId,
      label: 'Growth',
      icon: <TrendingUp className="w-4 h-4" />,
      badge: profile.hasAddedNewDockerEvidence ? '+5% updated' : 'Active',
      highlight: true,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <div
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
              CL
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 flex items-center gap-1.5">
                CareerLens
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  AI
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium -mt-0.5">
                Student Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Workspace</span>
            {isDemo ? (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                DEMO MODE
              </span>
            ) : (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5" />
                SECURED
              </span>
            )}
          </div>

          <nav className="space-y-1 mt-1">
            {mainNavItems.map((item) => {
              const targetPage = item.pageTarget || item.id;
              const isActive = currentPage === targetPage;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(targetPage)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        item.highlight && profile.hasAddedNewDockerEvidence
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold'
                          : isActive
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Account
            </div>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'profile'
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>My Profile</span>
            </button>
            <button
              onClick={onOpenSupabaseConfig}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>
            <button
              onClick={onOpenHowItWorks}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>How It Works Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Footer with Profile Menu */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 relative">
        {/* Profile Popover Menu */}
        {profileMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-white rounded-xl border border-slate-200 shadow-xl p-2 space-y-1 animate-in slide-in-from-bottom-2 duration-150 z-40">
            <div className="px-2.5 py-1.5 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 block truncate">
                {profile.name}
              </span>
              <span className="text-[11px] text-slate-400 block truncate">
                {profile.email || 'student@university.edu'}
              </span>
            </div>

            <button
              onClick={() => {
                setCurrentPage('skill-profile');
                setProfileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => {
                onOpenSupabaseConfig();
                setProfileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Database &amp; RLS Settings</span>
            </button>

            <div className="pt-1 border-t border-slate-100">
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}

        <div
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
            />
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-xs font-semibold text-slate-800 truncate">
                {profile.name}
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                {isDemo ? 'Demo Account' : 'Account Secured'}
              </span>
            </div>
          </div>

          <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileMenuOpen ? 'rotate-90' : ''}`} />
        </div>

        {/* Status indicator */}
        <div className="mt-2 px-1 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 font-medium">
            <span className={`w-2 h-2 rounded-full ${isDemo ? 'bg-amber-400' : 'bg-emerald-500'}`} />
            {isDemo ? 'Demo Mode' : 'Account Secured'}
          </span>

          {isDemo ? (
            <button
              onClick={onResetDemo}
              title="Reset demo data"
              className="text-[10px] text-slate-400 hover:text-slate-700 underline"
            >
              Reset
            </button>
          ) : (
            <button
              onClick={onLogout}
              className="text-[10px] text-slate-500 hover:text-rose-600 flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Log out</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
