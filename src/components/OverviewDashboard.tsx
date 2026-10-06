import React from 'react';
import {
  Target,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  CheckCircle2,
  Award,
  FileText,
  Github,
  Linkedin,
  Zap,
  Sparkles,
  AlertCircle,
  PlusCircle,
  Route,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { StudentProfile, AuthUser, PageId } from '../types';

interface OverviewDashboardProps {
  profile: StudentProfile;
  authUser: AuthUser | null;
  onNavigate: (page: PageId) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  profile,
  authUser,
  onNavigate,
}) => {
  const isDemo = authUser?.isDemo ?? true;

  // Real student name or fallback
  const studentName = authUser?.fullName || profile.name || 'Student';
  const firstName = studentName.split(' ')[0];

  // Detect empty state for newly registered real student
  const isEmptyProfile = !isDemo && profile.skills.length === 0 && profile.evidenceList.length === 0;

  // 5-6 Key Skills for the Skill Snapshot list
  // Python Strong 91%, JavaScript Strong 78%, React Developing 84%, SQL Strong 76%, Node.js Needs Work 48%, Docker Needs Work 32% (or 68%)
  const skillSnapshot = [
    {
      name: 'Python',
      status: 'Strong',
      percent: 91,
      evidence: '3 GitHub repos • Coursework distinction',
      category: 'languages',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'JavaScript',
      status: 'Strong',
      percent: 78,
      evidence: '2 web projects • Interactive DOM',
      category: 'languages',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'React',
      status: 'Developing',
      percent: 84,
      evidence: 'Frontend repository • Component state',
      category: 'frontend',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'SQL',
      status: 'Strong',
      percent: 76,
      evidence: 'Meta certification • Normalized schema',
      category: 'database',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'Node.js',
      status: 'Needs Work',
      percent: profile.hasAddedNewDockerEvidence ? 64 : 48,
      evidence: profile.hasAddedNewDockerEvidence ? '1 microservice repo' : 'Resume mention only • 0 repos',
      category: 'backend',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      name: 'Docker',
      status: profile.hasAddedNewDockerEvidence ? 'Strong' : 'Needs Work',
      percent: profile.hasAddedNewDockerEvidence ? 68 : 32,
      evidence: profile.hasAddedNewDockerEvidence
        ? 'Dockerfile • Cloud Run deployment'
        : 'Limited baseline • Resume only',
      category: 'devops',
      badgeClass: profile.hasAddedNewDockerEvidence
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  // Helper for evidence source icon
  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-4 h-4 text-slate-700" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'project':
        return <FolderGit2 className="w-4 h-4 text-blue-600" />;
      case 'resume':
        return <FileText className="w-4 h-4 text-slate-600" />;
      default:
        return <FolderGit2 className="w-4 h-4 text-slate-600" />;
    }
  };

  // If newly registered student with no evidence yet -> Professional Empty State
  if (isEmptyProfile) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s your current career readiness snapshot.
          </p>
        </div>

        {/* Empty State Hero Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto">
            <FolderGit2 className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Your career profile is ready.
          </h2>

          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Start by adding your resume, GitHub profile, certificates, or projects. CareerLens will extract verifiable evidence and benchmark your readiness.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('build-profile')}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your First Evidence</span>
            </button>
          </div>
        </div>

        {/* Visual Workflow Representation */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              The CareerLens Evidence Pipeline
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              How your private career profile will take shape
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <FolderGit2 className="w-5 h-5 text-blue-600 mb-2" />
              <span className="font-bold text-xs text-slate-900">01 Evidence</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Code, repos, certs</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mb-2" />
              <span className="font-bold text-xs text-slate-900">02 Skills</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Grounded proficiencies</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <Target className="w-5 h-5 text-blue-600 mb-2" />
              <span className="font-bold text-xs text-slate-900">03 Career Gap</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Market benchmarks</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <Route className="w-5 h-5 text-blue-600 mb-2" />
              <span className="font-bold text-xs text-slate-900">04 Roadmap</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Project next steps</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600 mb-2" />
              <span className="font-bold text-xs text-slate-900">05 Growth</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Continuous updates</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Student Dashboard
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Good morning, {firstName} 👋
            </h1>
            {isDemo && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                DEMO MODE
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s your current career readiness snapshot.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('build-profile')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Add Evidence</span>
          </button>
          <button
            onClick={() => onNavigate('career-gap')}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>View Career Gap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CAREER TARGET CARD */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              TARGET ROLE
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Primary Focus
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Full Stack Developer
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            You&apos;re building strong foundations. Focus on your highest-impact skill gaps to become job-ready.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 block">Readiness:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900">
                {profile.profileEvidenceScore}%
              </span>
              {profile.hasAddedNewDockerEvidence && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  +5% UPGRADED
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400">Benchmark matched</span>
          </div>

          <button
            onClick={() => onNavigate('career-gap')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Career Gap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* STATS CARDS GRID */}
      {/* Evidence Items, Skills Detected, Projects, Profile Evidence Score */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Evidence Items */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Evidence Items
          </span>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {profile.evidenceList.length || 12}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Connected &amp; verified
          </span>
        </div>

        {/* Skills Detected */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Skills Detected
          </span>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {profile.skills.length || 18}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Grounded competencies
          </span>
        </div>

        {/* Projects */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Projects
          </span>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {profile.projectsCount || 8}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Public &amp; capstone repos
          </span>
        </div>

        {/* Profile Evidence Score */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Profile Evidence Score
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {profile.profileEvidenceScore}%
            </span>
            {profile.hasAddedNewDockerEvidence && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                +5%
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Overall readiness score
          </span>
        </div>
      </div>

      {/* TWO COLUMN SECTION: SKILL SNAPSHOT & CAREER GAP PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SKILL SNAPSHOT */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Skill Snapshot
                </h3>
                <p className="text-xs text-slate-500">
                  Key competencies with verifiable evidence indicators
                </p>
              </div>
              <button
                onClick={() => onNavigate('skill-profile')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View all ({profile.skills.length})
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {skillSnapshot.map((skill) => (
                <div key={skill.name} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-900">{skill.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${skill.badgeClass}`}>
                        {skill.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                      {skill.evidence}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs font-bold text-slate-700">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className={`h-full rounded-full ${
                          skill.percent >= 75 ? 'bg-emerald-500' : skill.percent >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${skill.percent}%` }}
                      />
                    </div>
                    <span>{skill.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => onNavigate('skill-profile')}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center justify-between w-full"
            >
              <span>Explore full competencies breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CAREER GAP PREVIEW & NEXT ACTION */}
        <div className="space-y-6">
          {/* Career Gap Preview Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Your biggest opportunities
                </h3>
                <p className="text-xs text-slate-500">
                  Highest-leverage areas to match Full Stack Developer
                </p>
              </div>
              <button
                onClick={() => onNavigate('career-gap')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View Full Career Gap
              </button>
            </div>

            <div className="space-y-3">
              {/* Docker */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900">Docker</div>
                  <div className="text-[11px] text-slate-500">
                    Current: <strong>{profile.hasAddedNewDockerEvidence ? '68%' : '32%'}</strong> &bull; Target: <strong>80%</strong>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  profile.hasAddedNewDockerEvidence
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {profile.hasAddedNewDockerEvidence ? '-12% Gap (Narrowed)' : '-48% Gap'}
                </span>
              </div>

              {/* REST APIs */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900">REST APIs</div>
                  <div className="text-[11px] text-slate-500">
                    Current: <strong>51%</strong> &bull; Target: <strong>75%</strong>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  -24% Gap
                </span>
              </div>

              {/* Node.js */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900">Node.js</div>
                  <div className="text-[11px] text-slate-500">
                    Current: <strong>{profile.hasAddedNewDockerEvidence ? '64%' : '48%'}</strong> &bull; Target: <strong>70%</strong>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  {profile.hasAddedNewDockerEvidence ? '-6% Gap' : '-22% Gap'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('career-gap')}
              className="w-full py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Career Gap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* NEXT ACTION PROMINENT CARD */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 font-mono">
                RECOMMENDED NEXT STEP
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Build a Node.js REST API
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Why:</strong> Improves Node.js and REST API evidence simultaneously. Closes over 30% of your benchmark differential.
            </p>

            <button
              onClick={() => onNavigate('roadmap')}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Start Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* RECENT EVIDENCE & GROWTH PREVIEW SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Evidence List (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recent Evidence
              </h3>
              <p className="text-xs text-slate-500">
                Connected source artifacts supporting your competencies
              </p>
            </div>
            <button
              onClick={() => onNavigate('build-profile')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage Evidence
            </button>
          </div>

          <div className="space-y-3">
            {profile.evidenceList.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0">
                    {getEvidenceIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 block truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {item.source}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-right">
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    {item.dateAdded}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Strong
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GROWTH PREVIEW (1 Col) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Growth Preview
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Dynamic Engine
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Docker Skill</span>
                <span className="text-emerald-700 font-bold font-mono">
                  {profile.hasAddedNewDockerEvidence ? '32% → 68%' : '32% → 68% (Target)'}
                </span>
              </div>

              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                  style={{ width: profile.hasAddedNewDockerEvidence ? '68%' : '32%' }}
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {profile.hasAddedNewDockerEvidence
                  ? 'Verified GitHub project + deployment evidence active.'
                  : 'Verified GitHub project + deployment evidence will upgrade this skill immediately.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('continuous-growth')}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Growth</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
