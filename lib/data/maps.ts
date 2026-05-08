export interface ValorantMap {
  name: string;
  slug: string;
  color: string;
  displayIcon: string;
}

export const MAPS: ValorantMap[] = [
  { name: 'Ascent',   slug: 'ascent',   color: '#e8ff47', displayIcon: 'https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/displayicon.png' },
  { name: 'Haven',    slug: 'haven',    color: '#4ecdc4', displayIcon: 'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/displayicon.png' },
  { name: 'Split',    slug: 'split',    color: '#ff9f43', displayIcon: 'https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/displayicon.png' },
  { name: 'Breeze',   slug: 'breeze',   color: '#00b894', displayIcon: 'https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/displayicon.png' },
  { name: 'Fracture', slug: 'fracture', color: '#fd79a8', displayIcon: 'https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/displayicon.png' },
  { name: 'Pearl',    slug: 'pearl',    color: '#6c5ce7', displayIcon: 'https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/displayicon.png' },
  { name: 'Lotus',    slug: 'lotus',    color: '#55efc4', displayIcon: 'https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/displayicon.png' },
];

export function getMapBySlug(slug: string): ValorantMap | undefined {
  return MAPS.find(m => m.slug === slug);
}
