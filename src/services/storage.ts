/**
 * CareerLens AI Persistence Layer
 * Real Supabase PostgreSQL database synchronization for authenticated students,
 * plus local isolated state for Hackathon Demo Mode.
 */

import { INITIAL_STUDENT_PROFILE } from '../data/mockData';
import { EvidenceItem, Skill, StudentProfile, AuthUser } from '../types';
import {
  getStudentProfile,
  getStudentEvidence,
  getStudentSkills,
  getStudentCareerGoal,
  getStudentRoadmap,
  updateStudentProfileScore,
  insertStudentEvidence,
  saveStudentSkill,
  updateStudentSkill,
  setStudentCareerGoal,
  getSupabase,
} from './supabase';

const DEMO_STORAGE_KEY = 'careerlens_demo_student_profile_v1';

// ----------------------------------------------------
// DEMO MODE HELPERS (ISOLATED TO DEMO ONLY)
// ----------------------------------------------------
export function getStoredDemoProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read demo profile from localStorage', err);
  }
  return INITIAL_STUDENT_PROFILE;
}

export function saveDemoProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save demo profile to localStorage', err);
  }
}

export function resetDemoProfile(): StudentProfile {
  try {
    localStorage.removeItem(DEMO_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear demo profile from localStorage', err);
  }
  return JSON.parse(JSON.stringify(INITIAL_STUDENT_PROFILE));
}

// ----------------------------------------------------
// REAL AUTHENTICATED STUDENT DATA LAYER (SUPABASE)
// ----------------------------------------------------

/**
 * Loads the private, isolated profile for an authenticated student from Supabase.
 * If the user is new, returns an empty clean slate for them.
 */
export async function loadAuthenticatedStudentProfile(authUser: AuthUser): Promise<StudentProfile> {
  const client = getSupabase();
  if (!client) {
    return createEmptyStudentProfile(authUser);
  }

  try {
    // 1. Fetch Profile row
    const profileRow = await getStudentProfile(authUser.id);

    // 2. Fetch Evidence Items
    const evidenceRows = await getStudentEvidence(authUser.id);

    // 3. Fetch Skills
    const skillRows = await getStudentSkills(authUser.id);

    // 4. Fetch Career Goal
    const careerGoalRow = await getStudentCareerGoal(authUser.id);

    // 5. Fetch Roadmap
    const roadmapRows = await getStudentRoadmap(authUser.id);

    // Map evidence items
    const evidenceList: EvidenceItem[] = (evidenceRows || []).map((e) => ({
      id: e.id,
      type: (e.type as any) || 'project',
      title: e.title,
      source: e.source_url || 'User Artifact',
      dateAdded: new Date(e.created_at).toLocaleDateString(),
      verified: true,
      details: e.description || '',
      url: e.source_url,
      relatedSkills: e.metadata?.relatedSkills || [],
    }));

    // Map skills
    const skills: Skill[] = (skillRows || []).map((s) => ({
      id: s.skill_name.toLowerCase().replace(/\s+/g, '-'),
      name: s.skill_name,
      category: (s.category as any) || 'languages',
      evidenceStrength: (s.evidence_strength as any) || 'MEDIUM',
      confidencePercent: s.confidence || 50,
      projectsCount: 1,
      evidenceSummary: `${s.evidence_strength} Evidence verified in private workspace`,
      evidenceTypes: ['project'],
      studentConfirmed: true,
      benchmarkScores: {
        'full-stack-developer': {
          current: s.current_score || 50,
          target: 80,
        },
      },
    }));

    // Default roadmap if user has none in DB yet
    const roadmap: any[] = (roadmapRows && roadmapRows.length > 0)
      ? roadmapRows.map((r, idx) => ({
          id: r.id,
          stepNumber: idx + 1,
          title: r.title,
          subtitle: r.description,
          status: (r.status as any) || 'Upcoming',
          action: r.description,
          estimatedEffort: '4-8 hours',
          evidenceDeliverable: 'Repository artifact',
          targetSkill: 'General',
          completed: r.status === 'Completed',
        }))
      : [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Master REST APIs',
            subtitle: 'Learn REST fundamentals and HTTP methods',
            status: 'Start Here',
            action: 'Learn REST architecture constraints and endpoints.',
            estimatedEffort: '4-6 hours',
            evidenceDeliverable: 'Interactive API collection',
            targetSkill: 'REST APIs',
            completed: false,
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Build a Node.js REST API',
            subtitle: 'Create and deploy a backend API',
            status: 'Upcoming',
            action: 'Initialize an Express.js backend with controllers.',
            estimatedEffort: '8-12 hours',
            evidenceDeliverable: 'Public GitHub repository',
            targetSkill: 'Node.js',
            completed: false,
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Learn Docker',
            subtitle: 'Containerize your project',
            status: 'Upcoming',
            action: 'Write a multi-stage Dockerfile for web server.',
            estimatedEffort: '5-8 hours',
            evidenceDeliverable: 'Dockerfile + docker-compose',
            targetSkill: 'Docker',
            completed: false,
          },
        ];

    const targetRoleId = careerGoalRow?.target_role?.toLowerCase().replace(/\s+/g, '-') || 'full-stack-developer';
    const profileScore = profileRow?.profile_score || (skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.confidencePercent, 0) / skills.length) : 0);

    return {
      id: authUser.id,
      name: profileRow?.full_name || authUser.fullName,
      title: 'University Student',
      bio: `Career profile for ${authUser.fullName}`,
      avatar: profileRow?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authUser.fullName)}`,
      email: authUser.email,
      githubUsername: '',
      linkedinUrl: '',
      skillsDetectedCount: skills.length,
      projectsCount: evidenceList.filter((e) => e.type === 'project' || e.type === 'github').length,
      certificatesCount: evidenceList.filter((e) => e.type === 'certificate').length,
      repositoriesCount: evidenceList.filter((e) => e.type === 'github').length,
      profileEvidenceScore: profileScore,
      targetRoleId,
      hasAddedNewDockerEvidence: skills.some((s) => s.id === 'docker' && s.confidencePercent >= 60),
      skills,
      evidenceList,
      roadmap,
    };
  } catch (err) {
    console.error('Failed to load student profile from Supabase:', err);
    return createEmptyStudentProfile(authUser);
  }
}

export function createEmptyStudentProfile(authUser: AuthUser): StudentProfile {
  return {
    id: authUser.id,
    name: authUser.fullName,
    title: 'University Student',
    bio: `Career profile for ${authUser.fullName}`,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authUser.fullName)}`,
    email: authUser.email,
    githubUsername: '',
    linkedinUrl: '',
    skillsDetectedCount: 0,
    projectsCount: 0,
    certificatesCount: 0,
    repositoriesCount: 0,
    profileEvidenceScore: 0,
    targetRoleId: 'full-stack-developer',
    hasAddedNewDockerEvidence: false,
    skills: [],
    evidenceList: [],
    roadmap: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Connect First Evidence Artifact',
        subtitle: 'Connect GitHub or upload resume',
        status: 'Start Here',
        action: 'Go to My Evidence to connect your projects, GitHub, or certificates.',
        estimatedEffort: '5 mins',
        evidenceDeliverable: 'First verified source',
        targetSkill: 'Setup',
        completed: false,
      },
    ],
  };
}

/**
 * Saves or updates student profile data directly to Supabase.
 */
export async function syncStudentProfileToSupabase(userId: string, profile: StudentProfile): Promise<void> {
  const client = getSupabase();
  if (!client) return;

  try {
    await updateStudentProfileScore(userId, profile.profileEvidenceScore);
    await setStudentCareerGoal(userId, profile.targetRoleId);
  } catch (err) {
    console.error('Error syncing profile to Supabase:', err);
  }
}

/**
 * Executes the Docker Growth Milestone for either a real user or demo user.
 */
export async function applyDockerGrowth(
  currentProfile: StudentProfile,
  isDemo: boolean
): Promise<StudentProfile> {
  const newEvidence: EvidenceItem = {
    id: `ev-docker-${Date.now()}`,
    type: 'github',
    title: 'taskflow-microservice-container',
    source: 'github.com/alexmorgan-dev/taskflow-microservice',
    dateAdded: 'Just now',
    verified: true,
    details: 'Verified Dockerfile, docker-compose orchestration, container deployed to Cloud Run.',
    url: 'https://github.com/alexmorgan-dev/taskflow-microservice',
    relatedSkills: ['Docker', 'Node.js', 'REST APIs'],
  };

  // If authenticated real user, persist into Supabase
  if (!isDemo && currentProfile.id) {
    try {
      await insertStudentEvidence(currentProfile.id, {
        type: 'github',
        title: newEvidence.title,
        description: newEvidence.details,
        source_url: newEvidence.url,
        evidence_strength: 'HIGH',
        metadata: { relatedSkills: newEvidence.relatedSkills },
      });

      await updateStudentSkill(currentProfile.id, 'Docker', {
        evidence_strength: 'MEDIUM-HIGH',
        confidence: 68,
        current_score: 68,
      });

      await updateStudentProfileScore(currentProfile.id, Math.max(currentProfile.profileEvidenceScore + 5, 68));
    } catch (err) {
      console.warn('Could not insert docker evidence directly to Supabase:', err);
    }
  }

  const existingDockerSkill = currentProfile.skills.find((s) => s.id === 'docker');

  const updatedSkills: Skill[] = existingDockerSkill
    ? currentProfile.skills.map((skill) => {
        if (skill.id === 'docker') {
          return {
            ...skill,
            evidenceStrength: 'MEDIUM-HIGH' as const,
            confidencePercent: 68,
            projectsCount: skill.projectsCount + 1,
            evidenceSummary: 'GitHub Project + Deployment Evidence (Dockerfile, Cloud Run)',
            benchmarkScores: {
              ...skill.benchmarkScores,
              'full-stack-developer': { current: 68, target: 80 },
            },
          };
        }
        return skill;
      })
    : [
        {
          id: 'docker',
          name: 'Docker',
          category: 'devops' as const,
          evidenceStrength: 'MEDIUM-HIGH' as const,
          confidencePercent: 68,
          projectsCount: 1,
          evidenceSummary: 'GitHub Project + Deployment Evidence (Dockerfile, Cloud Run)',
          evidenceTypes: ['github', 'project'],
          studentConfirmed: true,
          benchmarkScores: {
            'full-stack-developer': { current: 68, target: 80 },
          },
        },
        ...currentProfile.skills,
      ];

  const updatedProfile: StudentProfile = {
    ...currentProfile,
    hasAddedNewDockerEvidence: true,
    profileEvidenceScore: currentProfile.profileEvidenceScore === 0 ? 68 : Math.min(100, currentProfile.profileEvidenceScore + 5),
    projectsCount: currentProfile.projectsCount + 1,
    repositoriesCount: currentProfile.repositoriesCount + 1,
    skillsDetectedCount: updatedSkills.length,
    evidenceList: [newEvidence, ...currentProfile.evidenceList],
    skills: updatedSkills,
  };

  if (isDemo) {
    saveDemoProfile(updatedProfile);
  }

  return updatedProfile;
}
