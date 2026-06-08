'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStrategies } from '@/lib/hooks/useStrategies';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { getMapBySlug } from '@/lib/data/maps';
import type { MapStrategy } from '@/lib/types';
import CodeModal from '@/components/ui/CodeModal';
import { useCodeGate } from '@/lib/hooks/useCodeGate';

const MapViewer = dynamic(() => import('@/components/strategy/MapViewer'), { ssr: false });

export default function ViewStrategyPage() {
  const { map: mapSlug, id } = useParams<{ map: string; id: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { getById, remove, loading } = useStrategies(mapSlug, team ?? undefined);
  const [strat, setStrat] = useState<MapStrategy | null>(null);
  const gate = useCodeGate();

  useEffect(() => {
    if (team === null || loading) return;
    const found = getById(id);
    if (!found) { router.replace(`/strategies/${mapSlug}`); return; }
    setStrat(found);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, team, loading]);

  if (!mapInfo || !strat) return null;

  const sideColor = strat.side === 'attack' ? '#ff4757' : '#4ecdc4';

  const agentNames = Array.from(new Set(
    strat.shapes
      .filter(s => s.type === 'agent' || s.type === 'ability')
      .map(s => (s as { agentName: string }).agentName)
  ));

  return (
    <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px 40px 60px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={gate.cancel} />

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href={`/strategies/${mapSlug}`} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#5a5f72', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← {mapInfo.name.toUpperCase()}
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button onClick={() => gate.request(() => router.push(`/strategies/${mapSlug}/${id}/edit`))} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #1e2128', borderRadius: '6px', color: '#5a5f72', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer' }}>
            Modifier
          </button>
          <button onClick={() => gate.request(() => { remove(id); router.push(`/strategies/${mapSlug}`); })} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #ff475740', borderRadius: '6px', color: '#ff4757', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer' }}>
            Supprimer
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', color: '#e2e4ea', margin: 0 }}>
          {strat.name}
        </h1>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: sideColor, background: sideColor + '20', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
          {strat.side === 'attack' ? 'ATK' : 'DEF'}
        </span>
        {agentNames.map(name => (
          <span key={name} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#8a90a2', background: '#1e2128', padding: '3px 8px', borderRadius: '4px' }}>
            {name}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#5a5f72' }}>
          {new Date(strat.createdAt).toLocaleDateString('fr-FR')}
        </span>
      </div>

      {(strat.tags ?? []).length > 0 && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {(strat.tags ?? []).map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '1px', color: '#e8ff47', background: '#e8ff4718', padding: '3px 10px', borderRadius: '12px', border: '1px solid #e8ff4730' }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <MapViewer mapImageUrl={mapInfo.displayIcon} shapes={strat.shapes} showExport />

    </main>
  );
}
