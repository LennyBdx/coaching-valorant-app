import { useState, useEffect } from 'react';
import { SESSION_KEY } from '@/lib/data/teams';

/** Returns null while loading, '' if no team, or 'roz' if unlocked. */
export function useActiveTeam(): string | null {
  const [team, setTeam] = useState<string | null>(null);
  useEffect(() => {
    setTeam(sessionStorage.getItem(SESSION_KEY) ?? '');
  }, []);
  return team;
}
