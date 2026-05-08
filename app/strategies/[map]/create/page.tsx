'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getMapBySlug } from '@/lib/data/maps';
import { useStrategies } from '@/lib/hooks/useStrategies';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { useCodeGate } from '@/lib/hooks/useCodeGate';
import CodeModal from '@/components/ui/CodeModal';
import type { StratShape } from '@/lib/types';

const MapEditor = dynamic(() => import('@/components/strategy/MapEditor'), { ssr: false });

export default function CreateStrategyPage() {
  const { map: mapSlug } = useParams<{ map: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { add } = useStrategies(mapSlug, team ?? undefined);
  const gate = useCodeGate();

  useEffect(() => {
    if (team === '') router.push('/strategies');
  }, [team, router]);

  if (team === null || team === '') return null;
  if (!mapInfo) return <main style={{ padding: '60px', color: '#e2e4ea', fontFamily: 'var(--font-dm-mono)' }}>Map introuvable.</main>;

  function handleSave(name: string, side: 'attack' | 'defense', shapes: StratShape[], tags: string[]) {
    gate.request(() => {
      add({ mapSlug: mapInfo!.slug, mapName: mapInfo!.name, name, side, shapes, tags });
      router.push(`/strategies/${mapSlug}`);
    });
  }

  return (
    <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px 40px 60px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={gate.cancel} />
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/strategies/${mapSlug}`} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#5a5f72', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← {mapInfo.name.toUpperCase()}
        </Link>
      </div>
      <MapEditor mapImageUrl={mapInfo.displayIcon} onSave={handleSave} />
    </main>
  );
}
