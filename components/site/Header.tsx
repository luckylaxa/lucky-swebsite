import type { ContactSettings } from '@/lib/types';

export default function Header({ contact }: { contact: ContactSettings }) {
  return (
    <header className="site-header" id="siteHeader">
      <div className="wrap header-inner">
        <a className="brand" href="/#top" aria-label="United Architects, Inc. home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.svg" alt="United Architects" width={208} height={34} />
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="/#work">Work</a>
          <a href="/#services">Services</a>
          <a href="/#method">Method</a>
          <a href="/#firm">Firm</a>
          <a href="/journal">Journal</a>
        </nav>
        <div className="header-actions">
          <a className="phone" href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          <a className="btn btn--dark" href="/#contact">
            Start a project <span className="arw" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </header>
  );
}
