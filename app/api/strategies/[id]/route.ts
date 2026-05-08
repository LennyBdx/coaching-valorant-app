import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getTeamFromCookie } from '../../_auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const team = getTeamFromCookie();
  if (!team) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getSupabaseServer();
  const body = await req.json();
  await db.from('strategies').update(body).eq('id', params.id).eq('team_slug', team.slug);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const team = getTeamFromCookie();
  if (!team) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getSupabaseServer();
  await db.from('strategies').delete().eq('id', params.id).eq('team_slug', team.slug);
  return NextResponse.json({ ok: true });
}
