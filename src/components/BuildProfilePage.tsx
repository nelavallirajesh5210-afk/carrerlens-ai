import React, { useState } from 'react';
import {
  FileText,
  Github,
  Award,
  FolderGit2,
  Linkedin,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { StudentProfile } from '../types';

interface BuildProfilePageProps {
  onStartAnalysis: (customData?: Partial<StudentProfile>) => void;
  onUseDemo: () => void;
  profile: StudentProfile;
}

export const BuildProfilePage: React.FC<BuildProfilePageProps> = ({
  onStartAnalysis,
  onUseDemo,
  profile,
}) => {
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(true);
  const [resumeFileName, setResumeFileName] = useState<string>('Alex_Morgan_Software_Resume_2026.pdf');
  const [githubUrl, setGithubUrl] = useState<string>(
    profile.githubUsername ? `https://github.com/${profile.githubUsername}` : 'https://github.com/alexmorgan-dev'
  );
  const [certificatesInput, setCertificatesInput] = useState<string>(
    'Meta Database Engineer Certification: SQL Specialization (#MET-9941), University CS201 Python Algorithms Distinction'
  );
  const [projectsUrl, setProjectsUrl] = useState<string>(
    'https://github.com/alexmorgan-dev/campus-event-hub, https://github.com/alexmorgan-dev/py-data-scraper'
  );
  const [linkedinUrl, setLinkedinUrl] = useState<string>(
    profile.linkedinUrl || 'https://linkedin.com/in/alexmorgan-dev'
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeUploaded(true);
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartAnalysis({
      githubUsername: githubUrl.replace('https://github.com/', '').trim(),
      linkedinUrl: linkedinUrl.trim(),
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Evidence
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Everything CareerLens uses to understand your skills.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onUseDemo}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>Load Demo Evidence</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Analyze My Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 CLEAN SOURCE CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Github className="w-5 h-5 text-slate-700" />
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Connected
            </span>
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">GitHub</div>
            <div className="text-xs text-slate-500 mt-0.5">8 repositories connected</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Analyzed
            </span>
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">Resume</div>
            <div className="text-xs text-slate-500 mt-0.5">1 document analyzed</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Verified
            </span>
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">Certificates</div>
            <div className="text-xs text-slate-500 mt-0.5">5 verified items</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Indexed
            </span>
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">Projects</div>
            <div className="text-xs text-slate-500 mt-0.5">8 projects</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Linkedin className="w-5 h-5 text-sky-600" />
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Connected
            </span>
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">LinkedIn</div>
            <div className="text-xs text-slate-500 mt-0.5">Profile synced</div>
          </div>
        </div>
      </div>

      {/* DETAILED EVIDENCE PORTFOLIO LIST */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Connected Evidence Portfolio
            </h2>
            <p className="text-xs text-slate-500">
              Every item maps to specific detected competencies and evidence strength
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {profile.evidenceList.length} total artifacts
          </span>
        </div>

        <div className="space-y-3">
          {profile.evidenceList.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shrink-0">
                  {item.type === 'github' && <Github className="w-4 h-4" />}
                  {item.type === 'certificate' && <Award className="w-4 h-4 text-amber-600" />}
                  {item.type === 'project' && <FolderGit2 className="w-4 h-4 text-blue-600" />}
                  {item.type === 'resume' && <FileText className="w-4 h-4 text-slate-600" />}
                  {item.type === 'linkedin' && <Linkedin className="w-4 h-4 text-sky-600" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ({item.source})
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-0.5">
                    {item.details}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[11px] text-slate-400 font-medium">Skills detected:</span>
                    {item.relatedSkills.map((sk) => (
                      <span
                        key={sk}
                        className="text-[11px] font-medium px-2 py-0.2 rounded bg-white text-slate-700 border border-slate-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Strong Evidence
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.dateAdded}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT / CONNECT ARTIFACTS SECTION */}
      <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Connect Additional Evidence Sources
          </h2>
          <p className="text-xs text-slate-500">
            Paste links or upload documents. You can update anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Resume Upload */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>1. Resume (PDF)</span>
              {resumeUploaded && <span className="text-emerald-600 text-[11px]">Ready</span>}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf"
                id="resume-upload"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 border border-slate-300 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Choose PDF</span>
              </label>
              <span className="text-xs text-slate-500 truncate">
                {resumeFileName}
              </span>
            </div>
          </div>

          {/* GitHub Input */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              2. GitHub Profile URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/alexmorgan-dev"
              className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Certificates Input */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              3. Certificates &amp; Credentials
            </label>
            <input
              type="text"
              value={certificatesInput}
              onChange={(e) => setCertificatesInput(e.target.value)}
              placeholder="Meta DB Cert, AWS, Coursera IDs..."
              className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Projects Input */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              4. Key Project Repositories
            </label>
            <input
              type="text"
              value={projectsUrl}
              onChange={(e) => setProjectsUrl(e.target.value)}
              placeholder="https://github.com/.../campus-event-hub"
              className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Action bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Artifact-backed extraction protects your profile from resume keyword bias.</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Analyze My Evidence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
