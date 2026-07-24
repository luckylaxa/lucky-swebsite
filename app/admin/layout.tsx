import './admin.css';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import { isAdmin } from '@/lib/auth';
import AdminNav from '@/components/admin/AdminNav';

export const metadata = { title: 'CMS — United Architects' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Middleware guarantees a signed-in user here; this enforces the allowlist.
  if (!(await isAdmin())) {
    return (
      <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', fontFamily: 'system-ui', background: '#F7F5F0', padding: 24, textAlign: 'center' }}>
        <div>
          <h1 style={{ marginBottom: 8 }}>Not authorized</h1>
          <p style={{ color: '#6F6A62', marginBottom: 16 }}>This account isn’t on the admin allowlist.</p>
          <SignOutButton>
            <button className="btn btn-ghost">Sign out</button>
          </SignOutButton>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-light.svg" alt="United Architects" />
        </div>
        <AdminNav />
        <div className="admin-side-foot">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <UserButton afterSignOutUrl="/sign-in" />
            <span>Signed in</span>
          </div>
          <Link href="/" target="_blank">View live site ↗</Link>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
