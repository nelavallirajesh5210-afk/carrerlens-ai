import React from 'react';
import {
  Route,
  CheckCircle2,
  ArrowRight,
  Clock,
  Terminal,
  Check,
  Circle
} from 'lucide-react';
import { StudentProfile } from '../types';

interface RoadmapPageProps {
  profile: StudentProfile;
  onNavigateToGrowth: () => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  profile,
  onNavigateToGrowth,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Your Roadmap
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Focused evidence-building steps to move toward Full Stack Developer.
          </p>
        </div>

        <button
          onClick={onNavigateToGrowth}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Simulate Building Evidence</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Vertical Timeline List */}
      <div className="space-y-4">
        {profile.roadmap.map((step, idx) => {
          const isCurrent = step.status === 'Start Here';
          const isCompleted =
            step.completed ||
            (profile.hasAddedNewDockerEvidence && ['step-3', 'step-5', 'step-6'].includes(step.id));

          return (
            <div
              key={step.id}
              className={`p-5 rounded-xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : isCurrent
                  ? 'bg-white border-2 border-blue-600 shadow-sm'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* Step number badge */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : `0${idx + 1}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {step.title}
                      </h3>
                      {isCurrent && (
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.2 rounded-full border border-blue-200">
                          START HERE
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{step.estimatedEffort}</span>
                </div>
              </div>

              {/* Action & Deliverable Details */}
              <div className="mt-4 pl-12 space-y-2.5">
                <div className="p-3 rounded-lg bg-slate-50 text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Action Plan:
                  </span>
                  {step.action}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Evidence Deliverable: <strong className="text-slate-800">{step.evidenceDeliverable}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to Growth */}
      <div className="p-6 rounded-xl bg-slate-100 border border-slate-200 text-center flex flex-col items-center justify-center space-y-3">
        <h3 className="text-base font-bold text-slate-900">
          Ready to see the profile update live?
        </h3>
        <p className="text-xs text-slate-600 max-w-md">
          Simulate publishing a containerized Docker repository and observe your competency scores upgrade in real time.
        </p>
        <button
          onClick={onNavigateToGrowth}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Go to Growth Showcase &rarr;</span>
        </button>
      </div>
    </div>
  );
};
