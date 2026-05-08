'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAvailability, DAYS, HOURS } from '@/lib/hooks/useAvailability';
import CodeModal from '@/components/ui/CodeModal';
import { useCodeGate } from '@/lib/hooks/useCodeGate';
import { TeamGate } from '@/components/ui/TeamGate';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';

function cellColors(count: number): { bg: string; border: string; text: string } {
  if (count === 0) return { bg: 'var(--val-surface)', border: 'var(--val-border2)', text: 'transparent' };
  if (count === 1) return { bg: '#1d2e18', border: '#4a7a3a50', text: '#6aaa50' };
  if (count === 2) return { bg: '#1a3d1a', border: '#5aaa4050', text: '#7ac860' };
  if (count === 3) return { bg: '#174a20', border: '#30b05050', text: '#40c870' };
  if (count === 4) return { bg: '#0d4a28', border: '#00c87050', text: '#00d878' };
  return           { bg: '#083a22', border: '#00e08870', text: '#00e888' };
}

interface TooltipState {
  names: string[];
  day: string;
  hour: number;
  x: number;
  y: number;
}

function PlanningContent() {
  const team = useActiveTeam();
  const { all, players, getAvailableAt, removePlayer } = useAvailability(team ?? undefined);
  const gate = useCodeGate();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  function handleCellEnter(e: React.MouseEvent, day: string, hour: number, names: string[]) {
    if (names.length === 0) { setTooltip(null); return; }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ names, day, hour, x: rect.left + rect.width / 2, y: rect.top });
  }

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={gate.cancel} />

      {/* ── Tooltip ── */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: 'translate(-50%, -100%)',
            background: '#111318',
            border: '1px solid #2a2d38',
            borderRadius: '8px',
            padding: '10px 14px',
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            minWidth: '120px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--val-muted)', marginBottom: '8px' }}>
            {tooltip.day} {tooltip.hour}h
          </div>
          {tooltip.names.map(name => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FD79A8', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--val-text)', fontWeight: 500 }}>{name}</span>
            </div>
          ))}
          {/* Arrow */}
          <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, background: '#111318', border: '1px solid #2a2d38', borderTop: 'none', borderLeft: 'none', rotate: '45deg' }} />
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ padding: '60px 0 40px', borderBottom: '1px solid var(--val-border2)' }}>
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#FD79A8', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
          // Availability
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)', margin: 0 }}>
            PLANNING
          </h1>
          <Link href="/planning/edit">
            <button style={{ background: '#FD79A8', border: 'none', borderRadius: '6px', padding: '12px 24px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0b0e', fontWeight: 'bold', cursor: 'pointer' }}>
              Set my availability
            </button>
          </Link>
        </div>

        {players.length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--val-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {players.length} player{players.length !== 1 ? 's' : ''}:
            </span>
            {players.map(p => (
              <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#FD79A8', background: '#FD79A820', border: '1px solid #FD79A840', padding: '3px 10px 3px 12px', borderRadius: '20px' }}>
                {p}
                <button
                  onClick={() => gate.request(() => removePlayer(p))}
                  title="Remove player"
                  style={{ background: 'transparent', border: 'none', color: '#FD79A860', cursor: 'pointer', fontSize: '12px', padding: '0', lineHeight: 1 }}
                >✕</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Grid ── */}
      {players.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '13px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>📅</div>
          No player has entered their availability yet.
          <br />
          <Link href="/planning/edit" style={{ color: '#FD79A8', display: 'inline-block', marginTop: '12px', textDecoration: 'underline' }}>
            Enter my availability →
          </Link>
        </div>
      ) : (
        <div style={{ paddingTop: '32px', overflowX: 'auto' }}>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--val-muted)' }}>
              Legend:
            </span>
            {[0, 1, 2, 3, 4, 5].map(n => {
              const c = cellColors(n);
              return (
                <span key={n} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '16px', height: '16px', borderRadius: '3px', background: c.bg, border: `1px solid ${c.border}`, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--val-muted)' }}>
                    {n}{n === 5 ? '+' : ''} player{n !== 1 ? 's' : ''}
                  </span>
                </span>
              );
            })}
          </div>

          {/* Grid */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '56px repeat(7, 1fr)', gap: '2px', minWidth: '580px' }}
            onMouseLeave={() => setTooltip(null)}
          >
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
                const names = getAvailableAt(day, hour);
                const count = names.length;
                const c = cellColors(count);
                const isHovered = tooltip?.day === day && tooltip?.hour === hour;
                return (
                  <div
                    key={`${day}-${hour}`}
                    onMouseEnter={e => handleCellEnter(e, day, hour, names)}
                    style={{
                      height: '38px',
                      background: isHovered && count > 0 ? c.bg.replace(')', ', 0.85)').replace('rgb', 'rgba') : c.bg,
                      border: `1px solid ${isHovered && count > 0 ? c.text : c.border}`,
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: count > 0 ? 'default' : 'default',
                      transition: 'border-color 0.1s',
                    }}
                  >
                    {count > 0 && (
                      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: c.text, lineHeight: 1 }}>{count}</span>
                    )}
                  </div>
                );
              }),
            ])}
          </div>
        </div>
      )}
    </main>
  );
}

export default function PlanningPage() {
  return (
    <TeamGate pageTitle="PLANNING" pageTag="// Availability" accentColor="#FD79A8">
      <PlanningContent />
    </TeamGate>
  );
}
