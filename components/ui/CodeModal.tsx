'use client';

import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  error: boolean;
  loading: boolean;
  onConfirm: (code: string) => void;
  onCancel: () => void;
}

export default function CodeModal({ isOpen, error, loading, onConfirm, onCancel }: Props) {
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!isOpen) setCode('');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() && !loading) onConfirm(code.trim());
  }

  return (
    <div
      onClick={onCancel}
      style={{ position: 'fixed', inset: 0, background: 'rgba(6,8,16,0.82)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#111318', border: '1px solid #2a2d38', borderRadius: '12px', padding: '32px 36px', width: '340px', boxShadow: '0 24px 64px rgba(0,0,0,0.7)' }}
      >
        <div style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 800, color: '#e2e4ea', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Code required
        </div>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: '#5a5f72', lineHeight: 1.6, marginBottom: '20px' }}>
          Enter the admin code to perform this action.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="••••••••"
            value={code}
            onChange={e => setCode(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: '#0d1117',
              border: `1px solid ${error ? '#ff4757' : '#2a2d38'}`,
              borderRadius: '6px',
              padding: '10px 14px',
              color: '#e2e4ea',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box',
              letterSpacing: '4px',
            }}
          />
          {error && (
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#ff4757', marginTop: '8px', letterSpacing: '0.5px' }}>
              Wrong code. Try again.
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{ padding: '9px 20px', background: 'transparent', border: '1px solid #2a2d38', borderRadius: '6px', color: '#5a5f72', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '1px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !code.trim()}
              style={{ padding: '9px 22px', background: '#FF4655', border: '1px solid #FF4655', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold', cursor: loading ? 'wait' : 'pointer', opacity: (!code.trim() || loading) ? 0.5 : 1 }}
            >
              {loading ? '...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
