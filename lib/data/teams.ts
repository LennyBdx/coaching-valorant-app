export const TEAMS = [
  { name: 'ROZ', slug: 'roz', accent: '#a29bfe' },
] as const;

export type TeamSlug = typeof TEAMS[number]['slug'];

export const SESSION_KEY = 'active_team';
