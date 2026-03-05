document.addEventListener("DOMContentLoaded", () => {

  /* ========= STACK CARDS ========= */

  const stackSection = document.querySelector("#stack");
  const cards = document.querySelectorAll("#stack .card");
  const seqLines = document.querySelectorAll("#stack .seq-line");
  const connectors = document.querySelectorAll("#stack .connector");

  const stackObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        /* CARDS */

        cards.forEach((card, index) => {

          setTimeout(() => {
            card.classList.add("visible");
          }, index * 220);

        });

        /* PALABRAS */

        seqLines.forEach((line, index) => {

          setTimeout(() => {

            line.classList.add("visible");

          }, 300 + (index * 400));

        });

        /* CONECTORES */

        connectors.forEach((line, index) => {

          setTimeout(() => {

            line.style.opacity = "1";

          }, 400 + (index * 300));

        });

        stackObserver.unobserve(stackSection);

      }

    });

  }, { threshold: 0.45 });

  if (stackSection) {
    stackObserver.observe(stackSection);
  }


  /* ========= REVEAL ELEMENTS ========= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  }, { threshold: 0.25 });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ========= TIMELINE ========= */

  const timelineItems = document.querySelectorAll(".timeline-item");

  const timelineObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

      }

    });

  }, { threshold: 0.3 });

  timelineItems.forEach(item => timelineObserver.observe(item));

});

// SKILLS PANEL: animación de barras y contador
(function () {
  const skillsPanel = document.querySelector('.skills-panel');
  if (!skillsPanel) return;

  const skills = document.querySelectorAll('.skills-panel .skill');

  // función que anima número desde 0 hasta target
  function animateCounter(el, target, duration = 1300) {
    const start = 0;
    const range = target - start;
    const startTime = performance.now();
    function step(now) {
      const elapsed = Math.min(now - startTime, duration);
      const progress = elapsed / duration;
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress; // ease-ish
      const current = Math.round(start + range * eased);
      el.textContent = current + '%';
      if (elapsed < duration) requestAnimationFrame(step);
      else el.textContent = target + '%';
    }
    requestAnimationFrame(step);
  }

  // start animation: rellena las barras y anima numbers
  function startSkillsAnimation() {
    skills.forEach((skill, idx) => {
      const value = parseInt(skill.dataset.value || '0', 10);
      const fill = skill.querySelector('.bar-fill');
      const counter = skill.querySelector('.skill-value');

      // reveal row
      setTimeout(() => skill.classList.add('show'), idx * 120);

      // animate width (use small delay to sequence)
      setTimeout(() => {
        if (fill) fill.style.width = value + '%';
        if (counter) animateCounter(counter, value, 1100 + Math.min(600, value * 10));
      }, 200 + idx * 180);
    });
  }

  // IntersectionObserver para activar cuando el panel entra en viewport
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        startSkillsAnimation();
        obs.disconnect(); // una sola vez
      }
    });
  }, { threshold: 0.25 });

  io.observe(skillsPanel);
})();

// SKILL LINE CHART - crea SVG animado dentro de .skill-chart-stage
(function () {
  const skills = [
    { name: 'DAM', value: 50 },
    { name: 'MOTIVACIÓN', value: 100 },
    { name: 'BACKEND', value: 60 },
    { name: 'FRONTEND', value: 55 },
    { name: 'BASES DATOS', value: 70 }
  ];

  // crea el SVG y lo inserta en containerSelector
  function createSkillSVG(containerSelector = '.skill-chart-stage') {
    const wrap = document.querySelector(containerSelector);
    if (!wrap) return;

    // dimensiones basadas en viewport (se escalará con viewBox)
    const w = Math.min(720, Math.max(420, Math.round(window.innerWidth * 0.36)));
    const h = 220;
    const padding = { left: 28, right: 28, top: 28, bottom: 36 };

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.classList.add('skill-line-svg');

    // defs: linearGradient para stroke
    const defs = document.createElementNS(svgNS, 'defs');
    const grad = document.createElementNS(svgNS, 'linearGradient');

    grad.setAttribute('id', 'skillGradient');
    grad.setAttribute('x1', '0%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y1', '0%');
    grad.setAttribute('y2', '0%');

    [
      { off: '0%', color: '#00f7ff' },
      { off: '50%', color: '#6a00ff' },
      { off: '100%', color: '#ff00cc' }
    ].forEach(s => {

      const stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', s.off);
      stop.setAttribute('stop-color', s.color);

      grad.appendChild(stop);

    });


    // 🔥 ANIMACIÓN DEL GRADIENTE
    const animate = document.createElementNS(svgNS, 'animateTransform');

    animate.setAttribute('attributeName', 'gradientTransform');
    animate.setAttribute('type', 'translate');
    animate.setAttribute('from', '-1 0');
    animate.setAttribute('to', '1 0');
    animate.setAttribute('dur', '6s');
    animate.setAttribute('repeatCount', 'indefinite');

    grad.appendChild(animate);


    defs.appendChild(grad);
    svg.appendChild(defs);
    // helpers
    const count = skills.length;
    const innerW = w - padding.left - padding.right;
    const innerH = h - padding.top - padding.bottom;
    const xFor = i => Math.round(padding.left + (i * innerW) / (count - 1));
    const valueToY = v => Math.round(padding.top + (1 - v / 100) * innerH);

    // construir path (sin fill)
    let d = '';
    const points = skills.map((s, i) => {
      const x = xFor(i);
      const y = valueToY(s.value);
      if (i === 0) d = `M ${x} ${y}`;
      else d += ` L ${x} ${y}`;
      return { x, y, s };
    });

    // path (stroke degradado, sin fill)
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'skill-line-path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'url(#skillGradient)');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    // puntos, labels %
    points.forEach((p, idx) => {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', p.x);
      circle.setAttribute('cy', p.y);
      circle.setAttribute('r', 0); // arrancamos en 0 y animamos luego
      circle.setAttribute('class', 'skill-point');
      circle.setAttribute('data-value', p.s.value);
      svg.appendChild(circle);

      const pct = document.createElementNS(svgNS, 'text');
      pct.setAttribute('x', p.x);
      pct.setAttribute('y', p.y - 18);
      pct.setAttribute('class', 'pct-label');
      pct.setAttribute('text-anchor', 'middle');
      pct.textContent = `${p.s.value}%`;
      pct.style.opacity = 0;
      svg.appendChild(pct);

      const key = document.createElementNS(svgNS, 'text');
      key.setAttribute('x', p.x - 18);
      key.setAttribute('y', h - 6);
      key.setAttribute('class', 'key-label');
      key.textContent = p.s.name;
      svg.appendChild(key);
    });

    // añadir svg al contenedor
    wrap.innerHTML = '';
    wrap.appendChild(svg);

    // animar dibujo de la línea usando dashoffset
    const totalLen = path.getTotalLength();
    path.style.strokeDasharray = totalLen;
    path.style.strokeDashoffset = totalLen;
    // fuerza reflow
    path.getBoundingClientRect();

    const drawDuration = 1200;
    requestAnimationFrame(() => {
      path.style.transition = `stroke-dashoffset ${drawDuration}ms cubic-bezier(.2,.9,.2,1)`;
      path.style.strokeDashoffset = '0';
    });

    // después de dibujar, animar puntos y etiquetas
    setTimeout(() => {
      const circles = svg.querySelectorAll('circle.skill-point');
      const pctLabels = svg.querySelectorAll('text.pct-label');

      circles.forEach((c, i) => {
        // animamos el radio (Web Animations API)
        c.animate([{ r: 0 }, { r: 6 }, { r: 5 }], {
          duration: 600,
          delay: i * 120,
          easing: 'cubic-bezier(.2,.9,.2,1)',
          fill: 'forwards'
        });
        // aplicamos fills/strokes por si el CSS falta
        c.setAttribute('fill', '#00f7ff');
        c.setAttribute('stroke', '#6a00ff');
        c.setAttribute('stroke-width', '1.5');
      });

      pctLabels.forEach((t, i) => {
        t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 380 + i * 120, fill: 'forwards' });
      });
    }, drawDuration - 80);
  }

  // inicialización: creamos el SVG cuando el panel entre en vista (mejor UX)
  function initSkillChartObserver() {
    const panel = document.querySelector('.skill-chart-wrap');
    if (!panel) return;

    // si ya existe el svg, no volver a crear
    let created = false;
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(en => {
        if (en.isIntersecting && !created) {
          createSkillSVG('.skill-chart-stage');
          created = true;
          o.disconnect();
        }
      });
    }, { threshold: 0.15 });

    obs.observe(panel);

    // también recrear al resize si el svg se creó (debounce)
    let rto;
    window.addEventListener('resize', () => {
      clearTimeout(rto);
      rto = setTimeout(() => {
        // si ya se creó, redibujamos sustituyendo el svg
        if (created) createSkillSVG('.skill-chart-stage');
      }, 220);
    });
  }

  // iniciar cuando DOM listo
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSkillChartObserver);
  else initSkillChartObserver();
})();

const contact = document.querySelector(".contact-section");

const contactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.25 });

if (contact) {
  contactObserver.observe(contact);
}


let ticking = false;

const bg = document.querySelector(".bg-parallax");

document.addEventListener("mousemove", (e) => {

  if (!ticking) {

    requestAnimationFrame(() => {

      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      bg.style.transform =
        `translate(${x * 8}px, ${y * 8}px)`;

      ticking = false;

    });

    ticking = true;

  }

});


// EFECTO 3D EN TARJETAS
document.querySelectorAll(".contact-card").forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = "rotateX(0) rotateY(0) scale(1)";

  });

});

