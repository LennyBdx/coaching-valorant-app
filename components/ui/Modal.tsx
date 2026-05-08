'use client';

import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function Modal({ isOpen, title, message, confirmLabel = 'OK', cancelLabel = 'Cancel', danger = false, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) onCancel();
      if (e.key === 'Enter') onConfirm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onConfirm, onCancel]);

  if (!isOpen) return null;

  const confirmColor = danger ? '#ff4757' : '#e8ff47';
  const confirmText  = danger ? '#fff'    : '#0a0b0e';

  return (
    <div
      onClick={onCancel}
      style={{ position: 'fixed', inset: 0, background: 'rgba(6,8,16,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#111318', border: '1px solid #2a2d38', borderRadius: '12px', padding: '32px 36px', minWidth: '340px', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
      >
        <div style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 800, color: '#e2e4ea', marginBottom: message ? '10px' : '24px', letterSpacing: '-0.5px' }}>
          {title}
        </div>
        {message && (
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: '#8a90a2', lineHeight: 1.6, marginBottom: '28px' }}>
            {message}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {onCancel && (
            <button
              onClick={onCancel}
              style={{ padding: '9px 20px', background: 'transparent', border: '1px solid #2a2d38', borderRadius: '6px', color: '#5a5f72', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '1px', cursor: 'pointer' }}
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            style={{ padding: '9px 20px', background: confirmColor, border: `1px solid ${confirmColor}`, borderRadius: '6px', color: confirmText, fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
