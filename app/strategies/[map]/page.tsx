'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStrategies } from '@/lib/hooks/useStrategies';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { getMapBySlug } from '@/lib/data/maps';
import { MapSectionHeader } from '@/components/layout/MapSectionHeader';
import Modal from '@/components/ui/Modal';
import CodeModal from '@/components/ui/CodeModal';
import { useCodeGate } from '@/lib/hooks/useCodeGate';

const STRAT_TAGS = ['rush', 'default', 'fake', 'save', 'retake', 'split'];

export default function MapStrategiesPage() {
  const { map: mapSlug } = useParams<{ map: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { strategies, add, remove, reorder } = useStrategies(mapSlug, team ?? undefined);
  const gate = useCodeGate();
  const [toDelete, setToDelete] = useState<{ id: string; name: string } | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterSide, setFilterSide] = useState<'all' | 'attack' | 'defense'>('all');
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    if (team === '') router.push('/strategies');
  }, [team, router]);

  if (team === null || team === '') return null;

  if (!mapInfo) {
    return <main style={{ padding: '60px', color: 'var(--val-text)', fontFamily: 'var(--font-dm-mono)' }}>Map not found.</main>;
  }

  const filtered = strategies.filter(s => {
    if (filterSide !== 'all' && s.side !== filterSide) return false;
    if (filterTags.length > 0 && !filterTags.every(t => (s.tags ?? []).includes(t))) return false;
    return true;
  });

  function toggleTag(tag: string) {
    setFilterTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }

  function handleDuplicate(id: string) {
    const s = strategies.find(x => x.id === id);
    if (!s) return;
    gate.request(() => add({ mapSlug: s.mapSlug, mapName: s.mapName, name: s.name + ' (copy)', side: s.side, shapes: s.shapes, tags: s.tags ?? [] }));
  }

  function handleDelete(id: string, name: string) {
    setToDelete({ id, name });
    gate.request(() => { remove(id); setToDelete(null); });
  }

  function handleDrop(targetId: string) {
    if (dragId && dragId !== targetId) reorder(dragId, targetId);
    setDragId(null);
    setDragOverId(null);
  }

  const hasFilters = filterSide !== 'all' || filterTags.length > 0;

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={gate.cancel} />

      <MapSectionHeader
        mapInfo={mapInfo}
        backHref="/strategies"
        title="STRAT BOOK"
        createHref={`/strategies/${mapSlug}/create`}
        createLabel="+ New strat"
        onCreateClick={() => gate.request(() => router.push(`/strategies/${mapSlug}/create`))}
      />

      {/* ── Filter bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px', paddingBottom: '4px', flexWrap: 'wrap' }}>
        {(['all', 'attack', 'defense'] as const).map(s => (
          <button key={s}
            onClick={() => setFilterSide(s)}
            style={{ padding: '4px 12px', background: filterSide === s ? (s === 'attack' ? '#ff475720' : s === 'defense' ? '#4ecdc420' : '#e8ff4720') : 'transparent', border: `1px solid ${filterSide === s ? (s === 'attack' ? '#ff4757' : s === 'defense' ? '#4ecdc4' : '#e8ff47') : 'var(--val-border)'}`, borderRadius: '4px', color: filterSide === s ? (s === 'attack' ? '#ff4757' : s === 'defense' ? '#4ecdc4' : '#e8ff47') : 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
            {s === 'all' ? 'All' : s === 'attack' ? 'ATK' : 'DEF'}
          </button>
        ))}
        <div style={{ width: '1px', height: '18px', background: 'var(--val-border)', margin: '0 4px' }} />
        {STRAT_TAGS.map(tag => (
          <button key={tag}
            onClick={() => toggleTag(tag)}
            style={{ padding: '4px 10px', background: filterTags.includes(tag) ? '#e8ff4720' : 'transparent', border: `1px solid ${filterTags.includes(tag) ? '#e8ff47' : 'var(--val-border)'}`, borderRadius: '20px', color: filterTags.includes(tag) ? '#e8ff47' : 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '1px', cursor: 'pointer' }}>
            {tag}
          </button>
        ))}
        {hasFilters && (
          <button onClick={() => { setFilterSide('all'); setFilterTags([]); }}
            style={{ padding: '4px 10px', background: 'transparent', border: 'none', color: '#ff4757', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', cursor: 'pointer' }}>
            ✕ reset
          </button>
        )}
      </div>

      <div style={{ paddingTop: '24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '13px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>📋</div>
            {hasFilters ? 'No strats match the current filters.' : `No strats for ${mapInfo.name} yet.`}
            <br />
            {!hasFilters && (
              <button onClick={() => gate.request(() => router.push(`/strategies/${mapSlug}/create`))} style={{ background: 'transparent', border: 'none', color: mapInfo.color, marginTop: '12px', display: 'inline-block', fontFamily: 'var(--font-dm-mono)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
                Create the first →
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filtered.map(strat => (
              <div key={strat.id}
                draggable
                onDragStart={() => setDragId(strat.id)}
                onDragOver={e => { e.preventDefault(); setDragOverId(strat.id); }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={() => handleDrop(strat.id)}
                onDragEnd={() => { setDragId(null); setDragOverId(null); }}
                style={{ background: 'var(--val-surface)', border: `1px solid ${dragOverId === strat.id ? mapInfo.color : 'var(--val-border2)'}`, borderRadius: '8px', padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'grab', opacity: dragId === strat.id ? 0.5 : 1, transition: 'border-color 0.1s, opacity 0.15s' }}
                className="card-hover"
                onClick={() => { if (!dragId) router.push(`/strategies/${mapSlug}/${strat.id}`); }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: strat.side === 'attack' ? '#ff4757' : '#4ecdc4' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: strat.side === 'attack' ? '#ff4757' : '#4ecdc4', background: strat.side === 'attack' ? '#ff475720' : '#4ecdc420', padding: '3px 8px', borderRadius: '4px' }}>
                    {strat.side === 'attack' ? 'ATK' : 'DEF'}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleDuplicate(strat.id)}
                      style={{ background: 'transparent', border: '1px solid var(--val-border2)', borderRadius: '4px', color: 'var(--val-muted)', cursor: 'pointer', fontSize: '11px', padding: '2px 7px', fontFamily: 'var(--font-dm-mono)' }}
                      title="Duplicate">⎘</button>
                    <button onClick={() => gate.request(() => router.push(`/strategies/${mapSlug}/${strat.id}/edit`))}
                      style={{ background: 'transparent', border: '1px solid var(--val-border2)', borderRadius: '4px', color: 'var(--val-muted)', cursor: 'pointer', fontSize: '11px', padding: '2px 7px', fontFamily: 'var(--font-dm-mono)' }}
                      title="Edit">✏</button>
                    <button onClick={() => handleDelete(strat.id, strat.name)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--val-muted)', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}
                      title="Delete">✕</button>
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: 'var(--val-text)', marginBottom: '8px' }}>{strat.name}</div>
                {(strat.tags ?? []).length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {(strat.tags ?? []).map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '1px', color: '#e8ff47', background: '#e8ff4718', padding: '2px 7px', borderRadius: '10px', border: '1px solid #e8ff4730' }}>{tag}</span>
                    ))}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--val-muted)' }}>
                  {strat.shapes.length} element{strat.shapes.length !== 1 ? 's' : ''} · {new Date(strat.createdAt).toLocaleDateString('en-GB')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!toDelete && !gate.open}
        title="Delete this strat?"
        message={toDelete ? `"${toDelete.name}" will be permanently deleted.` : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        danger
        onConfirm={() => gate.open || gate.request(() => { if (toDelete) remove(toDelete.id); setToDelete(null); })}
        onCancel={() => setToDelete(null)}
      />
    </main>
  );
}
