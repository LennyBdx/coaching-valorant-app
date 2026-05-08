import { useState, useEffect } from 'react';

interface HasId { id: string; mapSlug: string; }

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function persist<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useStoredList<T extends HasId, TCreate>(key: string, mapSlug?: string) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const all = load<T>(key);
    setItems(mapSlug ? all.filter(i => i.mapSlug === mapSlug) : all);
  }, [key, mapSlug]);

  function sync(all: T[]) {
    setItems(mapSlug ? all.filter(i => i.mapSlug === mapSlug) : all);
  }

  function add(data: TCreate): T {
    const all = load<T>(key);
    const item = { ...(data as object), id: crypto.randomUUID(), createdAt: new Date().toISOString() } as unknown as T;
    const updated = [...all, item];
    persist(key, updated);
    sync(updated);
    return item;
  }

  function remove(id: string) {
    const updated = load<T>(key).filter(i => i.id !== id);
    persist(key, updated);
    sync(updated);
  }

  function update(id: string, data: Partial<T>) {
    const all = load<T>(key).map(i => i.id === id ? { ...i, ...data } : i);
    persist(key, all);
    sync(all);
  }

  function getById(id: string): T | undefined {
    return load<T>(key).find(i => i.id === id);
  }

  function reorder(fromId: string, toId: string) {
    const all = load<T>(key);
    const scoped = mapSlug ? all.filter(i => i.mapSlug === mapSlug) : [...all];
    const fromIdx = scoped.findIndex(i => i.id === fromId);
    const toIdx = scoped.findIndex(i => i.id === toId);
    if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;
    const reordered = [...scoped];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    if (!mapSlug) {
      persist(key, reordered);
      sync(reordered);
      return;
    }
    let idx = 0;
    const updated = all.map(i => i.mapSlug === mapSlug ? reordered[idx++] : i);
    persist(key, updated);
    sync(updated);
  }

  return { items, add, remove, update, getById, reorder };
}
