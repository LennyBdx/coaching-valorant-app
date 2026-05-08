import { useState, useEffect, useCallback } from 'react';
import type { MapStrategy, StratShape } from '@/lib/types';

type StratCreate = { mapSlug: string; mapName: string; name: string; side: 'attack' | 'defense'; shapes: StratShape[]; tags: string[] };

function toStrategy(row: Record<string, unknown>): MapStrategy {
  return {
    id: row.id as string,
    mapSlug: row.map_slug as string,
    mapName: row.map_name as string,
    name: row.name as string,
    side: row.side as 'attack' | 'defense',
    shapes: row.shapes as StratShape[],
    tags: row.tags as string[],
    createdAt: row.created_at as string,
  };
}

export function useStrategies(mapSlug?: string, teamSlug?: string) {
  const [strategies, setStrategies] = useState<MapStrategy[]>([]);
  // Track which teamSlug was last fetched — loading is true whenever it doesn't match current
  const [fetchedForTeam, setFetchedForTeam] = useState<string | undefined>(undefined);
  const loading = fetchedForTeam !== teamSlug;

  const fetchAll = useCallback(async () => {
    if (!teamSlug) { setFetchedForTeam(undefined); return; }
    const params = new URLSearchParams();
    if (mapSlug) params.set('map', mapSlug);
    const res = await fetch(`/api/strategies?${params}`);
    const data = await res.json();
    setStrategies((data ?? []).map(toStrategy));
    setFetchedForTeam(teamSlug);
  }, [mapSlug, teamSlug]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function add(data: StratCreate) {
    const res = await fetch('/api/strategies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        map_slug: data.mapSlug, map_name: data.mapName,
        name: data.name, side: data.side, shapes: data.shapes,
        tags: data.tags, sort_order: strategies.length,
      }),
    });
    const row = await res.json();
    if (row) setStrategies(prev => [...prev, toStrategy(row)]);
  }

  async function remove(id: string) {
    await fetch(`/api/strategies/${id}`, { method: 'DELETE' });
    setStrategies(prev => prev.filter(s => s.id !== id));
  }

  async function update(id: string, data: Partial<MapStrategy>) {
    const updates: Record<string, unknown> = {};
    if (data.name   !== undefined) updates.name   = data.name;
    if (data.side   !== undefined) updates.side   = data.side;
    if (data.shapes !== undefined) updates.shapes = data.shapes;
    if (data.tags   !== undefined) updates.tags   = data.tags;
    await fetch(`/api/strategies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    setStrategies(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  }

  function getById(id: string) {
    return strategies.find(s => s.id === id);
  }

  async function reorder(fromId: string, toId: string) {
    const fromIdx = strategies.findIndex(s => s.id === fromId);
    const toIdx   = strategies.findIndex(s => s.id === toId);
    if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;
    const reordered = [...strategies];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setStrategies(reordered);
    await Promise.all(reordered.map((s, i) =>
      fetch(`/api/strategies/${s.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: i }),
      })
    ));
  }

  return { strategies, loading, add, remove, update, getById, reorder };
}
