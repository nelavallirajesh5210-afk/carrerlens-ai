import React, { useState } from 'react';
import { X, Database, Check, Copy, ShieldCheck, ExternalLink, KeyRound } from 'lucide-react';
import {
  getSupabaseConfig,
  saveCustomSupabaseConfig,
  SUPABASE_SQL_SCHEMA,
  isSupabaseConfigured
} from '../services/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ isOpen, onClose }) => {
  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'credentials' | 'schema'>('credentials');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) return;
    saveCustomSupabaseConfig(url.trim(), anonKey.trim());
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Supabase Project Connection &amp; RLS
              </h3>
              <p className="text-xs text-slate-500">
                Real PostgreSQL authentication and private student data isolation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pt-3 pb-2 text-xs">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'credentials'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            API Credentials
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'schema'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            SQL Database Schema &amp; RLS Policies
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {activeTab === 'credentials' ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                Connect your Supabase project using the Project URL and Anon (public) Key from your{' '}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-semibold underline inline-flex items-center gap-0.5"
                >
                  Supabase Project Settings &rarr; API <ExternalLink className="w-3 h-3" />
                </a>.
                Never enter your service-role secret key in browser applications.
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Supabase Anon (Public) Key
                </label>
                <input
                  type="text"
                  required
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  Save &amp; Reload Application
                </button>
                {isSupabaseConfigured() && (
                  <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                    <Check className="w-4 h-4" /> Connected
                  </span>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Run this SQL in your Supabase SQL editor to create the 5 tables with Row Level Security.
                </p>
                <button
                  onClick={handleCopySchema}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-[11px] font-mono overflow-x-auto max-h-72 leading-relaxed">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Client-Side Anon Key only &bull; Passwords never stored in localStorage
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
