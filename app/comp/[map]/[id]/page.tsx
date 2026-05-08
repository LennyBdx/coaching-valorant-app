'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCompos } from '@/lib/hooks/useCompos';
import { useActiveTeam } from '@/lib/hooks/useActiveTeam';
import { getMapBySlug } from '@/lib/data/maps';
import { ROLE_COLORS, type AgentRole } from '@/lib/data/agents';
import type { MapCompo } from '@/lib/types';
import Modal from '@/components/ui/Modal';

export default function ViewCompoPage() {
  const { map: mapSlug, id } = useParams<{ map: string; id: string }>();
  const router = useRouter();
  const team = useActiveTeam();
  const mapInfo = getMapBySlug(mapSlug);
  const { getById, remove, loading } = useCompos(mapSlug, team ?? undefined);
  const [compo, setCompo] = useState<MapCompo | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (team === null || loading) return;
    const found = getById(id);
    if (!found) { router.replace(`/comp/${mapSlug}`); return; }
    setCompo(found);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, team, loading]);

  if (!mapInfo || !compo) return null;

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 40px 60px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
        <Link href={`/comp/${mapSlug}`} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#5a5f72', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← {mapInfo.name.toUpperCase()}
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <Link href={`/comp/${mapSlug}/${id}/edit`}>
            <button style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #1e2128', borderRadius: '6px', color: '#5a5f72', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer' }}>
              Modifier
            </button>
          </Link>
          <button onClick={() => setDeleteOpen(true)} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #ff475740', borderRadius: '6px', color: '#ff4757', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer' }}>
            Supprimer
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '36px', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1px', color: '#e2e4ea', margin: 0 }}>
          {compo.name}
        </h1>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#5a5f72' }}>
          {new Date(compo.createdAt).toLocaleDateString('fr-FR')}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {compo.agents.map((agent, i) => {
          const rc = ROLE_COLORS[agent.agentRole as AgentRole] ?? '#5a5f72';
          return (
            <div key={agent.agentName} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#111318', border: `1px solid ${rc}30`, borderLeft: `3px solid ${rc}`, borderRadius: '8px', padding: '14px 20px' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: '#2a2d38', width: '16px', textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', background: rc, flexShrink: 0 }}>
                <img src={agent.agentIcon} alt={agent.agentName} width={40} height={40} style={{ display: 'block', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: '16px', fontWeight: 800, color: '#e2e4ea' }}>{agent.agentName}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '2px', color: rc, textTransform: 'uppercase' }}>{agent.agentRole}</div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={deleteOpen}
        title="Supprimer la compo ?"
        message={`"${compo.name}" sera définitivement supprimée.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        danger
        onConfirm={() => { remove(id); router.push(`/comp/${mapSlug}`); }}
        onCancel={() => setDeleteOpen(false)}
      />
    </main>
  );
}
