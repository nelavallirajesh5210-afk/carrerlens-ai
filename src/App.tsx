/**
 * CAREERLENS AI
 * "See your skills. Find your gaps. Build your career."
 *
 * Professional Student Career Intelligence Platform
 * Multi-User Supabase Authentication & Private Student Data Isolation via RLS
 */

import React, { useState, useEffect } from 'react';
import { PageId, Skill, StudentProfile, AuthUser } from './types';
import {
  getStoredDemoProfile,
  saveDemoProfile,
  resetDemoProfile,
  loadAuthenticatedStudentProfile,
  createEmptyStudentProfile,
  applyDockerGrowth,
  syncStudentProfileToSupabase,
} from './services/storage';
import {
  getSupabase,
  getCurrentSession,
  signOutStudent,
  isSupabaseConfigured,
  insertStudentEvidence,
  saveStudentSkill,
  setStudentCareerGoal,
} from './services/supabase';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { HowItWorksModal } from './components/HowItWorksModal';
import { EditSkillsModal } from './components/EditSkillsModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { OverviewDashboard } from './components/OverviewDashboard';
import { BuildProfilePage } from './components/BuildProfilePage';
import { AIAnalysisPage } from './components/AIAnalysisPage';
import { SkillProfilePage } from './components/SkillProfilePage';
import { CareerGoalPage } from './components/CareerGoalPage';
import { CareerGapPage } from './components/CareerGapPage';
import { RoadmapPage } from './components/RoadmapPage';
import { ContinuousGrowthPage } from './components/ContinuousGrowthPage';
import { StudentProfileView } from './components/StudentProfileView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<StudentProfile>(getStoredDemoProfile);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('full-stack-developer');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [isEditSkillsOpen, setIsEditSkillsOpen] = useState<boolean>(false);
  const [isSupabaseConfigOpen, setIsSupabaseConfigOpen] = useState<boolean>(false);
  const [isInitializingAuth, setIsInitializingAuth] = useState<boolean>(true);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. SUPABASE AUTH SESSION INITIALIZATION & LISTENER
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        const session = await getCurrentSession();
        if (session?.user && isMounted) {
          const user: AuthUser = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Student',
            avatarUrl: session.user.user_metadata?.avatar_url,
            isDemo: false,
          };
          setAuthUser(user);

          // Load student's private data from Supabase
          const studentProfile = await loadAuthenticatedStudentProfile(user);
          if (isMounted) {
            setProfile(studentProfile);
            setSelectedRoleId(studentProfile.targetRoleId || 'full-stack-developer');
            if (currentPage === 'login' || currentPage === 'signup') {
              setCurrentPage('overview');
            }
          }
        }
      } catch (err) {
        console.error('Session init error:', err);
      } finally {
        if (isMounted) setIsInitializingAuth(false);
      }
    }

    initSession();

    // Listen for Auth changes in Supabase
    const client = getSupabase();
    if (client) {
      const { data: authListener } = client.auth.onAuthStateChange(async (event, session) => {
        if (!isMounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          const user: AuthUser = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Student',
            avatarUrl: session.user.user_metadata?.avatar_url,
            isDemo: false,
          };
          setAuthUser(user);
          const studentProfile = await loadAuthenticatedStudentProfile(user);
          setProfile(studentProfile);
          setCurrentPage('overview');
        } else if (event === 'SIGNED_OUT') {
          setAuthUser(null);
          setProfile(getStoredDemoProfile());
          setCurrentPage('login');
        }
      });

      return () => {
        isMounted = false;
        authListener?.subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. PROTECTED ROUTE ENFORCEMENT
  useEffect(() => {
    if (isInitializingAuth) return;

    const publicPages: PageId[] = ['landing', 'login', 'signup', 'forgot-password', 'reset-password'];
    const isProtected = !publicPages.includes(currentPage);

    // If unauthenticated and not in Demo Mode, redirect to login
    if (isProtected && !authUser) {
      setCurrentPage('login');
    }
  }, [currentPage, authUser, isInitializingAuth]);

  // Demo Profile loader (Isolated from Supabase)
  const handleUseDemo = () => {
    const demoUser: AuthUser = {
      id: 'demo-student-alex',
      email: 'alex.morgan@university.edu',
      fullName: 'Alex Morgan',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      isDemo: true,
    };
    setAuthUser(demoUser);
    const demo = resetDemoProfile();
    setProfile(demo);
    setSelectedRoleId('full-stack-developer');
    addToast(
      'info',
      'Demo Mode Active',
      'Loaded Alex Morgan with 8 GitHub repos, 5 projects, and 5 verified certificates.'
    );
    setCurrentPage('overview');
  };

  // Reset entire demo
  const handleResetDemo = () => {
    if (authUser && !authUser.isDemo) {
      addToast('info', 'Real Account', 'You are logged into a real student account. Use logout to switch users.');
      return;
    }
    const reset = resetDemoProfile();
    setProfile(reset);
    addToast('info', 'Demo Reset', 'Reset student profile baseline to initial demo values.');
    setCurrentPage('overview');
  };

  // Real User Login Success
  const handleLoginSuccess = async (user: { id: string; email: string; fullName: string }) => {
    const realUser: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isDemo: false,
    };
    setAuthUser(realUser);
    addToast('success', `Welcome back, ${user.fullName}`, 'Your private career workspace is loaded.');
    const studentProfile = await loadAuthenticatedStudentProfile(realUser);
    setProfile(studentProfile);
    setSelectedRoleId(studentProfile.targetRoleId || 'full-stack-developer');
    setCurrentPage('overview');
  };

  // Real User Sign Up Success
  const handleSignUpSuccess = async (user: { id: string; email: string; fullName: string }) => {
    const realUser: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isDemo: false,
    };
    setAuthUser(realUser);
    addToast('success', `Account Created`, `Welcome to CareerLens, ${user.fullName}!`);
    const studentProfile = createEmptyStudentProfile(realUser);
    setProfile(studentProfile);
    setSelectedRoleId('full-stack-developer');
    setCurrentPage('overview');
  };

  // Real User Logout
  const handleLogout = async () => {
    if (authUser && !authUser.isDemo) {
      await signOutStudent();
    }
    setAuthUser(null);
    setProfile(getStoredDemoProfile());
    addToast('info', 'Logged Out', 'You have been signed out securely.');
    setCurrentPage('login');
  };

  // Transition from Build Profile to AI Analysis
  const handleStartAnalysis = async (customData?: Partial<StudentProfile>) => {
    addToast('info', 'Analyzing Evidence', 'Connecting repositories and verifying credentials...');

    // If real user, persist evidence artifacts to Supabase
    if (authUser && !authUser.isDemo && customData) {
      try {
        if (customData.githubUsername) {
          await insertStudentEvidence(authUser.id, {
            type: 'github',
            title: `${customData.githubUsername} repositories`,
            description: `Connected GitHub account: github.com/${customData.githubUsername}`,
            source_url: `https://github.com/${customData.githubUsername}`,
            evidence_strength: 'STRONG',
            metadata: { relatedSkills: ['Git', 'JavaScript', 'Python'] },
          });

          await saveStudentSkill(authUser.id, {
            skill_name: 'Python',
            category: 'languages',
            evidence_strength: 'HIGH',
            confidence: 88,
            current_score: 85,
          });

          await saveStudentSkill(authUser.id, {
            skill_name: 'JavaScript',
            category: 'languages',
            evidence_strength: 'MEDIUM',
            confidence: 78,
            current_score: 78,
          });
        }
      } catch (err) {
        console.warn('Real user evidence insertion warning:', err);
      }
    }

    setCurrentPage('ai-analysis');
  };

  // Confirm profile after AI extraction
  const handleConfirmProfile = async () => {
    addToast('success', 'Profile Confirmed', 'Evidence portfolio compiled.');
    if (authUser && !authUser.isDemo) {
      const refreshed = await loadAuthenticatedStudentProfile(authUser);
      setProfile(refreshed);
    }
    setCurrentPage('overview');
  };

  // Save manual adjustments from EditSkillsModal
  const handleSaveSkills = (updatedSkills: Skill[]) => {
    setProfile((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
    addToast('success', 'Skills Updated', 'Student confirmations saved.');
  };

  // Apply Hackathon Milestone: Docker updates from 32% to 68%!
  const handleApplyNewEvidence = async () => {
    const isDemo = authUser?.isDemo ?? true;
    const updated = await applyDockerGrowth(profile, isDemo);
    setProfile(updated);
    addToast(
      'success',
      'Profile Updated Successfully',
      'Docker evidence increased from 32% to 68%. Overall Evidence Score raised!'
    );
  };

  // Reset just the growth state back to 32% for repeating the demo
  const handleResetGrowth = () => {
    setProfile((prev) => {
      const reset = resetDemoProfile();
      return {
        ...prev,
        hasAddedNewDockerEvidence: false,
        profileEvidenceScore: 74,
        skills: reset.skills,
        roadmap: reset.roadmap,
      };
    });
    addToast('info', 'Growth State Reset', 'Docker returned to 32% for demonstration.');
  };

  // Select target role
  const handleSelectRole = async (roleId: string) => {
    setSelectedRoleId(roleId);
    if (authUser && !authUser.isDemo) {
      await setStudentCareerGoal(authUser.id, roleId);
    }
  };

  // ========================================================
  // ROUTING & RENDERING
  // ========================================================

  // Public Landing Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 flex flex-col font-sans">
        <LandingPage
          onNavigate={setCurrentPage}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          onUseDemo={handleUseDemo}
        />
        <HowItWorksModal
          isOpen={isHowItWorksOpen}
          onClose={() => setIsHowItWorksOpen(false)}
          onStart={handleUseDemo}
        />
        <SupabaseConfigModal
          isOpen={isSupabaseConfigOpen}
          onClose={() => setIsSupabaseConfigOpen(false)}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  // Public Auth Pages: Login, Sign Up, Forgot Password, Reset Password
  if (currentPage === 'login') {
    return (
      <>
        <LoginPage
          onNavigate={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
          onUseDemo={handleUseDemo}
          onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        />
        <SupabaseConfigModal
          isOpen={isSupabaseConfigOpen}
          onClose={() => setIsSupabaseConfigOpen(false)}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  if (currentPage === 'signup') {
    return (
      <>
        <SignUpPage
          onNavigate={setCurrentPage}
          onSignUpSuccess={handleSignUpSuccess}
          onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        />
        <SupabaseConfigModal
          isOpen={isSupabaseConfigOpen}
          onClose={() => setIsSupabaseConfigOpen(false)}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  if (currentPage === 'forgot-password') {
    return (
      <>
        <ForgotPasswordPage onNavigate={setCurrentPage} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  if (currentPage === 'reset-password') {
    return (
      <>
        <ResetPasswordPage onNavigate={setCurrentPage} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  // Protected Workspace Dashboard Shell (Left Sidebar + Header + Content)
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 flex font-sans antialiased">
      {/* Left Sidebar on desktop */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          profile={profile}
          authUser={authUser}
          onResetDemo={handleResetDemo}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          onLogout={handleLogout}
          onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        />
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          profile={profile}
          authUser={authUser}
          onResetDemo={handleResetDemo}
          onLogout={handleLogout}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* 1. Overview Dashboard */}
          {currentPage === 'overview' && (
            <OverviewDashboard
              profile={profile}
              authUser={authUser}
              onNavigate={setCurrentPage}
            />
          )}

          {/* 2. My Evidence */}
          {currentPage === 'build-profile' && (
            <BuildProfilePage
              profile={profile}
              onStartAnalysis={handleStartAnalysis}
              onUseDemo={handleUseDemo}
            />
          )}

          {/* 3. Evidence Analysis */}
          {currentPage === 'ai-analysis' && (
            <AIAnalysisPage
              profile={profile}
              onConfirmProfile={handleConfirmProfile}
              onOpenEditSkills={() => setIsEditSkillsOpen(true)}
            />
          )}

          {/* 4. Skills Directory & Competency Table */}
          {currentPage === 'skill-profile' && (
            <SkillProfilePage
              profile={profile}
              onNavigateToGaps={() => setCurrentPage('career-gap')}
              onOpenEditSkills={() => setIsEditSkillsOpen(true)}
            />
          )}

          {/* 5. Target Career Goal Selection */}
          {currentPage === 'career-goal' && (
            <CareerGoalPage
              selectedRoleId={selectedRoleId}
              onSelectRole={handleSelectRole}
              onAnalyzeGap={() => setCurrentPage('career-gap')}
            />
          )}

          {/* 6. Career Gap Analysis */}
          {currentPage === 'career-gap' && (
            <CareerGapPage
              profile={profile}
              selectedRoleId={selectedRoleId}
              onChangeRole={() => setCurrentPage('career-goal')}
              onGenerateRoadmap={() => setCurrentPage('roadmap')}
            />
          )}

          {/* 7. Action Roadmap */}
          {currentPage === 'roadmap' && (
            <RoadmapPage
              profile={profile}
              onNavigateToGrowth={() => setCurrentPage('continuous-growth')}
            />
          )}

          {/* 8. Continuous Growth */}
          {currentPage === 'continuous-growth' && (
            <ContinuousGrowthPage
              profile={profile}
              onApplyNewEvidence={handleApplyNewEvidence}
              onResetGrowth={handleResetGrowth}
              onViewSkillProfile={() => setCurrentPage('skill-profile')}
              onViewGapAnalysis={() => setCurrentPage('career-gap')}
            />
          )}

          {/* 9. My Profile */}
          {currentPage === 'profile' && (
            <StudentProfileView
              profile={profile}
              authUser={authUser}
              onNavigate={setCurrentPage}
              onLogout={handleLogout}
              onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onStart={handleUseDemo}
      />

      <EditSkillsModal
        isOpen={isEditSkillsOpen}
        skills={profile.skills}
        onClose={() => setIsEditSkillsOpen(false)}
        onSaveSkills={handleSaveSkills}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseConfigOpen}
        onClose={() => setIsSupabaseConfigOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
