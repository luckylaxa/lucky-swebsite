/* United Architects — subtle interactions
   Scroll reveals + sticky-header state. Respects prefers-reduced-motion. */
(function () {
  'use strict';

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  // ---- Mobile hamburger menu ----
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav && header) {
    var setMenu = function (open) {
      mobileNav.hidden = !open;
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      header.classList.toggle('nav-open', open);
    };
    navToggle.addEventListener('click', function () { setMenu(mobileNav.hidden); });
    // close after tapping a link
    Array.prototype.slice.call(mobileNav.querySelectorAll('a')).forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileNav.hidden) { setMenu(false); navToggle.focus(); }
    });
    // reset when resizing back up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && !mobileNav.hidden) setMenu(false);
    });
  }
})();
