/* United Architects — subtle interactions
   Scroll reveals + sticky-header state. Respects prefers-reduced-motion. */
(function () {
  'use strict';

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Progressive photo upgrade ----
  // Each image shows its line-art .svg immediately. If a real photo
  // (data-photo) is present, it loads in the background and replaces the
  // drawing once ready. If the photo is missing, the drawing simply stays —
  // so the page never shows a broken or empty image.
  Array.prototype.slice.call(document.querySelectorAll('img[data-photo]')).forEach(function (img) {
    var photo = img.getAttribute('data-photo');
    if (!photo) return;
    var probe = new Image();
    probe.onload = function () { img.src = photo; };
    probe.src = photo;
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Scroll reveals ----
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        el.style.transitionDelay = (delay * 100) + 'ms';
        el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ---- Sticky header state ----
  var header = document.getElementById('siteHeader');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('is-stuck', window.scrollY > 12);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
