'use server';

import { cookies } from 'next/headers';

export async function verifyTeamCode(team: string, code: string): Promise<boolean> {
  const correct = process.env[`CODE_${team}`];
  if (!correct) return false;
  const valid = code.trim() === correct.trim();
  if (valid) {
    cookies().set('team_auth', `${team.toLowerCase()}:${code.trim()}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  }
  return valid;
}
