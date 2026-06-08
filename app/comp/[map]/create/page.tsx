'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getMapBySlug } from '@/lib/data/maps';
import { useCompos } from '@/lib/hooks/useCompos';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { useCodeGate } from '@/lib/hooks/useCodeGate';
import CodeModal from '@/components/ui/CodeModal';
import type { CompoAgent } from '@/lib/types';

const CompoEditor = dynamic(() => import('@/components/comp/CompoEditor'), { ssr: false });

export default function CreateCompoPage() {
  const { map: mapSlug } = useParams<{ map: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { add } = useCompos(mapSlug, team ?? undefined);
  const gate = useCodeGate();

  useEffect(() => {
    if (team === '') router.push('/comp');
  }, [team, router]);

  if (team === null || team === '') return null;
  if (!mapInfo) return <main style={{ padding: '60px', color: '#e2e4ea', fontFamily: 'var(--font-dm-mono)' }}>Map not found.</main>;

  function handleSave(name: string, agents: CompoAgent[]) {
    gate.request(() => {
      add({ mapSlug: mapInfo!.slug, mapName: mapInfo!.name, name, agents });
      router.push(`/comp/${mapSlug}`);
    });
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 40px 60px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={gate.cancel} />
      <div style={{ marginBottom: '24px' }}>
        <Link href={`/comp/${mapSlug}`} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#5a5f72', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← {mapInfo.name.toUpperCase()}
        </Link>
      </div>
      <CompoEditor onSave={handleSave} />
    </main>
  );
}
