import Link from 'next/link';

export default function AdminHome() {
  return (
    <>
      <div className="admin-head">
        <div>
          <p className="eyebrow-sm">Content management</p>
          <h1>Welcome back</h1>
          <p>Update your site’s copy, images, journal, and SEO — changes go live within seconds.</p>
        </div>
      </div>

      <div className="tiles">
        <Link className="tile" href="/admin/pages/home">
          <h3>Edit the home page →</h3>
          <p>Hero, work, services, method, firm — copy and images.</p>
        </Link>
        <Link className="tile" href="/admin/journal">
          <h3>Journal →</h3>
          <p>Write posts, save drafts, and publish when ready.</p>
        </Link>
        <Link className="tile" href="/admin/media">
          <h3>Media library →</h3>
          <p>Every uploaded image in one place.</p>
        </Link>
        <Link className="tile" href="/admin/settings">
          <h3>Settings →</h3>
          <p>Studio address, phone, email, and hours.</p>
        </Link>
      </div>
    </>
  );
}
