import { useState, useEffect, useCallback } from 'react';
import type { MatchNote } from '@/lib/types';

type MatchCreate = { mapSlug: string; mapName: string; date: string; opponent: string; atkScore: number; defScore: number; oppScore: number; notes: string };

function toNote(row: Record<string, unknown>): MatchNote {
  return {
    id: row.id as string,
    mapSlug: row.map_slug as string,
    mapName: row.map_name as string,
    date: row.date as string,
    opponent: row.opponent as string,
    atkScore: row.atk_score as number,
    defScore: row.def_score as number,
    oppScore: row.opp_score as number,
    notes: row.notes as string,
    createdAt: row.created_at as string,
  };
}

export function useMatchNotes(mapSlug?: string, teamSlug?: string) {
  const [notes, setNotes] = useState<MatchNote[]>([]);

  const fetchAll = useCallback(async () => {
    if (!teamSlug) return;
    const params = new URLSearchParams();
    if (mapSlug) params.set('map', mapSlug);
    const res = await fetch(`/api/match-notes?${params}`);
    const data = await res.json();
    setNotes((data ?? []).map(toNote));
  }, [mapSlug, teamSlug]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function add(data: MatchCreate) {
    const res = await fetch('/api/match-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        map_slug: data.mapSlug, map_name: data.mapName,
        date: data.date, opponent: data.opponent,
        atk_score: data.atkScore, def_score: data.defScore,
        opp_score: data.oppScore, notes: data.notes,
      }),
    });
    const row = await res.json();
    if (row) setNotes(prev => [toNote(row), ...prev]);
  }

  async function remove(id: string) {
    await fetch(`/api/match-notes/${id}`, { method: 'DELETE' });
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  async function update(id: string, data: Partial<MatchNote>) {
    const body: Record<string, unknown> = {};
    if (data.date !== undefined)     body.date      = data.date;
    if (data.opponent !== undefined) body.opponent  = data.opponent;
    if (data.atkScore !== undefined) body.atk_score = data.atkScore;
    if (data.defScore !== undefined) body.def_score = data.defScore;
    if (data.oppScore !== undefined) body.opp_score = data.oppScore;
    if (data.notes !== undefined)    body.notes     = data.notes;
    await fetch(`/api/match-notes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...data } : n));
  }

  return { notes, add, remove, update };
}
