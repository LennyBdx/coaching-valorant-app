'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAvailability, DAYS, HOURS } from '@/lib/hooks/useAvailability';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { useRouter } from 'next/navigation';
import type { WeekSlots } from '@/lib/hooks/useAvailability';

const NAME_KEY = 'coaching_my_name';
const ACCENT = '#FD79A8';

export default function PlanningEditPage() {
  const router = useRouter();
  const team = useActiveTeam();
  const { all, setPlayerSlots } = useAvailability(team ?? undefined);
  const [name, setName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [slots, setSlots] = useState<WeekSlots>({});
  const [saved, setSaved] = useState(false);
  const drag = useRef<{ active: boolean; value: boolean }>({ active: false, value: true });

  useEffect(() => {
    if (team === '') { router.push('/planning'); return; }
    const stored = localStorage.getItem(NAME_KEY) ?? '';
    if (stored) setNameInput(stored);
  }, [team, router]);

  useEffect(() => {
    const up = () => { drag.current.active = false; };
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  function enterAsPlayer(n: string) {
    setName(n);
    const existing = all[n];
    setSlots(existing ? JSON.parse(JSON.stringify(existing)) : {});
    localStorage.setItem(NAME_KEY, n);
    setSaved(false);
  }

  function isActive(day: string, hour: number): boolean {
    return (slots[day] ?? []).includes(hour);
  }

  function applyToggle(day: string, hour: number, value: boolean) {
    setSlots(prev => {
      const arr = prev[day] ?? [];
      const has = arr.includes(hour);
      let next: number[];
      if (value && !has) next = [...arr, hour].sort((a, b) => a - b);
      else if (!value && has) next = arr.filter(h => h !== hour);
      else next = arr;
      return { ...prev, [day]: next };
    });
  }

  function onCellDown(day: string, hour: number) {
    const next = !isActive(day, hour);
    drag.current = { active: true, value: next };
    applyToggle(day, hour, next);
  }

  function onCellEnter(day: string, hour: number) {
    if (drag.current.active) applyToggle(day, hour, drag.current.value);
  }

  function handleSave() {
    setPlayerSlots(name, slots);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const totalSlots = Object.values(slots).reduce((s, arr) => s + arr.length, 0);

  /* ── Name entry screen ── */
  if (team === null || team === '') return null;

  if (!name) {
    return (
      <main style={{ maxWidth: '560px', margin: '0 auto', padding: '80px 40px' }}>
        <Link href="/planning" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--val-muted)', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← Planning
        </Link>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: '52px', fontWeight: 800, letterSpacing: '-2px', color: 'var(--val-text)', marginTop: '24px', marginBottom: '10px' }}>
          MY AVAILABILITY
        </h1>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--val-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
          Enter your username to log or update your weekly availability.
        </p>

        <form onSubmit={e => { e.preventDefault(); if (nameInput.trim()) enterAsPlayer(nameInput.trim()); }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Your username"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              autoFocus
              style={{ flex: 1, background: 'var(--val-surface)', border: '1px solid var(--val-border2)', borderRadius: '6px', color: 'var(--val-text)', fontFamily: 'var(--font-dm-mono)', fontSize: '14px', padding: '12px 16px', outline: 'none' }}
            />
            <button
              type="submit"
              style={{ background: ACCENT, border: 'none', borderRadius: '6px', padding: '12px 22px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0b0e', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}
            >
              Continue →
            </button>
          </div>
        </form>

        {Object.keys(all).length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--val-muted)', marginBottom: '12px' }}>
              Or pick an existing username
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Object.keys(all).map(p => (
                <button key={p} onClick={() => { setNameInput(p); enterAsPlayer(p); }}
                  style={{ background: 'var(--val-surface)', border: `1px solid ${ACCENT}60`, borderRadius: '20px', color: ACCENT, fontFamily: 'var(--font-dm-mono)', fontSize: '12px', padding: '8px 16px', cursor: 'pointer' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    );
  }

  /* ── Grid editor ── */
  const inputStyle: React.CSSProperties = { userSelect: 'none', WebkitUserSelect: 'none' };

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>

      {/* Header */}
      <div style={{ padding: '48px 0 40px', borderBottom: '1px solid var(--val-border2)' }}>
        <Link href="/planning" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--val-muted)', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← Planning
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
              // {name}
            </div>
            <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)', margin: 0 }}>
              WEEKLY AVAILABILITY
            </h1>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--val-muted)', marginTop: '10px' }}>
              Click or drag to mark your available time slots.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--val-muted)' }}>
              {totalSlots} slot{totalSlots !== 1 ? 's' : ''}
            </span>
            <button onClick={() => setSlots({})}
              style={{ background: 'transparent', border: '1px solid var(--val-border2)', borderRadius: '6px', padding: '10px 18px', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '1px', color: 'var(--val-muted)', cursor: 'pointer' }}>
              Clear all
            </button>
            <button onClick={handleSave}
              style={{ background: saved ? '#00b894' : ACCENT, border: 'none', borderRadius: '6px', padding: '10px 24px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0b0e', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s', minWidth: '130px' }}>
              {saved ? '✓ Saved' : 'Save'}
            </button>
            <button onClick={() => setName('')}
              style={{ background: 'transparent', border: 'none', color: 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>
              Switch player
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ paddingTop: '32px', overflowX: 'auto', ...inputStyle }}>
        <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(7, 1fr)', gap: '2px', minWidth: '580px' }}>

          {/* Day headers */}
          <div />
          {DAYS.map(day => (
            <div key={day} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--val-muted)', textAlign: 'center', paddingBottom: '10px' }}>
              {day.slice(0, 3)}
            </div>
          ))}

          {/* Hour rows */}
          {HOURS.flatMap(hour => [
            <div key={`lbl-${hour}`} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--val-muted)', textAlign: 'right', paddingRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {hour}h
            </div>,
            ...DAYS.map(day => {
              const active = isActive(day, hour);
              return (
                <div
                  key={`${day}-${hour}`}
                  onMouseDown={() => onCellDown(day, hour)}
                  onMouseEnter={() => onCellEnter(day, hour)}
                  style={{
                    height: '40px',
                    background: active ? `${ACCENT}35` : 'var(--val-surface)',
                    border: `1px solid ${active ? ACCENT : 'var(--val-border2)'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background 0.06s, border-color 0.06s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {active && (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  )}
                </div>
              );
            }),
          ])}
        </div>
      </div>
    </main>
  );
}
