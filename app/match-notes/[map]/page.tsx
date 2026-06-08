'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMatchNotes } from '@/lib/hooks/useMatchNotes';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { getMapBySlug } from '@/lib/data/maps';
import Modal from '@/components/ui/Modal';
import CodeModal from '@/components/ui/CodeModal';
import { useCodeGate } from '@/lib/hooks/useCodeGate';
import type { MatchNote } from '@/lib/types';

const EMPTY_FORM = { date: new Date().toISOString().split('T')[0], opponent: '', atkScore: 0, defScore: 0, oppScore: 0, notes: '' };

function getResult(note: MatchNote): 'win' | 'loss' | 'draw' {
  const ours = note.atkScore + note.defScore;
  if (ours > note.oppScore) return 'win';
  if (ours < note.oppScore) return 'loss';
  return 'draw';
}

const RESULT_STYLES = {
  win:  { label: 'WIN',  bg: '#00b89420', color: '#00b894', border: '#00b89440' },
  loss: { label: 'LOSS', bg: '#ff475720', color: '#ff4757', border: '#ff475740' },
  draw: { label: 'DRAW', bg: '#e8ff4720', color: '#e8ff47', border: '#e8ff4740' },
};

export default function MapMatchNotesPage() {
  const { map: mapSlug } = useParams<{ map: string }>();
  const mapInfo = getMapBySlug(mapSlug);
  const router = useRouter();
  const team = useActiveTeam();
  const { notes, add, remove, update } = useMatchNotes(mapSlug, team ?? undefined);
  const gate = useCodeGate();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toDelete, setToDelete] = useState<{ id: string; opponent: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  function startEdit(note: MatchNote) {
    setEditingId(note.id);
    setEditForm({ date: note.date, opponent: note.opponent, atkScore: note.atkScore, defScore: note.defScore, oppScore: note.oppScore, notes: note.notes });
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editForm.opponent.trim() || !editingId) return;
    gate.request(() => {
      update(editingId!, { date: editForm.date, opponent: editForm.opponent, atkScore: +editForm.atkScore, defScore: +editForm.defScore, oppScore: +editForm.oppScore, notes: editForm.notes });
      setEditingId(null);
    });
  }

  useEffect(() => {
    if (team === '') router.push('/match-notes');
  }, [team, router]);

  if (team === null || team === '') return null;

  if (!mapInfo) {
    return <main style={{ padding: '60px', color: 'var(--val-text)', fontFamily: 'var(--font-dm-mono)' }}>Map not found.</main>;
  }

  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  const wins   = notes.filter(n => getResult(n) === 'win').length;
  const losses = notes.filter(n => getResult(n) === 'loss').length;
  const draws  = notes.filter(n => getResult(n) === 'draw').length;
  const avgAtk = notes.length ? Math.round(notes.reduce((s, n) => s + n.atkScore, 0) / notes.length * 10) / 10 : 0;
  const avgDef = notes.length ? Math.round(notes.reduce((s, n) => s + n.defScore, 0) / notes.length * 10) / 10 : 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.opponent.trim()) return;
    gate.request(() => {
      add({ mapSlug, mapName: mapInfo!.name, ...form, atkScore: +form.atkScore, defScore: +form.defScore, oppScore: +form.oppScore });
      setForm(EMPTY_FORM);
      setShowForm(false);
    });
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--val-bg)',
    border: '1px solid var(--val-border2)',
    borderRadius: '6px',
    color: 'var(--val-text)',
    fontFamily: 'var(--font-dm-mono)',
    fontSize: '13px',
    padding: '10px 14px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-mono)',
    fontSize: '9px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--val-muted)',
    display: 'block',
    marginBottom: '6px',
  };

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={() => { gate.cancel(); setToDelete(null); }} />

      {/* ── Header ── */}
      <div style={{ padding: '48px 0 40px', borderBottom: '1px solid var(--val-border2)' }}>
        <Link href="/match-notes" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--val-muted)', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← All maps
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: mapInfo.color, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
              // {mapInfo.name}
            </div>
            <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)', margin: 0 }}>
              MATCH NOTES
            </h1>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            style={{ background: showForm ? 'transparent' : mapInfo.color, border: `1px solid ${mapInfo.color}`, borderRadius: '6px', padding: '12px 24px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: showForm ? mapInfo.color : '#0a0b0e', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {showForm ? '✕ Cancel' : '+ Add a result'}
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      {notes.length > 0 && (
        <div style={{ display: 'flex', gap: '0', paddingTop: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--val-border2)' }}>
          {[
            { label: 'Matches', value: notes.length, color: 'var(--val-text)' },
            { label: 'Wins', value: wins, color: '#00b894' },
            { label: 'Losses', value: losses, color: '#ff4757' },
            { label: 'Draws', value: draws, color: '#e8ff47' },
            { label: 'Avg. ATK', value: avgAtk, color: '#ff4757' },
            { label: 'Avg. DEF', value: avgDef, color: '#4ecdc4' },
          ].map(({ label, value, color }, i) => (
            <div key={label} style={{ paddingRight: '32px', marginRight: '32px', borderRight: i < 5 ? '1px solid var(--val-border2)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '40px', lineHeight: 1, color, letterSpacing: '-1px' }}>{value}</div>
              <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--val-muted)', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--val-surface)', border: `1px solid ${mapInfo.color}40`, borderRadius: '8px', padding: '28px 32px', marginTop: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: mapInfo.color }} />
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: mapInfo.color, marginBottom: '20px' }}>
            // New result
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Opponent</label>
              <input type="text" placeholder="Team name" value={form.opponent} onChange={e => setForm(f => ({ ...f, opponent: e.target.value }))} style={inputStyle} required />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ ...labelStyle, color: '#ff4757' }}>ATK Rounds</label>
              <input type="number" min={0} max={13} value={form.atkScore} onChange={e => setForm(f => ({ ...f, atkScore: +e.target.value }))} style={{ ...inputStyle, borderColor: '#ff475740' }} required />
            </div>
            <div>
              <label style={{ ...labelStyle, color: '#4ecdc4' }}>DEF Rounds</label>
              <input type="number" min={0} max={13} value={form.defScore} onChange={e => setForm(f => ({ ...f, defScore: +e.target.value }))} style={{ ...inputStyle, borderColor: '#4ecdc440' }} required />
            </div>
            <div>
              <label style={labelStyle}>Opponent score</label>
              <input type="number" min={0} max={25} value={form.oppScore} onChange={e => setForm(f => ({ ...f, oppScore: +e.target.value }))} style={inputStyle} required />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Notes / Observations</label>
            <textarea
              placeholder="Key takeaways: positioning, eco, opponent strats..."
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>
          <button type="submit" style={{ background: mapInfo.color, border: 'none', borderRadius: '6px', padding: '12px 28px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0b0e', fontWeight: 'bold', cursor: 'pointer' }}>
            Save
          </button>
        </form>
      )}

      {/* ── List ── */}
      <div style={{ paddingTop: '28px' }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '13px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>📊</div>
            No results recorded for {mapInfo.name}.
            <br />
            <button onClick={() => setShowForm(true)} style={{ background: 'transparent', border: 'none', color: mapInfo.color, fontFamily: 'var(--font-dm-mono)', fontSize: '12px', cursor: 'pointer', marginTop: '12px', textDecoration: 'underline' }}>
              Add the first result →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sorted.map(note => {
              const result = getResult(note);
              const rs = RESULT_STYLES[result];
              const total = note.atkScore + note.defScore;
              return (
                <div key={note.id} style={{ background: 'var(--val-surface)', border: `1px solid ${editingId === note.id ? mapInfo.color + '60' : 'var(--val-border2)'}`, borderRadius: '8px', padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: editingId === note.id ? mapInfo.color : rs.color }} />

                  {editingId === note.id ? (
                    <form onSubmit={handleEditSubmit}>
                      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: mapInfo.color, marginBottom: '16px' }}>
                        // Edit result
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <label style={labelStyle}>Date</label>
                          <input type="date" value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} required />
                        </div>
                        <div>
                          <label style={labelStyle}>Opponent</label>
                          <input type="text" value={editForm.opponent} onChange={e => setEditForm(f => ({ ...f, opponent: e.target.value }))} style={inputStyle} required />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <label style={{ ...labelStyle, color: '#ff4757' }}>ATK Rounds</label>
                          <input type="number" min={0} max={13} value={editForm.atkScore} onChange={e => setEditForm(f => ({ ...f, atkScore: +e.target.value }))} style={{ ...inputStyle, borderColor: '#ff475740' }} required />
                        </div>
                        <div>
                          <label style={{ ...labelStyle, color: '#4ecdc4' }}>DEF Rounds</label>
                          <input type="number" min={0} max={13} value={editForm.defScore} onChange={e => setEditForm(f => ({ ...f, defScore: +e.target.value }))} style={{ ...inputStyle, borderColor: '#4ecdc440' }} required />
                        </div>
                        <div>
                          <label style={labelStyle}>Opponent score</label>
                          <input type="number" min={0} max={25} value={editForm.oppScore} onChange={e => setEditForm(f => ({ ...f, oppScore: +e.target.value }))} style={inputStyle} required />
                        </div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Notes / Observations</label>
                        <textarea value={editForm.notes} onChange={e => setEditForm(f => ({ ...f, notes: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ background: mapInfo.color, border: 'none', borderRadius: '6px', padding: '10px 22px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0b0e', fontWeight: 'bold', cursor: 'pointer' }}>
                          Save
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} style={{ background: 'transparent', border: '1px solid var(--val-border2)', borderRadius: '6px', padding: '10px 22px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--val-muted)', cursor: 'pointer' }}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                          {/* Result badge */}
                          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: rs.color, background: rs.bg, border: `1px solid ${rs.border}`, padding: '4px 10px', borderRadius: '4px', flexShrink: 0 }}>
                            {rs.label}
                          </span>
                          {/* Score */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', color: rs.color, lineHeight: 1 }}>{total}</span>
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--val-muted)' }}>vs</span>
                            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', color: 'var(--val-muted)', lineHeight: 1 }}>{note.oppScore}</span>
                          </div>
                          {/* ATK / DEF breakdown */}
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#ff4757', background: '#ff475718', border: '1px solid #ff475730', padding: '3px 8px', borderRadius: '4px' }}>
                              ATK {note.atkScore}
                            </span>
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#4ecdc4', background: '#4ecdc418', border: '1px solid #4ecdc430', padding: '3px 8px', borderRadius: '4px' }}>
                              DEF {note.defScore}
                            </span>
                          </div>
                          {/* Opponent + date */}
                          <div>
                            <span style={{ fontFamily: 'var(--font-syne)', fontSize: '15px', fontWeight: 800, color: 'var(--val-text)' }}>{note.opponent}</span>
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--val-muted)', marginLeft: '10px' }}>
                              {new Date(note.date + 'T12:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        {/* Edit + Delete */}
                        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                          <button
                            onClick={() => startEdit(note)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--val-muted)', cursor: 'pointer', fontSize: '13px', padding: '0 6px' }}
                            title="Edit"
                          >✏</button>
                          <button
                            onClick={() => { setToDelete({ id: note.id, opponent: note.opponent }); gate.request(() => { remove(note.id); setToDelete(null); }); }}
                            style={{ background: 'transparent', border: 'none', color: 'var(--val-muted)', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}
                            title="Delete"
                          >✕</button>
                        </div>
                      </div>

                      {note.notes && (
                        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--val-muted)', lineHeight: 1.7, marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--val-border2)', whiteSpace: 'pre-wrap' }}>
                          {note.notes}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!toDelete && !gate.open}
        title="Delete this result?"
        message={toDelete ? `The match against "${toDelete.opponent}" will be permanently deleted.` : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        danger
        onConfirm={() => gate.request(() => { if (toDelete) remove(toDelete.id); setToDelete(null); })}
        onCancel={() => setToDelete(null)}
      />
    </main>
  );
}
