"use server";

export async function validateAdminCode(code: string): Promise<boolean> {
  const correct = process.env.ADMIN_CODE;
  if (!correct) return false;
  return code.trim() === correct.trim();
}
