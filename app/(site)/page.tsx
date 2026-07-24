import type { Metadata } from 'next';
import { getHome, getContact } from '@/lib/queries';
import Html from '@/components/site/Html';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHome();
  return {
    title: seo.seo_title || 'United Architects, Inc. — Miami Architecture Since 1986',
    description:
      seo.seo_description ||
      'United Architects, Inc. is a Coral Gables architecture firm turning raw ideas into comfortable, livable, inspired buildings.',
    openGraph: seo.og_image_url ? { images: [seo.og_image_url] } : undefined,
  };
}

/* eslint-disable @next/next/no-img-element */
export default async function HomePage() {
  const [{ content: c }, contact] = await Promise.all([getHome(), getContact()]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">{c.hero.eyebrow}</p>
            <Html as="h1" html={c.hero.heading} />
            <p className="lede">{c.hero.lede}</p>
            <div className="hero-cta">
              <a className="btn btn--dark" href="#contact">{c.hero.ctaPrimary} <span className="arw" aria-hidden="true">&rarr;</span></a>
              <a className="btn btn--ghost" href="#work">{c.hero.ctaSecondary}</a>
            </div>
            <ul className="hero-meta">
              {c.hero.meta.map((m, i) => (
                <li key={i}><strong>{m.label}</strong><span>{m.sub}</span></li>
              ))}
            </ul>
          </div>
          <div className="hero-figure" data-reveal data-reveal-delay="1">
            <img src={c.hero.image} alt="Featured United Architects project" width={1040} height={1248} />
            <span className="figure-tag">Featured &middot; Residence</span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="strip" aria-label="Clients and recognition">
        <div className="wrap strip-inner" data-reveal>
          <span className="strip-label">{c.trust.label}</span>
          <ul className="strip-list">
            {c.trust.items.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="wrap">
          <div className="values-head" data-reveal>
            <p className="eyebrow eyebrow--center">Why United Architects</p>
            <h2>{c.values.heading}</h2>
            <p>{c.values.intro}</p>
          </div>
          <div className="values-grid">
            {c.values.items.map((v, i) => (
              <article className="value" data-reveal data-reveal-delay={i} key={i}>
                <span className="value-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#A45A3B" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M3 21 L12 4 L21 21" /><path d="M7 21 L12 11 L17 21" /><line x1="1" y1="21" x2="23" y2="21" /></svg>
                </span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement">
        <div className="wrap"><Html as="p" className="statement-text" html={c.statement} data-reveal /></div>
      </section>

      {/* WORK */}
      <section className="section" id="work">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="head-lead">
              <p className="eyebrow">{c.work.eyebrow}</p>
              <h2>{c.work.heading}</h2>
            </div>
            <p className="section-sub">{c.work.intro}</p>
          </div>
          <div className="work-grid">
            {c.work.projects.map((p, i) => (
              <figure className={`work-card${p.tall ? ' work-card--tall' : ''}${p.wide ? ' work-card--wide' : ''}`} data-reveal data-reveal-delay={i % 3} key={i}>
                <div className="frame"><img src={p.image} alt={p.title} /></div>
                <figcaption>
                  <div className="cap-main">
                    <span className="work-type">{p.type}</span>
                    <h3>{p.title}</h3>
                    <p>{p.location}</p>
                  </div>
                  <span className="work-year">{p.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--paper" id="services">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="head-lead">
              <p className="eyebrow">{c.services.eyebrow}</p>
              <h2>{c.services.heading}</h2>
            </div>
            <p className="section-sub">{c.services.intro}</p>
          </div>
          <ul className="services">
            {c.services.items.map((s, i) => (
              <li className="service" data-reveal data-reveal-delay={i % 3} key={i}>
                <span className="service-no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* METHOD */}
      <section className="section" id="method">
        <div className="wrap method-grid">
          <div className="method-copy" data-reveal>
            <p className="eyebrow">{c.method.eyebrow}</p>
            <h2>{c.method.heading}</h2>
            <p className="section-sub">{c.method.intro}</p>
            <a className="btn btn--ghost" href="#contact">Talk through your project <span className="arw" aria-hidden="true">&rarr;</span></a>
          </div>
          <ul className="checklist" data-reveal data-reveal-delay="1">
            {c.method.checklist.map((m, i) => (
              <li key={i}><h3>{m.title}</h3><p>{m.body}</p></li>
            ))}
            <li><p className="more">{c.method.more}</p></li>
          </ul>
        </div>
      </section>

      {/* FIRM */}
      <section className="section section--dark" id="firm">
        <div className="wrap firm-grid">
          <div className="firm-figure" data-reveal>
            <img src={c.firm.portrait} alt="Principal architect Maria Luisa Castellanos" width={760} height={920} />
          </div>
          <div className="firm-copy" data-reveal data-reveal-delay="1">
            <p className="eyebrow eyebrow--light">{c.firm.eyebrow}</p>
            <h2>{c.firm.heading}</h2>
            {c.firm.paragraphs.map((p, i) => <Html as="p" html={p} key={i} />)}
            <ul className="stats">
              {c.firm.stats.map((s, i) => (
                <li key={i}><strong>{s.value}</strong><span>{s.label}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="wrap contact-card" data-reveal>
          <div className="contact-lead">
            <p className="eyebrow">{c.contact.eyebrow}</p>
            <h2>{c.contact.heading}</h2>
            <p className="section-sub">{c.contact.intro}</p>
          </div>
          <div className="contact-details">
            <div className="contact-item"><span>Studio</span><p><Html html={contact.address} /></p></div>
            <div className="contact-item"><span>Speak with us</span><p><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a><br /><a href={`mailto:${contact.email}`}>{contact.email}</a></p></div>
            <div className="contact-item"><span>Hours</span><p><Html html={contact.hours} /></p></div>
            <a className="btn btn--dark btn--block" href={`mailto:${contact.email}`}>Email the studio <span className="arw" aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
