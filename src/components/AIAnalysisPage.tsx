import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  FileSearch,
  GitBranch,
  Award,
  ArrowRight,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { EvidenceStrength, StudentProfile } from '../types';

interface AIAnalysisPageProps {
  profile: StudentProfile;
  onConfirmProfile: () => void;
  onOpenEditSkills: () => void;
}

export const AIAnalysisPage: React.FC<AIAnalysisPageProps> = ({
  profile,
  onConfirmProfile,
  onOpenEditSkills,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(true);
  const [phaseIndex, setPhaseIndex] = useState<number>(0);

  const phases = [
    'Parsing uploaded resume structure & artifact links...',
    'Inspecting GitHub repositories, AST trees, & commit frequency...',
    'Validating external certificate hashes & coursework awards...',
    'Synthesizing evidence-backed skill strengths & confidence metrics...',
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setPhaseIndex(1), 350);
    const t2 = setTimeout(() => setPhaseIndex(2), 700);
    const t3 = setTimeout(() => setPhaseIndex(3), 1050);
    const t4 = setTimeout(() => setIsAnalyzing(false), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

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

  if (isAnalyzing) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-6">
          <BrainCircuit className="w-6 h-6 animate-pulse" />
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Analyzing Student Evidence...
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Connecting code commits, verified certificates, and project repositories into a unified skill dossier.
        </p>

        {/* Clean progress bar */}
        <div className="mt-8 space-y-2">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((phaseIndex + 1) / phases.length) * 100}%` }}
            />
          </div>
          <div className="text-xs font-medium text-slate-600 text-left">
            {phases[phaseIndex]}
          </div>
        </div>
      </div>
    );
  }

  const primarySkills = profile.skills.filter((s) =>
    ['python', 'javascript', 'react', 'sql', 'nodejs', 'docker'].includes(s.id)
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Your Evidence &rarr; Your Skills
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Detected competencies backed by verifiable artifacts and commits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEditSkills}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Skills</span>
          </button>
          <button
            onClick={onConfirmProfile}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Confirm Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Professional AI disclaimer banner */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-relaxed">
          <strong>Academic &amp; Student Confirmation Standard:</strong> CareerLens measures <em>Evidence Strength</em> and <em>Evidence Confidence</em> based on real artifacts. You have full agency to review, edit, and confirm these extracted skills before saving.
        </div>
      </div>

      {/* Clean Detected Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {primarySkills.map((skill) => (
          <div
            key={skill.id}
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">
                    {skill.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 capitalize">
                    ({skill.category})
                  </span>
                </div>
                {getStrengthBadge(skill.evidenceStrength)}
              </div>

              {/* Evidence details list */}
              <div className="space-y-1.5 mt-2">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Verified Evidence:
                </span>
                {skill.id === 'python' && (
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      3 GitHub repositories
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      2 projects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Python certificate
                    </li>
                  </ul>
                )}

                {skill.id === 'javascript' && (
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      2 web projects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Resume mention
                    </li>
                  </ul>
                )}

                {skill.id === 'react' && (
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      2 frontend projects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      GitHub repository
                    </li>
                  </ul>
                )}

                {skill.id === 'sql' && (
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Database project
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Certificate
                    </li>
                  </ul>
                )}

                {skill.id === 'nodejs' && (
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Resume only
                    </li>
                    <li className="flex items-center gap-2 text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      0 standalone repositories
                    </li>
                  </ul>
                )}

                {skill.id === 'docker' && (
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {profile.hasAddedNewDockerEvidence
                        ? 'GitHub Project + Deployment Evidence (Cloud Run)'
                        : 'Limited Evidence (Basic resume mention)'}
                    </li>
                    {profile.hasAddedNewDockerEvidence && (
                      <li className="flex items-center gap-2 text-emerald-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Verified Dockerfile & container build
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Confidence: <strong>{skill.confidencePercent}%</strong></span>
              <span className="text-blue-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Verified Artifact
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onConfirmProfile}
          className="px-8 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"
        >
          <span>Confirm Profile &amp; Continue &rarr;</span>
        </button>
      </div>
    </div>
  );
};
