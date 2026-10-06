export type EvidenceType = 'resume' | 'github' | 'certificate' | 'project' | 'linkedin';

export type EvidenceStrength = 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM' | 'LOW';

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  title: string;
  source: string;
  dateAdded: string;
  verified: boolean;
  details: string;
  url?: string;
  relatedSkills: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'languages' | 'tools';
  evidenceStrength: EvidenceStrength;
  confidencePercent: number; // 0 - 100
  projectsCount: number;
  evidenceSummary: string; // e.g. "3 GitHub repositories, 2 projects, Python certificate"
  evidenceTypes: ('github' | 'certificate' | 'project' | 'resume')[];
  studentConfirmed: boolean;
  benchmarkScores: {
    [roleId: string]: {
      current: number;
      target: number;
    };
  };
}

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  description: string;
  demandLevel: 'Very High' | 'High' | 'Growing';
  avgSalary: string;
  coreRequirements: string[];
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  status: 'Start Here' | 'In Progress' | 'Upcoming' | 'Completed';
  action: string;
  estimatedEffort: string;
  evidenceDeliverable: string;
  targetSkill: string;
  completed?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  githubUsername: string;
  linkedinUrl: string;
  skillsDetectedCount: number;
  projectsCount: number;
  certificatesCount: number;
  repositoriesCount: number;
  profileEvidenceScore: number; // e.g. 74%
  targetRoleId: string;
  hasAddedNewDockerEvidence: boolean;
  skills: Skill[];
  evidenceList: EvidenceItem[];
  roadmap: RoadmapStep[];
}

export type PageId =
  | 'landing'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'overview'
  | 'build-profile'
  | 'ai-analysis'
  | 'skill-profile'
  | 'career-goal'
  | 'career-gap'
  | 'roadmap'
  | 'continuous-growth'
  | 'profile';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isDemo: boolean;
}

