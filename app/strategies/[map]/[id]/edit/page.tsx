'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMapBySlug } from '@/lib/data/maps';
import { useStrategies } from '@/lib/hooks/useStrategies';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { useCodeGate } from '@/lib/hooks/useCodeGate';
import CodeModal from '@/components/ui/CodeModal';
import type { MapStrategy, StratShape } from '@/lib/types';

const MapEditor = dynamic(() => import('@/components/strategy/MapEditor'), { ssr: false });

export default function EditStrategyPage() {
  const { map: mapSlug, id } = useParams<{ map: string; id: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { getById, update, loading } = useStrategies(mapSlug, team ?? undefined);
  const gate = useCodeGate();
  const [strat, setStrat] = useState<MapStrategy | null>(null);

  useEffect(() => {
    if (team === '') { router.push('/strategies'); return; }
    if (team === null || loading) return;
    const found = getById(id);
    if (!found) { router.replace(`/strategies/${mapSlug}`); return; }
    setStrat(found);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, team, loading]);

  if (team === null || team === '' || !mapInfo || !strat) return null;

  function handleSave(name: string, side: 'attack' | 'defense', shapes: StratShape[], tags: string[]) {
    gate.request(() => {
      update(id, { name, side, shapes, tags });
      router.push(`/strategies/${mapSlug}/${id}`);
    });
  }

  return (
    <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px 40px 60px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={gate.cancel} />
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/strategies/${mapSlug}/${id}`} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#5a5f72', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← {strat.name}
        </Link>
      </div>
      <MapEditor
        mapImageUrl={mapInfo.displayIcon}
        initialName={strat.name}
        initialSide={strat.side}
        initialShapes={strat.shapes}
        initialTags={strat.tags ?? []}
        onSave={handleSave}
      />
    </main>
  );
}
