import ContactForm from '@/components/admin/ContactForm';
import { getContact } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const contact = await getContact();
  return (
    <>
      <div className="admin-head">
        <div>
          <p className="eyebrow-sm">Settings</p>
          <h1>Site settings</h1>
          <p>Studio contact details shown across the site.</p>
        </div>
      </div>
      <ContactForm initial={contact} />
    </>
  );
}
