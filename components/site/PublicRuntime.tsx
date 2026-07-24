'use client';

import { useEffect } from 'react';

// Ports the original main.js behaviour: IntersectionObserver scroll reveals
// and the sticky-header state, honoring prefers-reduced-motion.
export default function PublicRuntime() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduce || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const obs = new IntersectionObserver(
        (entries, o) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
            el.style.transitionDelay = `${delay * 100}ms`;
            el.classList.add('is-visible');
            o.unobserve(el);
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
      );
      revealEls.forEach((el) => obs.observe(el));
    }

    const header = document.getElementById('siteHeader');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header?.classList.toggle('is-stuck', window.scrollY > 12);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
