import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  TrendingUp,
  CheckCircle2,
  GitBranch,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Terminal,
  ArrowUpRight
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ContinuousGrowthPageProps {
  profile: StudentProfile;
  onApplyNewEvidence: () => void;
  onResetGrowth: () => void;
  onViewSkillProfile: () => void;
  onViewGapAnalysis: () => void;
}

export const ContinuousGrowthPage: React.FC<ContinuousGrowthPageProps> = ({
  profile,
  onApplyNewEvidence,
  onResetGrowth,
  onViewSkillProfile,
  onViewGapAnalysis,
}) => {
  const isUpdated = profile.hasAddedNewDockerEvidence;
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = () => {
    setIsUpdating(true);
    setTimeout(() => {
      onApplyNewEvidence();
      setIsUpdating(false);

      // Subtle professional celebration confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#3b82f6'],
      });
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Dynamic Progression Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
            Your Progress
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Your profile gets stronger as you build.
          </p>
        </div>

        {/* Global Evidence Score Badge: 74% -> 79% */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4 self-start sm:self-auto">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">
              Profile Evidence Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-800">
                {isUpdated ? '74%' : '74%'}
              </span>
              <span className="text-slate-400">&rarr;</span>
              <span className="text-xl font-extrabold text-emerald-700">
                {isUpdated ? '79%' : '79% (Projected)'}
              </span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* BEFORE -> NEW EVIDENCE -> AFTER THREE-STEP PROGRESSION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. BEFORE */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                BEFORE
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Baseline
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Docker
            </h3>
            <div className="text-3xl font-mono font-bold text-amber-600 mt-2">
              32%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Limited Evidence (Resume only)
            </p>

            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '32%' }} />
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-xs text-slate-400">
            0 container repos detected
          </div>
        </div>

        {/* 2. NEW EVIDENCE */}
        <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">
                NEW EVIDENCE
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Detected
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              taskflow-microservice
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              github.com/alexmorgan-dev
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dockerfile</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Containerized application</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Deployment</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-blue-100 text-xs text-blue-700 font-medium">
            Multi-stage build verified
          </div>
        </div>

        {/* 3. AFTER */}
        <div className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
          isUpdated
            ? 'bg-white border-2 border-emerald-600 shadow-md ring-2 ring-emerald-50'
            : 'bg-white border-slate-200 opacity-90'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                AFTER
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {isUpdated ? 'Live Verified' : 'Expected'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">
                Docker
              </h3>
              {isUpdated && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  +36% BOOST
                </span>
              )}
            </div>

            <div className="text-3xl font-mono font-bold text-emerald-700 mt-2">
              68%
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Strong Evidence
            </p>

            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                style={{ width: '68%' }}
              />
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-xs text-slate-500">
            GitHub Project + Deployment Evidence
          </div>
        </div>
      </div>

      {/* ARTIFACT ACTION CARD */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Interactive Profile Update Simulation
            </h2>
            <p className="text-xs text-slate-500">
              Click below to execute the evidence update loop and upgrade Docker from 32% to 68%.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isUpdated && (
              <button
                onClick={onResetGrowth}
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to 32%</span>
              </button>
            )}

            <button
              onClick={handleUpdateClick}
              disabled={isUpdating}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isUpdated
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              }`}
            >
              {isUpdating ? (
                <span>Updating Profile...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isUpdated ? 'Re-Verify Profile' : 'Update My Profile'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code proof snippet */}
        <div className="p-3.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
          <div className="text-slate-400"># Verified repository artifact: taskflow-microservice</div>
          <div>FROM node:20-alpine AS builder</div>
          <div>WORKDIR /app &amp;&amp; COPY package*.json ./ &amp;&amp; RUN npm ci</div>
          <div>EXPOSE 8080 &amp;&amp; CMD [&quot;node&quot;, &quot;dist/server.js&quot;]</div>
          <div className="text-emerald-400">✓ Health Check: HTTP 200 OK (Cloud Run active)</div>
        </div>
      </div>

      {/* Quick Navigation to Inspect Impact */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onViewSkillProfile}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Inspect Skill Profile Dashboard ({profile.profileEvidenceScore}%)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onViewGapAnalysis}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Narrowed Career Gap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
