'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCompos } from '@/lib/hooks/useCompos';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { getMapBySlug } from '@/lib/data/maps';
import { ROLE_COLORS, type AgentRole } from '@/lib/data/agents';
import { MapSectionHeader } from '@/components/layout/MapSectionHeader';
import CodeModal from '@/components/ui/CodeModal';
import { useCodeGate } from '@/lib/hooks/useCodeGate';

export default function MapComposPage() {
  const { map: mapSlug } = useParams<{ map: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { compos, remove } = useCompos(mapSlug, team ?? undefined);
  const gate = useCodeGate();
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (team === '') router.push('/comp');
  }, [team, router]);

  if (team === null || team === '') return null;
  if (!mapInfo) return <main style={{ padding: '60px', color: 'var(--val-text)', fontFamily: 'var(--font-dm-mono)' }}>Map not found.</main>;

  function handleDelete(id: string, name: string) {
    setPendingDelete({ id, name });
    gate.request(() => { remove(id); setPendingDelete(null); });
  }

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
      <CodeModal isOpen={gate.open} error={gate.error} loading={gate.loading} onConfirm={gate.confirm} onCancel={() => { gate.cancel(); setPendingDelete(null); }} />

      <MapSectionHeader
        mapInfo={mapInfo}
        backHref="/comp"
        title="COMPOS"
        createHref={`/comp/${mapSlug}/create`}
        createLabel="+ New compo"
        onCreateClick={() => gate.request(() => router.push(`/comp/${mapSlug}/create`))}
      />

      <div style={{ paddingTop: '40px' }}>
        {compos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '13px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>👥</div>
            No compos for {mapInfo.name} yet.
            <br />
            <button onClick={() => gate.request(() => router.push(`/comp/${mapSlug}/create`))} style={{ background: 'transparent', border: 'none', color: mapInfo.color, marginTop: '12px', display: 'inline-block', fontFamily: 'var(--font-dm-mono)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
              Create the first →
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {compos.map(compo => (
              <div key={compo.id}
                style={{ background: 'var(--val-surface)', border: '1px solid var(--val-border2)', borderRadius: '8px', padding: '20px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                className="card-hover"
                onClick={() => router.push(`/comp/${mapSlug}/${compo.id}`)}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: mapInfo.color }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontSize: '17px', fontWeight: 800, color: 'var(--val-text)' }}>{compo.name}</div>
                  <div style={{ display: 'flex', gap: '4px' }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => gate.request(() => router.push(`/comp/${mapSlug}/${compo.id}/edit`))}
                      style={{ background: 'transparent', border: '1px solid var(--val-border2)', borderRadius: '4px', color: 'var(--val-muted)', cursor: 'pointer', fontSize: '11px', padding: '2px 8px', fontFamily: 'var(--font-dm-mono)' }}>✏</button>
                    <button onClick={() => handleDelete(compo.id, compo.name)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--val-muted)', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}>✕</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {compo.agents.map(a => {
                    const rc = ROLE_COLORS[a.agentRole as AgentRole] ?? 'var(--val-muted)';
                    return (
                      <div key={a.agentName} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: rc + '15', border: `1px solid ${rc}30`, borderRadius: '20px', padding: '3px 8px 3px 4px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', overflow: 'hidden', background: rc, flexShrink: 0 }}>
                          <img src={a.agentIcon} alt={a.agentName} width={20} height={20} style={{ display: 'block', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--val-text)' }}>{a.agentName}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--val-muted)', marginTop: '12px' }}>
                  {compo.agents.length} agent{compo.agents.length !== 1 ? 's' : ''} · {new Date(compo.createdAt).toLocaleDateString('en-GB')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
