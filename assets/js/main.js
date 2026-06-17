/* =========================================================================
   PORTFOLIO · DIEGO GIL — main.js
   Solo lo imprescindible: hamburger menu y reveal on scroll.
   ========================================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* -------- i18n ES / EN (#11) -------- */
    const I18N = {
      es: {
        doc_title: 'Diego Gil — Backend · Bases de datos · DAM',
        meta_desc: 'Diego Gil. Desarrollador backend especializado en Java, Spring Boot y PostgreSQL. Estudiante de DAM en Tenerife y actualmente en prácticas en la Fundación General de la ULL trabajando en sistemas distribuidos y arquitectura de software.',
        nav_inicio: 'Inicio', nav_sobremi: 'Sobre mí', nav_stack: 'Stack', nav_proyectos: 'Proyectos',
        nav_formacion: 'Formación', nav_contactar: 'Contactar',
        skip: 'Saltar al contenido',
        hero_status: 'Disponible para prácticas / primer empleo backend',
        hero_sub: 'Prácticas en Fundación General',
        tag_backend: 'Backend', tag_db: 'Bases de datos', tag_arch: 'Arquitectura',
        cta_contact: 'Contáctame', cta_github: 'Ver GitHub',
        title_about: 'Sobre mí', title_projects: 'Proyectos', title_education: 'Formación',
        about_text: 'Estudiante de <strong>Desarrollo de Aplicaciones Multiplataforma</strong> en Tenerife. Me obsesiona entender cómo funcionan las cosas por dentro y construir soluciones que aporten valor real.',
        attr_dam: 'DAM Tenerife', attr_english: 'C1 Inglés', attr_license: 'Carnet B', attr_internship: 'Prácticas ULL',
        desc_canarias: 'Automatización del flujo de gestión de facturas con validaciones en cascada y trazabilidad documento a documento.',
        desc_anime: 'Torneos y ranking ELO de personajes anime. Backend con autenticación JWT y persistencia en PostgreSQL.',
        desc_tinerpay: 'Sistema de pagos distribuido tolerante a fallos sobre una base de datos SQL global.',
        desc_tsunagi: 'SDK de datos de anime para Java: un único cliente unificado sobre AniList, TMDb y Jikan.',
        desc_matcher: 'Matcher difuso multi-señal entre AniList y TMDb con algoritmos de similitud propios y scoring explicable.',
        desc_diesel: 'PWA con los precios oficiales del diésel en Tenerife: la gasolinera más barata, también offline.',
        contact_label: 'Contacto', contact_title: 'Contáctame', contact_phone: 'Teléfono',
        contact_quote: 'Abierto a colaborar en proyectos que busquen evolucionar, optimizar procesos y construir soluciones sólidas a largo plazo.',
        now_title: 'En qué estoy ahora', now_date: 'Actualizado · junio 2026',
        now_1: 'Prácticas en la Fundación General de la ULL, trabajando en Canarias Convive.',
        now_2: 'Aprendiendo sistemas distribuidos, PL/pgSQL avanzado y APIs REST.',
        now_3: 'Manteniendo tsunagi y Diésel Barato como proyectos personales activos.'
      },
      en: {
        doc_title: 'Diego Gil — Backend · Databases · DAM',
        meta_desc: 'Diego Gil. Backend developer specialised in Java, Spring Boot and PostgreSQL. DAM student in Tenerife, currently interning at Fundación General de la ULL working on distributed systems and software architecture.',
        nav_inicio: 'Home', nav_sobremi: 'About', nav_stack: 'Stack', nav_proyectos: 'Projects',
        nav_formacion: 'Education', nav_contactar: 'Contact',
        skip: 'Skip to content',
        hero_status: 'Available for an internship / first backend job',
        hero_sub: 'Internship at Fundación General',
        tag_backend: 'Backend', tag_db: 'Databases', tag_arch: 'Architecture',
        cta_contact: 'Get in touch', cta_github: 'View GitHub',
        title_about: 'About me', title_projects: 'Projects', title_education: 'Education',
        about_text: '<strong>Multiplatform Application Development</strong> student in Tenerife. I am obsessed with understanding how things work under the hood and building solutions that bring real value.',
        attr_dam: 'DAM · Tenerife', attr_english: 'C1 English', attr_license: 'Driving licence B', attr_internship: 'ULL internship',
        desc_canarias: 'Automated invoice-management flow with cascading validations and document-by-document traceability.',
        desc_anime: 'Anime-character tournaments and ELO ranking. Backend with JWT authentication and PostgreSQL persistence.',
        desc_tinerpay: 'Fault-tolerant distributed payment system on a global SQL database.',
        desc_tsunagi: 'Anime data SDK for Java: a single unified client over AniList, TMDb and Jikan.',
        desc_matcher: 'Multi-signal fuzzy matcher between AniList and TMDb with custom similarity algorithms and explainable scoring.',
        desc_diesel: 'PWA with the official diesel prices in Tenerife: the cheapest station, also offline.',
        contact_label: 'Contact', contact_title: 'Get in touch', contact_phone: 'Phone',
        contact_quote: 'Open to collaborating on projects that aim to evolve, optimise processes and build solid, long-term solutions.',
        contact_desc: 'Multiplatform Application Development student in Tenerife. Interested in backend, software architecture and the continuous improvement of systems that bring value.',
        now_title: 'What I am working on now', now_date: 'Updated · June 2026',
        now_1: 'Interning at Fundación General de la ULL, working on Canarias Convive.',
        now_2: 'Learning distributed systems, advanced PL/pgSQL and REST APIs.',
        now_3: 'Maintaining tsunagi and Diésel Barato as active personal projects.'
      }
    };

    const langBtns = Array.from(document.querySelectorAll('.lang-btn'));

    const applyLang = (lang) => {
      const dict = I18N[lang];
      if (!dict) return;
      document.documentElement.lang = lang;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = dict[el.getAttribute('data-i18n')];
        if (v != null) el.textContent = v;
      });
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const v = dict[el.getAttribute('data-i18n-html')];
        if (v != null) el.innerHTML = v;
      });
      if (dict.doc_title) document.title = dict.doc_title;
      const md = document.querySelector('meta[name="description"]');
      if (md && dict.meta_desc) md.setAttribute('content', dict.meta_desc);
      langBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'));
      try { localStorage.setItem('lang', lang); } catch (e) { /* storage no disponible */ }
    };

    if (langBtns.length) {
      let stored = null;
      try { stored = localStorage.getItem('lang'); } catch (e) { /* */ }
      const initial = stored || ((navigator.language || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'es');
      applyLang(initial);
      langBtns.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
    }

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

    /* -------- Diagrama de arquitectura TinerPay (#19) -------- */
    const archNodes = document.querySelectorAll('.arch-node');
    const archDesc = document.getElementById('archDesc');

    if (archNodes.length && archDesc) {
      const archDefault = archDesc.textContent;

      const activate = (node) => {
        archNodes.forEach(n => n.classList.toggle('is-active', n === node));
        archDesc.textContent = node.getAttribute('data-desc') || archDefault;
      };

      archNodes.forEach(node => {
        node.addEventListener('click', () => activate(node));
        node.addEventListener('focus', () => activate(node));
        node.addEventListener('mouseenter', () => activate(node));
        node.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate(node);
          }
        });
      });
    }

    /* -------- Terminal interactiva (#9) -------- */
    const termForm = document.getElementById('termForm');
    const termInput = document.getElementById('termInput');
    const termOutput = document.getElementById('termOutput');

    if (termForm && termInput && termOutput) {
      const history = [];
      let histIndex = 0;

      const el = (tag, cls, text) => {
        const n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
      };

      const printLine = (nodes, cls) => {
        const p = el('p', cls ? 'term-line ' + cls : 'term-line');
        (Array.isArray(nodes) ? nodes : [nodes]).forEach(n => {
          p.appendChild(typeof n === 'string' ? document.createTextNode(n) : n);
        });
        termOutput.appendChild(p);
      };

      const link = (href, text, blank) => {
        const a = el('a', null, text);
        a.href = href;
        if (blank) { a.target = '_blank'; a.rel = 'noopener'; }
        return a;
      };

      const commands = {
        help() {
          ['Comandos disponibles:',
            '  help        muestra esta ayuda',
            '  whoami      quién soy',
            '  stack       tecnologías que uso',
            '  proyectos   mis proyectos',
            '  contacto    cómo contactarme',
            '  clear       limpia la terminal'].forEach(l => printLine(l));
        },
        whoami() {
          printLine('Diego Gil — Backend Developer · estudiante de DAM en Tenerife · prácticas en la Fundación General de la ULL.');
        },
        stack() {
          printLine([el('span', 'term-cat', 'Backend  '), 'Java · Spring Boot · Node.js · PHP']);
          printLine([el('span', 'term-cat', 'BBDD     '), 'PostgreSQL · CockroachDB · MySQL · SQLite']);
          printLine([el('span', 'term-cat', 'Web      '), 'JavaScript · HTML · CSS · WordPress']);
        },
        proyectos() {
          [['Canarias Convive', null],
            ['AnimeShowdown', 'https://github.com/diegoalegil/AnimeShowdown'],
            ['TinerPay', 'https://github.com/diegoalegil/TinerPay'],
            ['tsunagi', 'https://github.com/diegoalegil/tsunagi'],
            ['Anime Title Matcher', 'https://github.com/diegoalegil/anime-title-matcher'],
            ['Diésel Barato', 'https://github.com/diegoalegil/diesel-barato']
          ].forEach(([name, repo]) => {
            if (repo) printLine(['• ' + name + '  ', link(repo, repo, true)]);
            else printLine('• ' + name + '  (prácticas profesionales)');
          });
        },
        contacto() {
          printLine(['email   ', link('mailto:diegogildam@gmail.com', 'diegogildam@gmail.com')]);
          printLine(['github  ', link('https://github.com/diegoalegil', 'github.com/diegoalegil', true)]);
        },
        clear() {
          termOutput.replaceChildren();
        }
      };

      const run = (raw) => {
        const cmd = raw.trim();
        if (!cmd) return;
        const echo = el('p', 'term-line');
        echo.appendChild(el('span', 'term-echo', '$'));
        echo.appendChild(document.createTextNode(' ' + cmd));
        termOutput.appendChild(echo);

        history.push(cmd);
        histIndex = history.length;

        const key = cmd.toLowerCase();
        if (key === 'sudo hire') {
          printLine('Permiso concedido. Escríbeme a diegogildam@gmail.com', 'term-ok');
        } else if (commands[key]) {
          commands[key]();
        } else {
          printLine('comando no reconocido: ' + cmd + ". Escribe 'help'.", 'term-err');
        }
        termOutput.scrollTop = termOutput.scrollHeight;
      };

      termForm.addEventListener('submit', (e) => {
        e.preventDefault();
        run(termInput.value);
        termInput.value = '';
      });

      termInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          if (!history.length) return;
          e.preventDefault();
          histIndex = Math.max(0, histIndex - 1);
          termInput.value = history[histIndex] || '';
        } else if (e.key === 'ArrowDown') {
          if (!history.length) return;
          e.preventDefault();
          histIndex = Math.min(history.length, histIndex + 1);
          termInput.value = history[histIndex] || '';
        }
      });

      // Reemplaza el fallback estático e imprime el banner inicial
      termOutput.replaceChildren();
      printLine(['Escribe ', el('span', 'term-ok', 'help'), ' para ver los comandos disponibles.']);
    }

    /* -------- Scroll-spy: sección activa en el nav (#12) -------- */
    const spyLinks = Array.from(document.querySelectorAll('#navLinks a[href^="#"]:not(.btn-contacto)'));

    if (spyLinks.length && 'IntersectionObserver' in window) {
      const sectionToLink = new Map();
      spyLinks.forEach(a => {
        const sec = document.getElementById(a.getAttribute('href').slice(1));
        if (sec) sectionToLink.set(sec, a);
      });

      const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const active = sectionToLink.get(entry.target);
          spyLinks.forEach(l => {
            l.classList.remove('is-active');
            l.removeAttribute('aria-current');
          });
          if (active) {
            active.classList.add('is-active');
            active.setAttribute('aria-current', 'true');
          }
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

      sectionToLink.forEach((a, sec) => spy.observe(sec));
    }

    /* -------- Copiar email al portapapeles (#20) -------- */
    const copyBtn = document.getElementById('copyEmailBtn');
    const copyStatus = document.getElementById('copyStatus');

    if (copyBtn) {
      const label = copyBtn.querySelector('.copy-label');
      const original = label ? label.textContent : '';
      let timer;

      const done = () => {
        copyBtn.classList.add('copied');
        if (label) label.textContent = 'Copiado';
        if (copyStatus) copyStatus.textContent = 'Email copiado al portapapeles';
        clearTimeout(timer);
        timer = setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (label) label.textContent = original;
          if (copyStatus) copyStatus.textContent = '';
        }, 1800);
      };

      const fallback = (text) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* sin soporte */ }
        document.body.removeChild(ta);
      };

      copyBtn.addEventListener('click', () => {
        const email = copyBtn.dataset.email || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(done).catch(() => { fallback(email); done(); });
        } else {
          fallback(email);
          done();
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
