import { useState, useEffect, useCallback } from 'react';

export const DAYS  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const HOURS = Array.from({ length: 11 }, (_, i) => i + 13);

export type WeekSlots       = Record<string, number[]>;
export type AllAvailability = Record<string, WeekSlots>;

export function useAvailability(teamSlug?: string) {
  const [all, setAll] = useState<AllAvailability>({});

  const fetchAll = useCallback(async () => {
    if (!teamSlug) return;
    const res = await fetch('/api/availability');
    const data = await res.json();
    const result: AllAvailability = {};
    for (const row of data ?? []) result[row.player_name] = row.slots;
    setAll(result);
  }, [teamSlug]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function setPlayerSlots(playerName: string, slots: WeekSlots) {
    await fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName, slots }),
    });
    setAll(prev => ({ ...prev, [playerName]: slots }));
  }

  async function removePlayer(playerName: string) {
    await fetch('/api/availability', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName }),
    });
    setAll(prev => { const next = { ...prev }; delete next[playerName]; return next; });
  }

  function getAvailableAt(day: string, hour: number): string[] {
    return Object.entries(all)
      .filter(([, slots]) => (slots[day] ?? []).includes(hour))
      .map(([name]) => name);
  }

  return { all, players: Object.keys(all), setPlayerSlots, removePlayer, getAvailableAt };
}
