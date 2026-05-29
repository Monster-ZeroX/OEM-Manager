'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const router = useRouter();

  // Simulate a quick tactical boot sequence on page load for immersive aesthetics
  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to dashboard
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Access Denied: Decryption Failure');
        setLoading(false);
      }
    } catch (err) {
      setError('Connection Timeout: Host Unreachable');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-black blueprint-grid p-4 selection:bg-cyan-500/30 selection:text-cyan-400">
      
      {/* Decorative Cyber Grid Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20 pointer-events-none hidden md:block" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-cyan-500/20 pointer-events-none hidden md:block" />

      {/* Terminal Node info in corner */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-600 hidden md:flex flex-col gap-1 z-20">
        <div>NODE_ADDR: OEM.SECURE.SYSTEM</div>
        <div>NET_LINK: ESTABLISHED (AWS-US-EAST)</div>
        <div>DB_STATUS: ENCRYPTED_SSL</div>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[10px] text-zinc-600 hidden md:flex flex-col items-end gap-1 z-20">
        <div>SYS_SECURITY: CLASS-4</div>
        <div>SESSION: UNAUTHORIZED</div>
      </div>

      {bootProgress < 100 ? (
        <div className="w-full max-w-md p-8 bg-zinc-950/70 border border-zinc-900 rounded-lg font-mono text-xs text-cyan-400 flex flex-col gap-3 relative z-20 shadow-2xl">
          <div className="text-cyan-400 flex items-center justify-between border-b border-cyan-950 pb-2">
            <span>[ SYSTEM BOOT IN PROGRESS ]</span>
            <span>{Math.min(100, bootProgress)}%</span>
          </div>
          <div className="text-zinc-500 flex flex-col gap-1 min-h-[80px]">
            <div>&gt; Loading decryption libraries...</div>
            {bootProgress > 25 && <div>&gt; Mapping database interfaces...</div>}
            {bootProgress > 50 && <div>&gt; Loading cyber-industrial design tokens...</div>}
            {bootProgress > 75 && <div>&gt; Awaiting secure authentication token...</div>}
          </div>
          <div className="w-full bg-cyan-950/30 h-1.5 rounded overflow-hidden relative">
            <div 
              className="bg-cyan-500 h-full transition-all duration-75 shadow-[0_0_10px_rgba(6,182,212,0.6)]" 
              style={{ width: `${Math.min(100, bootProgress)}%` }} 
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md relative z-20 transition-all duration-500 scale-100 opacity-100">
          
          {/* Main Card Container */}
          <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.06)] relative overflow-hidden">
            
            {/* Status bar */}
            <div className="flex items-center gap-2 mb-8 border-b border-zinc-800/80 pb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="font-mono text-xs text-cyan-400 font-semibold tracking-widest uppercase font-display">
                TERMINAL ACC-09
              </span>
            </div>

            {/* Header Text */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2 font-display uppercase text-neon-glow">
                OEM Part Database
              </h1>
              <p className="text-zinc-400 text-sm">
                Enter access credentials to unlock inventory controls and developer API panels.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono tracking-wider uppercase text-zinc-500">
                  Secure Passkey
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full bg-black/60 border border-zinc-800 focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white font-mono text-sm tracking-widest placeholder:text-zinc-800 focus:outline-none transition-all"
                    required
                    disabled={loading}
                    autoFocus
                  />
                  <div className="absolute right-3 top-3.5 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error display */}
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-950/20 border border-red-900/40 rounded-lg font-mono text-xs text-red-400">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-950/40 border border-cyan-800/80 hover:border-cyan-400/90 text-cyan-400 font-display font-medium uppercase tracking-wider text-xs py-3.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:bg-cyan-500/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-3 w-3 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>DECRYPTING PASSKEY...</span>
                  </>
                ) : (
                  <>
                    <span>INITIALIZE TERMINAL</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer lock note */}
          <div className="mt-6 text-center">
            <span className="text-[10px] font-mono text-zinc-600">
              AUTHORIZED ACCESS ONLY • IP PORT LOGGER ACTIVE
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
