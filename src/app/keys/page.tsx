'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface ApiKey {
  id: number;
  name: string;
  key_prefix: string;
  created_at: string;
  expires_at: string | null;
  last_used_at: string | null;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyExpiry, setNewKeyExpiry] = useState('30');
  
  // Generated raw token display
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Status logs
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/keys');
      const data = await res.json();
      if (res.ok && data.success) {
        setApiKeys(data.data);
      }
    } catch (err) {
      console.error('Failed to query API keys:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setGeneratedKey(null);
    setCopied(false);

    if (!newKeyName.trim()) return;

    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newKeyName.trim(),
          expirationDays: parseInt(newKeyExpiry)
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setGeneratedKey(data.key);
        setNewKeyName('');
        setSuccessMessage('Client API key generated successfully.');
        fetchApiKeys();
      } else {
        setErrorMessage(data.error || 'Failed to generate API key');
      }
    } catch (err) {
      setErrorMessage('Network connection lost during key generation.');
    }
  };

  const handleRevokeApiKey = async (id: number) => {
    if (!confirm('Are you sure you want to revoke this API key? Third-party integrations utilizing this key will immediately lose access.')) {
      return;
    }

    try {
      const res = await fetch('/api/keys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage('API key revoked successfully.');
        fetchApiKeys();
      } else {
        setErrorMessage(data.error || 'Failed to revoke API key');
      }
    } catch (err) {
      setErrorMessage('Network connection lost during key revocation.');
    }
  };

  const handleCopy = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Page Header */}
        <div className="border-b border-zinc-800 pb-5">
          <h2 className="text-xl font-semibold text-white">Developer Access Controls</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Provision, audit, and revoke secure API tokens for third-party systems and external inventory integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Key Generator Form Side (4 cols on lg) */}
          <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Generate Client Token</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">Define metadata for the new authentication key.</p>
            </div>

            <form onSubmit={handleGenerateApiKey} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                  Client Label / Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alto Inventory Script, Claude Agent Sync..."
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-700 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                  Expiration Term
                </label>
                <select
                  value={newKeyExpiry}
                  onChange={(e) => setNewKeyExpiry(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-lg px-3 py-2 text-xs text-zinc-400 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                  <option value="365">1 Year</option>
                  <option value="0">Never Expires</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                PROVISION NEW KEY
              </button>
            </form>

            {errorMessage && (
              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-[10px] text-red-400 font-medium">
                ❌ {errorMessage}
              </div>
            )}

            {successMessage && !generatedKey && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-[10px] text-emerald-400 font-medium">
                ✓ {successMessage}
              </div>
            )}
          </div>

          {/* Key Inventory Display List (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* Generated Raw Key display frame */}
            {generatedKey && (
              <div className="border border-blue-900/60 bg-blue-950/10 p-5 rounded-xl flex flex-col gap-3 relative shadow-inner animate-fadeIn">
                <div className="flex items-center justify-between border-b border-blue-900/30 pb-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                  <span>⚠️ Secure Developer Key - Copy Now</span>
                  <button 
                    onClick={() => setGeneratedKey(null)}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-950 border border-zinc-800 p-3 rounded-lg">
                  <code className="text-xs font-mono text-blue-300 break-all select-all font-bold tracking-wider">
                    {generatedKey}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shrink-0 cursor-pointer active:scale-95 transition-all"
                  >
                    {copied ? 'COPIED!' : 'COPY KEY'}
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal">
                  For your safety, this key is encrypted and stored in hashed format. It cannot be shown again after you dismiss this warning.
                </p>
              </div>
            )}

            {/* Keys Table Container */}
            <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm min-h-[250px] flex flex-col justify-between">
              {loading && apiKeys.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-xs text-zinc-500 font-mono">
                  <svg className="animate-spin h-5 w-5 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading api credentials...</span>
                </div>
              ) : apiKeys.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-zinc-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-2-4a2 2 0 11-4 0 2 2 0 014 0zM8 21h8a2 2 0 002-2v-1.5a2.5 2.5 0 00-2.5-2.5h-7A2.5 2.5 0 006 17.5V19a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">No Active Keys</p>
                  <p className="text-[10px] text-zinc-600 mt-1 max-w-xs px-6">
                    Create a token using the sidebar form to allow secure external API integration.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                        <th className="px-6 py-4">Client Label</th>
                        <th className="px-6 py-4">Prefix</th>
                        <th className="px-6 py-4">Created At</th>
                        <th className="px-6 py-4">Expires At</th>
                        <th className="px-6 py-4">Last Used</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/80">
                      {apiKeys.map((key) => (
                        <tr key={key.id} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="px-6 py-4 text-zinc-200 font-semibold">
                            {key.name}
                          </td>
                          <td className="px-6 py-4 text-blue-400 font-mono tracking-wider font-semibold">
                            {key.key_prefix}
                          </td>
                          <td className="px-6 py-4 text-zinc-400 font-mono">
                            {new Date(key.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-zinc-400 font-mono">
                            {key.expires_at ? new Date(key.expires_at).toLocaleDateString() : 'Never'}
                          </td>
                          <td className="px-6 py-4 font-mono text-zinc-400">
                            {key.last_used_at ? (
                              <span className="text-emerald-400">{new Date(key.last_used_at).toLocaleDateString()}</span>
                            ) : (
                              <span className="text-zinc-600">Never</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleRevokeApiKey(key.id)}
                              className="text-[10px] text-zinc-500 hover:text-red-400 border border-zinc-850 hover:border-red-950 bg-transparent hover:bg-red-950/10 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                            >
                              REVOKE
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
