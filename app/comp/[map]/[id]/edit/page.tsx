'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMapBySlug } from '@/lib/data/maps';
import { useCompos } from '@/lib/hooks/useCompos';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { useCodeGate } from '@/lib/hooks/useCodeGate';
import CodeModal from '@/components/ui/CodeModal';
import type { MapCompo, CompoAgent } from '@/lib/types';

const CompoEditor = dynamic(() => import('@/components/comp/CompoEditor'), { ssr: false });

export default function EditCompoPage() {
  const { map: mapSlug, id } = useParams<{ map: string; id: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { getById, update, loading } = useCompos(mapSlug, team ?? undefined);
  const gate = useCodeGate();
  const [compo, setCompo] = useState<MapCompo | null>(null);

  useEffect(() => {
    if (team === '') { router.push('/comp'); return; }
    if (team === null || loading) return;
    const found = getById(id);
    if (!found) { router.replace(`/comp/${mapSlug}`); return; }
    setCompo(found);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, team, loading]);

  if (team === null || team === '' || !mapInfo || !compo) return null;

  function handleSave(name: string, agents: CompoAgent[]) {
    gate.request(() => {
      update(id, { name, agents });
      router.push(`/comp/${mapSlug}/${id}`);
    });
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 40px 60px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={gate.cancel} />
      <div style={{ marginBottom: '24px' }}>
        <Link href={`/comp/${mapSlug}/${id}`} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#5a5f72', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← {compo.name}
        </Link>
      </div>
      <CompoEditor initialName={compo.name} initialAgents={compo.agents} onSave={handleSave} />
    </main>
  );
}
