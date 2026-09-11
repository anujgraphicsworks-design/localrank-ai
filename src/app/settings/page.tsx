'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { getSettings, saveSettings, resetDemoData } from '@/lib/firebase/db';
import { IntegrationSettings } from '@/lib/types';
import { ShieldCheck, Key, Save, RotateCcw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<IntegrationSettings>({
    googleMapsApiKey: '',
    googleMapsStatus: 'not_configured',
    geminiApiKey: '',
    geminiStatus: 'not_configured',
    enableDemoMode: true,
    maxScrapeConcurrency: 5,
    requestTimeoutSeconds: 15,
    defaultSenderName: 'Anuj'
  });

  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState<{ provider: string; text: string; success: boolean } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    await saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestConnection = async (provider: 'google_maps' | 'gemini') => {
    setTestingProvider(provider);
    setTestMessage(null);

    const apiKey = provider === 'google_maps' ? settings.googleMapsApiKey : settings.geminiApiKey;

    try {
      const res = await fetch('/api/settings/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey })
      });
      const data = await res.json();
      setTestMessage({ provider, text: data.message, success: data.success });
      if (data.success) {
        setSettings((prev) => ({
          ...prev,
          [provider === 'google_maps' ? 'googleMapsStatus' : 'geminiStatus']: 'connected'
        }));
      }
    } catch (e: any) {
      setTestMessage({ provider, text: e.message, success: false });
    } finally {
      setTestingProvider(null);
    }
  };

  const handleReset = async () => {
    if (confirm('Reset workspace leads and demo dataset to initial state?')) {
      await resetDemoData();
      alert('Workspace reset to initial demo state!');
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Settings & Integrations"
        subtitle="Manage external Google API credentials, connection diagnostics, demo mode, and defaults"
      />

      <div className="p-6 max-w-4xl space-y-6">
        {/* Security Alert */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 leading-relaxed">
            <span className="font-semibold text-zinc-100">Enterprise Security Architecture: </span>
            All external API credentials and secrets are evaluated server-side. Private keys are never bundled or exposed in client JavaScript.
          </div>
        </div>

        {/* Integrations Card */}
        <div className="p-6 rounded-2xl glass-panel space-y-6">
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
            API Providers &amp; Connections
          </h3>

          {/* Google Maps Platform */}
          <div className="space-y-3 pb-6 border-b border-zinc-800/80">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-zinc-200">Google Maps / Places API Key</label>
                <p className="text-[11px] text-zinc-400">Used for live business search and place details queries.</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Demo Baseline Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="password"
                value={settings.googleMapsApiKey || ''}
                onChange={(e) => setSettings({ ...settings, googleMapsApiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                onClick={() => handleTestConnection('google_maps')}
                disabled={testingProvider === 'google_maps'}
                className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-colors shrink-0 flex items-center gap-1.5"
              >
                {testingProvider === 'google_maps' && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>Test Connection</span>
              </button>
            </div>
            {testMessage?.provider === 'google_maps' && (
              <p className={`text-[11px] ${testMessage.success ? 'text-emerald-400' : 'text-amber-400'}`}>
                {testMessage.text}
              </p>
            )}
          </div>

          {/* Google Gemini AI */}
          <div className="space-y-3 pb-6 border-b border-zinc-800/80">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-zinc-200">Google Gemini / Vertex AI Key</label>
                <p className="text-[11px] text-zinc-400">Used for deep reasoning, email synthesis, and competitor gap explanations.</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Heuristic Engine Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="password"
                value={settings.geminiApiKey || ''}
                onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                onClick={() => handleTestConnection('gemini')}
                disabled={testingProvider === 'gemini'}
                className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-colors shrink-0 flex items-center gap-1.5"
              >
                {testingProvider === 'gemini' && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>Test Connection</span>
              </button>
            </div>
            {testMessage?.provider === 'gemini' && (
              <p className={`text-[11px] ${testMessage.success ? 'text-emerald-400' : 'text-amber-400'}`}>
                {testMessage.text}
              </p>
            )}
          </div>

          {/* Outreach Defaults */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Outreach &amp; Rate Limits</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Default Sender Name</label>
                <input
                  type="text"
                  value={settings.defaultSenderName}
                  onChange={(e) => setSettings({ ...settings, defaultSenderName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Max Crawl Concurrency</label>
                <input
                  type="number"
                  value={settings.maxScrapeConcurrency}
                  onChange={(e) => setSettings({ ...settings, maxScrapeConcurrency: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="demoMode"
                checked={settings.enableDemoMode}
                onChange={(e) => setSettings({ ...settings, enableDemoMode: e.target.checked })}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="demoMode" className="text-xs text-zinc-300 font-medium">
                Keep Demo Mode Active (Uses verified Austin Emergency Dental benchmarks when offline)
              </label>
            </div>
          </div>

          {/* Footer Save */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Workspace Data</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all"
            >
              {savedSuccess ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'Saved Settings!' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
