import { cookies } from 'next/headers';

export function getTeamFromCookie(): { slug: string } | null {
  const val = cookies().get('team_auth')?.value;
  if (!val) return null;
  const [slug, code] = val.split(':');
  if (!slug || !code) return null;
  const correct = process.env[`CODE_${slug.toUpperCase()}`];
  if (!correct || code !== correct) return null;
  return { slug };
}
