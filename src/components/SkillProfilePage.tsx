import React, { useState } from 'react';
import {
  TrendingUp,
  FolderGit2,
  Award,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Target,
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { EvidenceStrength, Skill, StudentProfile } from '../types';

interface SkillProfilePageProps {
  profile: StudentProfile;
  onNavigateToGaps: () => void;
  onOpenEditSkills: () => void;
}

export const SkillProfilePage: React.FC<SkillProfilePageProps> = ({
  profile,
  onNavigateToGaps,
  onOpenEditSkills,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'devops', label: 'DevOps' },
    { id: 'languages', label: 'Languages' },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? profile.skills
      : profile.skills.filter((s) => s.category === selectedCategory);

  const getStrengthBadge = (strength: EvidenceStrength) => {
    switch (strength) {
      case 'HIGH':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            High Evidence
          </span>
        );
      case 'MEDIUM-HIGH':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Medium-High
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            Medium
          </span>
        );
      case 'LOW':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Low Evidence
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Dashboard Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, {profile.name.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s where your career profile stands today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEditSkills}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Confirm Skills</span>
          </button>
          <button
            onClick={onNavigateToGaps}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Find My Career Gaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TOP SUMMARY CARDS (PROFILE SCORE, SKILLS, PROJECTS, CERTIFICATES) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PROFILE SCORE */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            PROFILE SCORE
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {profile.profileEvidenceScore}%
            </span>
            {profile.hasAddedNewDockerEvidence && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                +5% UPGRADED
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 mt-1">
            {profile.hasAddedNewDockerEvidence ? 'Verified via Docker deployment' : 'Evidence-backed confidence'}
          </span>
        </div>

        {/* SKILLS */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            SKILLS
          </span>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            {profile.skills.length}
          </div>
          <span className="text-xs text-slate-400 mt-1">
            Across 5 domains
          </span>
        </div>

        {/* PROJECTS */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            PROJECTS
          </span>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            {profile.projectsCount}
          </div>
          <span className="text-xs text-slate-400 mt-1">
            Verified GitHub & capstones
          </span>
        </div>

        {/* CERTIFICATES */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            CERTIFICATES
          </span>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            {profile.certificatesCount}
          </div>
          <span className="text-xs text-slate-400 mt-1">
            Academic & industry certs
          </span>
        </div>
      </div>

      {/* CAREER TARGET BANNER */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                CAREER TARGET
              </span>
              <span className="text-xs font-medium px-2 py-0.2 rounded-full bg-blue-50 text-blue-700">
                Primary Goal
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Full Stack Developer
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 block">Profile completion:</span>
            <span className="text-base font-bold text-slate-900">
              {profile.profileEvidenceScore}%
            </span>
          </div>
          <button
            onClick={onNavigateToGaps}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
          >
            <span>View Gap Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TOP SKILL AREAS SECTION */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              TOP SKILL AREAS
            </h2>
            <p className="text-xs text-slate-500">
              Ranked by verified evidence artifact strength
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Human-in-the-loop verified
          </span>
        </div>

        {/* 4 highlighted skills from prompt: Python (High), React (Medium-High), SQL (High), Node.js (Low) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">Python</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                High Evidence
              </span>
            </div>
            <span className="text-xs text-slate-500">3 repos &bull; Distinction cert</span>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">React</span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Medium-High
              </span>
            </div>
            <span className="text-xs text-slate-500">2 web apps &bull; Public repos</span>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '84%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">SQL</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                High Evidence
              </span>
            </div>
            <span className="text-xs text-slate-500">Meta cert &bull; DB project</span>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '76%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">Node.js</span>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Low Evidence
              </span>
            </div>
            <span className="text-xs text-slate-500">Resume only &bull; 0 repos</span>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '48%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* FULL SKILLS COMPETENCY TABLE */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              All Competencies & Evidence
            </h2>
            <p className="text-xs text-slate-500">
              Filter and inspect verifiable skills extracted by CareerLens
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">SKILL</th>
                <th className="py-3 px-3">EVIDENCE</th>
                <th className="py-3 px-3">PROJECTS</th>
                <th className="py-3 px-3">CONFIDENCE</th>
                <th className="py-3 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-900 text-sm">
                      {skill.name}
                    </div>
                    <span className="text-[11px] text-slate-400 capitalize">
                      {skill.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="text-xs text-slate-700">
                      {skill.id === 'docker' && profile.hasAddedNewDockerEvidence
                        ? 'GitHub Project + Deployment Evidence'
                        : skill.evidenceSummary}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900">
                    {skill.id === 'docker' && profile.hasAddedNewDockerEvidence
                      ? 1
                      : skill.projectsCount}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            skill.confidencePercent >= 75
                              ? 'bg-emerald-500'
                              : skill.confidencePercent >= 50
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${skill.confidencePercent}%` }}
                        />
                      </div>
                      <span className="font-mono font-medium text-slate-700">
                        {skill.confidencePercent}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    {getStrengthBadge(skill.evidenceStrength)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
