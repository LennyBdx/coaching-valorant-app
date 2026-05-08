'use client';

import { useState, useEffect, useRef } from 'react';
import { verifyTeamCode } from '@/app/actions/verify-team-code';
import { TEAMS, SESSION_KEY } from '@/lib/data/teams';

interface Props {
  children: React.ReactNode;
  pageTitle: string;
  pageTag: string;
  accentColor?: string;
}

const TEAM = TEAMS[0]; // ROZ only for now

export function TeamGate({ children, pageTitle, pageTag, accentColor }: Props) {
  const accent = accentColor ?? TEAM.accent;
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady]       = useState(false);
  const [code, setCode]         = useState('');
  const [error, setError]       = useState(false);
  const [shake, setShake]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const active = sessionStorage.getItem(SESSION_KEY);
    if (active === TEAM.slug) setUnlocked(true);
    setReady(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    const ok = await verifyTeamCode(TEAM.name, code);
    setLoading(false);
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, TEAM.slug);
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setCode('');
      setTimeout(() => setShake(false), 450);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
      {/* Page header */}
      <div style={{ padding: '60px 0 48px', borderBottom: '1px solid var(--val-border2)' }}>
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: accent, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
          {pageTag}
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)', margin: 0 }}>
          {pageTitle}
        </h1>
      </div>

      {/* Team lock */}
      <div style={{ paddingTop: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '36px 40px', background: 'var(--val-surface)', border: `1px solid ${TEAM.accent}30`, borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: TEAM.accent }} />

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: TEAM.accent, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.8 }}>
              // Team
            </div>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: '38px', fontWeight: 800, letterSpacing: '-1px', color: 'var(--val-text)', marginBottom: '20px' }}>
              {TEAM.name}
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ animation: shake ? 'teamShake 0.4s ease' : undefined }}
            >
              <div style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
                <input
                  ref={inputRef}
                  type="password"
                  value={code}
                  onChange={e => { setCode(e.target.value); setError(false); }}
                  placeholder="Access code"
                  autoComplete="off"
                  style={{
                    flex: 1,
                    background: 'var(--val-bg)',
                    border: `1px solid ${error ? '#ff4757' : 'var(--val-border2)'}`,
                    borderRadius: '6px',
                    padding: '11px 16px',
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '14px',
                    color: 'var(--val-text)',
                    letterSpacing: '4px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !code.trim()}
                  style={{
                    background: TEAM.accent,
                    border: 'none',
                    borderRadius: '6px',
                    padding: '11px 22px',
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#0a0b0e',
                    fontWeight: 700,
                    cursor: loading ? 'wait' : 'pointer',
                    opacity: loading || !code.trim() ? 0.5 : 1,
                  }}
                >
                  {loading ? '...' : 'Unlock'}
                </button>
              </div>
              {error && (
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#ff4757', marginTop: '10px', letterSpacing: '0.5px' }}>
                  Wrong code.
                </div>
              )}
            </form>
          </div>

          <div style={{ fontSize: '28px', opacity: 0.3, flexShrink: 0 }}>🔒</div>
        </div>
      </div>

      <style>{`
        @keyframes teamShake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
    </main>
  );
}
