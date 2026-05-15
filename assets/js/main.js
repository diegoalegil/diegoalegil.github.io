/* =========================================================================
   PORTFOLIO · DIEGO GIL — main.js
   Solo lo imprescindible: hamburger menu y reveal on scroll.
   ========================================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* -------- Hamburger menu -------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
      const close = () => {
        hamburger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      };

      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('is-open');
        navLinks.classList.toggle('is-open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', close);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
          close();
        }
      });
    }

    /* -------- Reveal on scroll -------- */
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: mostrar todo si no hay soporte
      revealEls.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));

  });

})();
