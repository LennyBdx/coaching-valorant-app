import { useState, useEffect, useCallback } from 'react';
import type { MapCompo, CompoAgent } from '@/lib/types';

type CompoCreate = { mapSlug: string; mapName: string; name: string; agents: CompoAgent[] };

function toCompo(row: Record<string, unknown>): MapCompo {
  return {
    id: row.id as string,
    mapSlug: row.map_slug as string,
    mapName: row.map_name as string,
    name: row.name as string,
    agents: row.agents as CompoAgent[],
    createdAt: row.created_at as string,
  };
}

export function useCompos(mapSlug?: string, teamSlug?: string) {
  const [compos, setCompos] = useState<MapCompo[]>([]);
  // Track which teamSlug was last fetched — loading is true whenever it doesn't match current
  const [fetchedForTeam, setFetchedForTeam] = useState<string | undefined>(undefined);
  const loading = fetchedForTeam !== teamSlug;

  const fetchAll = useCallback(async () => {
    if (!teamSlug) { setFetchedForTeam(undefined); return; }
    const params = new URLSearchParams();
    if (mapSlug) params.set('map', mapSlug);
    const res = await fetch(`/api/compos?${params}`);
    const data = await res.json();
    setCompos((data ?? []).map(toCompo));
    setFetchedForTeam(teamSlug);
  }, [mapSlug, teamSlug]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function add(data: CompoCreate) {
    const res = await fetch('/api/compos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        map_slug: data.mapSlug, map_name: data.mapName,
        name: data.name, agents: data.agents,
      }),
    });
    const row = await res.json();
    if (row) setCompos(prev => [...prev, toCompo(row)]);
  }

  async function remove(id: string) {
    await fetch(`/api/compos/${id}`, { method: 'DELETE' });
    setCompos(prev => prev.filter(c => c.id !== id));
  }

  async function update(id: string, data: Partial<MapCompo>) {
    const updates: Record<string, unknown> = {};
    if (data.name   !== undefined) updates.name   = data.name;
    if (data.agents !== undefined) updates.agents = data.agents;
    await fetch(`/api/compos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    setCompos(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  }

  function getById(id: string) {
    return compos.find(c => c.id === id);
  }

  return { compos, loading, add, remove, update, getById };
}
