/**
 * CareerLens AI — Supabase Client & Database Services
 * Real authentication and private student data isolation via Row Level Security (RLS).
 */

import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { EvidenceItem, Skill, RoadmapStep } from '../types';

// Read from Vite environment or localStorage override for dynamic connection
const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export function getSupabaseConfig(): { url: string; anonKey: string } {
  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('careerlens_supabase_url') || '' : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('careerlens_supabase_anon_key') || '' : '';

  return {
    url: envUrl || localUrl,
    anonKey: envKey || localKey,
  };
}

export function saveCustomSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('careerlens_supabase_url', url.trim());
    localStorage.setItem('careerlens_supabase_anon_key', anonKey.trim());
    window.location.reload();
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
}

// ==========================================
// SQL MIGRATION SCHEMA WITH RLS POLICIES
// ==========================================
export const SUPABASE_SQL_SCHEMA = `
-- ========================================================
-- CAREERLENS AI — DATABASE SCHEMA & ROW LEVEL SECURITY
-- Run this in your Supabase SQL Editor (SQL Editor -> New Query)
-- ========================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  target_role TEXT DEFAULT 'Full Stack Developer',
  profile_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Evidence Items Table
CREATE TABLE IF NOT EXISTS public.evidence_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  source_url TEXT,
  file_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  evidence_strength TEXT DEFAULT 'MEDIUM',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL,
  evidence_strength TEXT DEFAULT 'MEDIUM',
  confidence INTEGER DEFAULT 50,
  current_score INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Career Goals Table
CREATE TABLE IF NOT EXISTS public.career_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  target_role TEXT NOT NULL DEFAULT 'Full Stack Developer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Roadmap Items Table
CREATE TABLE IF NOT EXISTS public.roadmap_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Upcoming',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Evidence Items Policies
CREATE POLICY "Users can view own evidence" ON public.evidence_items
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own evidence" ON public.evidence_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own evidence" ON public.evidence_items
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own evidence" ON public.evidence_items
  FOR DELETE USING (auth.uid() = user_id);

-- Skills Policies
CREATE POLICY "Users can view own skills" ON public.skills
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skills" ON public.skills
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON public.skills
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own skills" ON public.skills
  FOR DELETE USING (auth.uid() = user_id);

-- Career Goals Policies
CREATE POLICY "Users can view own career goals" ON public.career_goals
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own career goals" ON public.career_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own career goals" ON public.career_goals
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own career goals" ON public.career_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Roadmap Items Policies
CREATE POLICY "Users can view own roadmap" ON public.roadmap_items
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roadmap" ON public.roadmap_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own roadmap" ON public.roadmap_items
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own roadmap" ON public.roadmap_items
  FOR DELETE USING (auth.uid() = user_id);
`;

// ==========================================
// AUTHENTICATION APIS
// ==========================================

export async function signUpStudent(email: string, password: string, fullName: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured. Please check your project URL and Anon key.');

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  // If user session is returned immediately (email confirmation disabled in Supabase),
  // automatically initialize the profile record
  if (data.user) {
    try {
      await initializeStudentProfile(data.user.id, fullName, email);
    } catch (profileErr) {
      console.warn('Initial profile insert deferred or pending email verification:', profileErr);
    }
  }

  return data;
}

export async function signInStudent(email: string, password: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured. Please check your project URL and Anon key.');

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOutStudent() {
  const client = getSupabase();
  if (!client) return;
  await client.auth.signOut();
}

export async function resetPassword(email: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured.');

  const { data, error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
  return data;
}

export async function updateStudentPassword(newPassword: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured.');

  const { data, error } = await client.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
}

export async function getCurrentSession(): Promise<Session | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data } = await client.auth.getSession();
    return data.session;
  } catch (err) {
    console.error('Error fetching Supabase session:', err);
    return null;
  }
}

// ==========================================
// DATABASE / DATA ACCESS APIS
// ==========================================

export async function initializeStudentProfile(userId: string, fullName: string, email: string) {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('profiles')
    .upsert({
      user_id: userId,
      full_name: fullName,
      email: email,
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
      target_role: 'Full Stack Developer',
      profile_score: 0,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) {
    console.error('Error initializing student profile in Supabase:', error);
    throw error;
  }
  return data;
}

export async function getStudentProfile(userId: string) {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error getting student profile:', error);
    return null;
  }
  return data;
}

export async function updateStudentProfileScore(userId: string, score: number) {
  const client = getSupabase();
  if (!client) return;

  await client
    .from('profiles')
    .update({ profile_score: score, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
}

export async function getStudentEvidence(userId: string): Promise<any[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from('evidence_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching student evidence:', error);
    return [];
  }
  return data || [];
}

export async function insertStudentEvidence(userId: string, item: {
  type: string;
  title: string;
  description?: string;
  source_url?: string;
  evidence_strength?: string;
  metadata?: any;
}) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase client not initialized');

  const { data, error } = await client
    .from('evidence_items')
    .insert({
      user_id: userId,
      type: item.type,
      title: item.title,
      description: item.description || '',
      source_url: item.source_url || '',
      evidence_strength: item.evidence_strength || 'MEDIUM',
      metadata: item.metadata || {},
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getStudentSkills(userId: string): Promise<any[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from('skills')
    .select('*')
    .eq('user_id', userId)
    .order('confidence', { ascending: false });

  if (error) {
    console.error('Error fetching student skills:', error);
    return [];
  }
  return data || [];
}

export async function saveStudentSkill(userId: string, skill: {
  skill_name: string;
  category: string;
  evidence_strength: string;
  confidence: number;
  current_score: number;
}) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase client not initialized');

  const { data, error } = await client
    .from('skills')
    .insert({
      user_id: userId,
      skill_name: skill.skill_name,
      category: skill.category,
      evidence_strength: skill.evidence_strength,
      confidence: skill.confidence,
      current_score: skill.current_score,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateStudentSkill(userId: string, skillName: string, updates: {
  evidence_strength?: string;
  confidence?: number;
  current_score?: number;
}) {
  const client = getSupabase();
  if (!client) return;

  await client
    .from('skills')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('skill_name', skillName);
}

export async function getStudentCareerGoal(userId: string) {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('career_goals')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) return null;
  return data;
}

export async function setStudentCareerGoal(userId: string, targetRole: string) {
  const client = getSupabase();
  if (!client) return;

  await client
    .from('career_goals')
    .upsert({
      user_id: userId,
      target_role: targetRole,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  await client
    .from('profiles')
    .update({ target_role: targetRole, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
}

export async function getStudentRoadmap(userId: string): Promise<any[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from('roadmap_items')
    .select('*')
    .eq('user_id', userId)
    .order('order_index', { ascending: true });

  if (error) return [];
  return data || [];
}
