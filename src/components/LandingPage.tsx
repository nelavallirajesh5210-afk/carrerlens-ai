import React from 'react';
import { PageId } from '../types';
import {
  ArrowRight,
  ShieldCheck,
  Target,
  TrendingUp,
  FolderGit2,
  CheckCircle2,
  Layers,
  Sparkles,
  Award,
  Route,
  UserCheck,
  FileText
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenHowItWorks: () => void;
  onUseDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenHowItWorks,
  onUseDemo,
}) => {
  const journeySteps = [
    {
      title: 'Evidence',
      subtitle: 'Code, certs & projects',
      icon: <FolderGit2 className="w-5 h-5 text-blue-600" />,
      target: 'build-profile' as PageId,
    },
    {
      title: 'Skills',
      subtitle: 'Extracted competencies',
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
      target: 'skill-profile' as PageId,
    },
    {
      title: 'Career Gap',
      subtitle: 'Role benchmark diff',
      icon: <Target className="w-5 h-5 text-blue-600" />,
      target: 'career-gap' as PageId,
    },
    {
      title: 'Roadmap',
      subtitle: 'Actionable milestones',
      icon: <Route className="w-5 h-5 text-blue-600" />,
      target: 'roadmap' as PageId,
    },
    {
      title: 'Growth',
      subtitle: 'Dynamic profile updates',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      target: 'continuous-growth' as PageId,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 flex flex-col justify-between">
      {/* Top clean navigation bar for landing */}
      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
              CL
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900">
              CareerLens <span className="text-blue-600">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenHowItWorks}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={onUseDemo}
              className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Try Demo</span>
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Evidence-Based Student Career Intelligence</span>
        </div>

        {/* Large confident typography */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          See your skills. <br />
          Find your gaps. <br />
          <span className="text-blue-600">Build your career.</span>
        </h1>

        {/* Supporting description */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Turn your projects, GitHub activity, certificates and experience into an evidence-backed career profile.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => onNavigate('signup')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Build My Career Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenHowItWorks}
            className="w-full sm:w-auto px-5 py-3 rounded-xl font-medium text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>See How It Works</span>
          </button>

          <button
            onClick={onUseDemo}
            className="w-full sm:w-auto px-4 py-3 rounded-xl font-medium text-xs text-blue-700 bg-blue-50/70 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Try Demo Mode</span>
          </button>
        </div>
      </div>

      {/* Visual Career Journey: Evidence → Skills → Career Gap → Roadmap → Growth */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full mb-20">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            The Evidence-to-Career Pathway
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            How CareerLens guides your professional journey
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative">
          {journeySteps.map((step, idx) => (
            <div
              key={step.title}
              onClick={() => onNavigate(step.target)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {step.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-medium">
                <span>View</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Three Feature Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {/* 1. Evidence-Based */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Evidence-Based
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            &ldquo;Every skill is connected to real student evidence.&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Ground truth from GitHub commits, project repos, and verifiable certificates.
          </div>
        </div>

        {/* 2. Career-Specific */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Career-Specific
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            &ldquo;See exactly what your target role requires.&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Direct benchmark comparisons for Full Stack Developer, AI/ML, and Analytics roles.
          </div>
        </div>

        {/* 3. Dynamic Growth */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Dynamic Growth
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            &ldquo;Your profile improves as you build and submit new evidence.&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Real-time verification loop that updates competencies when new code is published.
          </div>
        </div>
      </div>

      {/* Clean footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CareerLens AI</span>
            <span>&bull;</span>
            <span>Evidence-based student career intelligence</span>
          </div>
          <div className="text-slate-400">
            &ldquo;See your skills. Find your gaps. Build your career.&rdquo;
          </div>
        </div>
      </footer>
    </div>
  );
};
