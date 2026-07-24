import type { ContactSettings } from '@/lib/types';
import Html from './Html';

export default function Footer({ contact }: { contact: ContactSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-light.svg" alt="United Architects" width={210} height={34} />
          <p>Comfortable, livable, inspired buildings and residences — designed in Coral Gables since 1986.</p>
        </div>
        <div className="footer-col">
          <h4>Practice</h4>
          <ul>
            <li><a href="/#work">Selected work</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#method">Our method</a></li>
            <li><a href="/#firm">The firm</a></li>
            <li><a href="/journal">Journal</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Expertise</h4>
          <ul>
            <li>Residential</li>
            <li>Educational</li>
            <li>Commercial</li>
            <li>Remodeling &amp; Additions</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <ul>
            <li><Html as="span" html={contact.address} /></li>
            <li><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {year} United Architects, Inc. All rights reserved.</p>
        <p>R.A. &middot; LEED AP &middot; Coral Gables, Florida</p>
      </div>
    </footer>
  );
}
