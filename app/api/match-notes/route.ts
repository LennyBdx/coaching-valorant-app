import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getTeamFromCookie } from '../_auth';

export async function GET(req: NextRequest) {
  const team = getTeamFromCookie();
  if (!team) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getSupabaseServer();
  const mapSlug = req.nextUrl.searchParams.get('map');
  let q = db.from('match_notes').select('*').eq('team_slug', team.slug).order('created_at', { ascending: false });
  if (mapSlug) q = q.eq('map_slug', mapSlug);
  const { data } = await q;
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const team = getTeamFromCookie();
  if (!team) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getSupabaseServer();
  const body = await req.json();
  const { data } = await db
    .from('match_notes')
    .insert({ ...body, team_slug: team.slug })
    .select()
    .single();
  return NextResponse.json(data);
}
