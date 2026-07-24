import './site.css';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import PublicRuntime from '@/components/site/PublicRuntime';
import { getContact } from '@/lib/queries';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const contact = await getContact();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header contact={contact} />
      <main id="main">
        <span id="top" />
        {children}
      </main>
      <Footer contact={contact} />
      <PublicRuntime />
    </>
  );
}
