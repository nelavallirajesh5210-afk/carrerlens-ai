import React from 'react';
import { X, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose, onStart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">How CareerLens Works</h3>
              <p className="text-xs text-slate-500">Why evidence-based intelligence beats keyword resume scanners</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="py-4 space-y-3.5 text-xs text-slate-600">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Ground Truth Evidence Ingestion</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                We ingest code repositories, Git commits, course certifications, and deployed live apps rather than surface-level PDF buzzwords.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Evidence Strength &amp; Student Agency</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                We avoid black-box scores. We measure evidence strength (High, Medium, Low) and empower students to confirm or refine detected skills.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Role Benchmark Differential</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                We benchmark competencies against junior Full Stack, Backend, and AI roles to spotlight your highest-leverage gap.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <h4 className="font-bold text-emerald-900 text-xs">Continuous Loop: Build &rarr; Update</h4>
              <p className="text-emerald-800 mt-0.5 leading-relaxed">
                As you build and publish new code, CareerLens re-evaluates your profile dynamically so your credentials grow with you.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStart();
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Start With Demo Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
