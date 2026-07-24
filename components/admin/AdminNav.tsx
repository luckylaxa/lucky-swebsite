'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/pages/home', label: 'Home page' },
  { href: '/admin/journal', label: 'Journal' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="admin-nav">
      {LINKS.map((l) => {
        const active = l.exact ? path === l.href : path.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={active ? 'active' : ''}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
