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
      const links = Array.from(navLinks.querySelectorAll('a'));

      const setOpen = (open) => {
        hamburger.classList.toggle('is-open', open);
        navLinks.classList.toggle('is-open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      };

      const open = () => {
        setOpen(true);
        if (links[0]) links[0].focus();
      };

      const close = (returnFocus) => {
        setOpen(false);
        if (returnFocus) hamburger.focus();
      };

      hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('is-open')) close(true);
        else open();
      });

      links.forEach(link => link.addEventListener('click', () => close(false)));

      document.addEventListener('keydown', (e) => {
        if (!navLinks.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
          close(true);
        } else if (e.key === 'Tab' && links.length) {
          // Focus trap: ciclar entre el primer y el último enlace del menú
          const first = links[0];
          const last = links[links.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
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
