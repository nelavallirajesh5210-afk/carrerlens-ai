import React, { useState } from 'react';
import { PageId, StudentProfile, AuthUser } from '../types';
import {
  Menu,
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  LogOut,
  User,
  Settings,
  Database,
  Search,
  Bell,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  profile: StudentProfile;
  authUser: AuthUser | null;
  onResetDemo: () => void;
  onLogout: () => void;
  onOpenHowItWorks?: () => void;
  onOpenSupabaseConfig?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  profile,
  authUser,
  onResetDemo,
  onLogout,
  onOpenHowItWorks,
  onOpenSupabaseConfig,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isDemo = authUser?.isDemo ?? true;
  const displayName = authUser?.fullName || profile.name || 'Student';

  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'landing':
        return 'Overview';
      case 'login':
        return 'Sign In';
      case 'signup':
        return 'Sign Up';
      case 'overview':
        return 'Overview';
      case 'build-profile':
        return 'My Evidence';
      case 'ai-analysis':
        return 'Evidence Analysis';
      case 'skill-profile':
        return 'Skills';
      case 'career-goal':
        return 'Target Role';
      case 'career-gap':
        return 'Career Gap';
      case 'roadmap':
        return 'Roadmap';
      case 'continuous-growth':
        return 'Growth';
      case 'profile':
        return 'My Profile';
      default:
        return 'Workspace';
    }
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'build-profile', label: 'My Evidence' },
    { id: 'skill-profile', label: 'Skills' },
    { id: 'career-gap', label: 'Career Gap' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'continuous-growth', label: 'Growth' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span
            onClick={() => setCurrentPage('overview')}
            className="font-medium text-slate-600 hover:text-slate-900 cursor-pointer hidden sm:inline"
          >
            CareerLens
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />
          <span className="font-semibold text-slate-900">
            {getPageTitle(currentPage)}
          </span>
        </div>
      </div>

      {/* Middle: SaaS Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, evidence, benchmarks..."
            className="w-full text-xs pl-8.5 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
          <kbd className="hidden sm:inline-block absolute right-2.5 top-2 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
            /
          </kbd>
        </div>
      </div>

      {/* Right: Security Badge, Notifications, User Menu, Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Security / Mode badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-50 border-slate-200">
          {isDemo ? (
            <span className="text-amber-700 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Demo Mode
            </span>
          ) : (
            <span className="text-emerald-700 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Account secured
            </span>
          )}
        </div>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in duration-100 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-slate-400">2 unread</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100">
                  <div className="font-semibold text-blue-900 text-[11px]">Evidence Verified</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    {profile.hasAddedNewDockerEvidence
                      ? 'New Docker container deployment verified.'
                      : 'Python distinction certificate verified in database.'}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-semibold text-slate-900 text-[11px]">Career Target Active</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Benchmark comparison configured for Full Stack Developer.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Chip & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer focus:outline-none"
          >
            <img
              src={profile.avatar}
              alt={displayName}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-xs font-semibold text-slate-800 hidden md:inline max-w-[120px] truncate">
              {displayName}
            </span>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-xl p-1.5 space-y-1 z-50 animate-in fade-in duration-100">
              <div className="px-2.5 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 block truncate">
                  {displayName}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {profile.email || (isDemo ? 'demo@careerlens.ai' : '')}
                </span>
              </div>

              <button
                onClick={() => {
                  setCurrentPage('overview');
                  setProfileDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>My Profile</span>
              </button>

              {onOpenSupabaseConfig && (
                <button
                  onClick={() => {
                    onOpenSupabaseConfig();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
                >
                  <Database className="w-3.5 h-3.5 text-slate-400" />
                  <span>Database &amp; RLS</span>
                </button>
              )}

              {isDemo ? (
                <button
                  onClick={() => {
                    onResetDemo();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg text-left"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo State</span>
                </button>
              ) : (
                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dedicated Quick Logout Icon for Header */}
        {!isDemo && (
          <button
            onClick={onLogout}
            title="Log out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors hidden sm:flex"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 p-4 shadow-lg space-y-1 z-40">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id);
                setMobileOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                currentPage === link.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            {isDemo ? (
              <button
                onClick={() => {
                  onResetDemo();
                  setMobileOpen(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 p-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onLogout();
                  setMobileOpen(false);
                }}
                className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 p-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
