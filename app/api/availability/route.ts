import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getTeamFromCookie } from '../_auth';

export async function GET() {
  const team = getTeamFromCookie();
  if (!team) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getSupabaseServer();
  const { data } = await db.from('availability').select('*').eq('team_slug', team.slug);
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const team = getTeamFromCookie();
  if (!team) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getSupabaseServer();
  const { playerName, slots } = await req.json();
  await db.from('availability').upsert(
    { team_slug: team.slug, player_name: playerName, slots, updated_at: new Date().toISOString() },
    { onConflict: 'team_slug,player_name' }
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const team = getTeamFromCookie();
  if (!team) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getSupabaseServer();
  const { playerName } = await req.json();
  await db.from('availability').delete().eq('team_slug', team.slug).eq('player_name', playerName);
  return NextResponse.json({ ok: true });
}
