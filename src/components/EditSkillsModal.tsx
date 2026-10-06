import React, { useState } from 'react';
import { X, Check, Plus, Trash2, Award } from 'lucide-react';
import { EvidenceStrength, Skill } from '../types';

interface EditSkillsModalProps {
  isOpen: boolean;
  skills: Skill[];
  onClose: () => void;
  onSaveSkills: (updatedSkills: Skill[]) => void;
}

export const EditSkillsModal: React.FC<EditSkillsModalProps> = ({
  isOpen,
  skills,
  onClose,
  onSaveSkills,
}) => {
  const [localSkills, setLocalSkills] = useState<Skill[]>(skills);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('backend');
  const [newSkillStrength, setNewSkillStrength] = useState<EvidenceStrength>('MEDIUM');

  if (!isOpen) return null;

  const handleToggleConfirm = (id: string) => {
    setLocalSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, studentConfirmed: !s.studentConfirmed } : s))
    );
  };

  const handleStrengthChange = (id: string, strength: EvidenceStrength) => {
    const confidenceMap: Record<EvidenceStrength, number> = {
      HIGH: 85,
      'MEDIUM-HIGH': 75,
      MEDIUM: 60,
      LOW: 40,
    };
    setLocalSkills((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              evidenceStrength: strength,
              confidencePercent: confidenceMap[strength],
            }
          : s
      )
    );
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: newSkillName.toLowerCase().replace(/\s+/g, '-'),
      name: newSkillName.trim(),
      category: newSkillCategory,
      evidenceStrength: newSkillStrength,
      confidencePercent: newSkillStrength === 'HIGH' ? 85 : newSkillStrength === 'MEDIUM-HIGH' ? 75 : 60,
      projectsCount: 1,
      evidenceSummary: 'Manual student submission • Coursework or repository',
      evidenceTypes: ['project'],
      studentConfirmed: true,
      benchmarkScores: {
        'full-stack-developer': { current: 65, target: 75 },
      },
    };

    setLocalSkills((prev) => [newSkill, ...prev]);
    setNewSkillName('');
  };

  const handleDelete = (id: string) => {
    setLocalSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 shadow-xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Student Confirmation &amp; Skills Editor</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Human-in-the-Loop
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Refine what was detected. Your confirmation anchors the evidence baseline.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Skill Bar */}
        <form onSubmit={handleAddSkill} className="py-3 flex flex-wrap gap-2 items-center border-b border-slate-100">
          <input
            type="text"
            placeholder="Add skill (e.g. GraphQL, AWS, Go)..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            className="flex-1 min-w-[180px] text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value as any)}
            className="text-xs px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="languages">Languages</option>
            <option value="tools">Tools</option>
          </select>
          <select
            value={newSkillStrength}
            onChange={(e) => setNewSkillStrength(e.target.value as any)}
            className="text-xs px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="HIGH">High</option>
            <option value="MEDIUM-HIGH">Med-High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        {/* List of skills */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
          {localSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleToggleConfirm(skill.id)}
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    skill.studentConfirmed
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-300 text-transparent hover:border-slate-400 bg-white'
                  }`}
                  title={skill.studentConfirmed ? 'Confirmed by student' : 'Click to confirm'}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{skill.name}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{skill.evidenceSummary}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={skill.evidenceStrength}
                  onChange={(e) => handleStrengthChange(skill.id, e.target.value as EvidenceStrength)}
                  className="text-xs font-medium px-2 py-1 rounded-md bg-white text-slate-700 border border-slate-200 focus:outline-none"
                >
                  <option value="HIGH">High</option>
                  <option value="MEDIUM-HIGH">Med-High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleDelete(skill.id)}
                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {localSkills.filter((s) => s.studentConfirmed).length} of {localSkills.length} skills confirmed
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSaveSkills(localSkills);
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Save Confirmations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
