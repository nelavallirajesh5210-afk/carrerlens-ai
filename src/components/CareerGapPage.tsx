import React from 'react';
import {
  Target,
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Route,
  ChevronRight
} from 'lucide-react';
import { CAREER_ROLES } from '../data/mockData';
import { StudentProfile } from '../types';

interface CareerGapPageProps {
  profile: StudentProfile;
  selectedRoleId: string;
  onChangeRole: () => void;
  onGenerateRoadmap: () => void;
}

export const CareerGapPage: React.FC<CareerGapPageProps> = ({
  profile,
  selectedRoleId,
  onChangeRole,
  onGenerateRoadmap,
}) => {
  const currentRole = CAREER_ROLES.find((r) => r.id === selectedRoleId) || CAREER_ROLES[0];

  const benchmarkSkills = [
    {
      id: 'javascript',
      name: 'JavaScript',
      current: 78,
      target: 85,
      gap: -7,
      status: 'strong',
      evidenceNote: '2 web projects • Solid foundation',
    },
    {
      id: 'react',
      name: 'React',
      current: 84,
      target: 90,
      gap: -6,
      status: 'strong',
      evidenceNote: 'Frontend repos • Component architecture',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      current: profile.hasAddedNewDockerEvidence ? 64 : 48,
      target: 70,
      gap: profile.hasAddedNewDockerEvidence ? -6 : -22,
      status: profile.hasAddedNewDockerEvidence ? 'strong' : 'major',
      evidenceNote: profile.hasAddedNewDockerEvidence
        ? 'Backend microservice verified'
        : 'Resume mention only • 0 repos',
    },
    {
      id: 'rest-apis',
      name: 'REST APIs',
      current: 51,
      target: 75,
      gap: -24,
      status: 'major',
      evidenceNote: '1 basic coursework endpoint',
    },
    {
      id: 'docker',
      name: 'Docker',
      current: profile.hasAddedNewDockerEvidence ? 68 : 32,
      target: 80,
      gap: profile.hasAddedNewDockerEvidence ? -12 : -48,
      status: profile.hasAddedNewDockerEvidence ? 'amber' : 'major',
      isUpdated: profile.hasAddedNewDockerEvidence,
      evidenceNote: profile.hasAddedNewDockerEvidence
        ? 'Verified Dockerfile + Cloud Run container'
        : 'Limited baseline • Resume only',
    },
    {
      id: 'sql',
      name: 'SQL',
      current: 76,
      target: 80,
      gap: -4,
      status: 'strong',
      evidenceNote: 'Meta Cert + Database schema project',
    },
  ];

  const getGapBadge = (gap: number, isUpdated?: boolean) => {
    if (isUpdated) {
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          NARROWED TO {gap}%
        </span>
      );
    }
    if (Math.abs(gap) <= 10) {
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          {gap}% (Close)
        </span>
      );
    }
    if (Math.abs(gap) <= 25) {
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          {gap}% (Needs Focus)
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
        {gap}% (Major Gap)
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Role Benchmark
            </span>
            <button
              onClick={onChangeRole}
              className="text-xs text-slate-500 hover:text-slate-900 underline"
            >
              Switch Role
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Your path to {currentRole.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            See where your current evidence stands against your target role.
          </p>
        </div>

        <button
          onClick={onGenerateRoadmap}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Build My Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* CLEAN COMPARISON TABLE */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Evidence vs. Target Role Benchmark
            </h2>
            <p className="text-xs text-slate-500">
              Comparison derived from junior engineering industry standards
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              Your Evidence
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              Target Benchmark
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">SKILL</th>
                <th className="py-3 px-3">YOUR EVIDENCE</th>
                <th className="py-3 px-3">TARGET</th>
                <th className="py-3 px-3">GAP</th>
                <th className="py-3 px-3 text-right">BENCHMARK VISUAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {benchmarkSkills.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-900 text-sm">
                      {item.name}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {item.evidenceNote}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900 text-sm">
                    {item.current}%
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-500 text-sm">
                    {item.target}%
                  </td>
                  <td className="py-3.5 px-3">
                    {getGapBadge(item.gap, item.isUpdated)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="w-32 ml-auto">
                      <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        {/* Target marker */}
                        <div
                          className="absolute top-0 bottom-0 bg-slate-300 border-r border-slate-400"
                          style={{ width: `${item.target}%` }}
                        />
                        {/* Current bar */}
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.gap >= -10
                              ? 'bg-emerald-500'
                              : item.gap >= -25
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${item.current}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BIGGEST OPPORTUNITIES SECTION */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            BIGGEST OPPORTUNITIES
          </h2>
          <p className="text-xs text-slate-500">
            Highest leverage actions to rapidly strengthen your profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 01 Docker */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  01
                </span>
                <span className="text-xs font-semibold text-rose-700">
                  {profile.hasAddedNewDockerEvidence ? 'Gap Narrowed (-12%)' : 'Major Gap (-48%)'}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Docker</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {profile.hasAddedNewDockerEvidence
                  ? 'Great progress! Verified container deployment added to profile.'
                  : 'Highest leverage gap. Adding a containerized project will immediately move your score.'}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
              Deliverable: Dockerfile + Cloud Run deploy
            </div>
          </div>

          {/* 02 REST APIs */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  02
                </span>
                <span className="text-xs font-semibold text-amber-700">
                  Gap (-24%)
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">REST APIs</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Build backend API endpoints with validation, JWT, and standard HTTP error codes.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
              Deliverable: Express router test suite
            </div>
          </div>

          {/* 03 Node.js */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  03
                </span>
                <span className="text-xs font-semibold text-amber-700">
                  {profile.hasAddedNewDockerEvidence ? 'Gap (-6%)' : 'Gap (-22%)'}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Node.js</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Transition resume-only knowledge into a dedicated public backend repository.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
              Deliverable: Modular server architecture
            </div>
          </div>
        </div>
      </div>

      {/* Professional Notice */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <strong>Benchmark Guidance:</strong> These metrics reflect comparative junior engineering benchmarks rather than an absolute job guarantee. CareerLens prioritizes the highest return-on-effort skills.
      </div>

      {/* Build My Roadmap Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onGenerateRoadmap}
          className="px-8 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Build My Roadmap &rarr;</span>
        </button>
      </div>
    </div>
  );
};
