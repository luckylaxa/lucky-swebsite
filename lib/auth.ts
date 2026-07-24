import 'server-only';
import { auth, currentUser } from '@clerk/nextjs/server';

// Single-admin gate: a signed-in Clerk user whose primary email is in the
// ADMIN_EMAILS allowlist. No roles table, no DB round-trip.
export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const allow = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // Empty allowlist → any authenticated Clerk user is admin (fine when
  // public sign-ups are disabled in the Clerk dashboard).
  if (allow.length === 0) return true;

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  return !!email && allow.includes(email);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Error('Not authorized');
  }
}

export async function adminActor(): Promise<string> {
  const user = await currentUser();
  return user?.primaryEmailAddress?.emailAddress ?? user?.id ?? 'unknown';
}
