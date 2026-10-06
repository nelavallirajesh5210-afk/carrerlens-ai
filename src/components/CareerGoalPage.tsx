import React from 'react';
import { Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { CAREER_ROLES } from '../data/mockData';

interface CareerGoalPageProps {
  selectedRoleId: string;
  onSelectRole: (roleId: string) => void;
  onAnalyzeGap: () => void;
}

export const CareerGoalPage: React.FC<CareerGoalPageProps> = ({
  selectedRoleId,
  onSelectRole,
  onAnalyzeGap,
}) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Target Role Selection
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
          What Career Are You Building Toward?
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Choose a target role to compare your current evidence against career requirements.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAREER_ROLES.map((role) => {
          const isSelected = selectedRoleId === role.id;
          return (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-2 border-blue-600 shadow-md ring-2 ring-blue-50'
                  : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {role.category}
                  </span>
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-300" />
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {role.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {role.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Demand: <strong className="text-emerald-700">{role.demandLevel}</strong></span>
                  <span className="font-mono">{role.avgSalary}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>{isSelected ? 'Selected Benchmark' : 'Select Target'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onAnalyzeGap}
          className="px-8 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Analyze Career Gap &rarr;</span>
        </button>
      </div>
    </div>
  );
};
