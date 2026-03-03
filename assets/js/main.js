document.addEventListener("DOMContentLoaded", function() {

  /* REVEAL */

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));

  /* DESVANECER CIELO */

  const bg = document.getElementById("background-layer");

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const max = window.innerHeight * 2;

    let opacity = 1 - scroll / max;
    if (opacity < 0) opacity = 0;

    bg.style.opacity = opacity;
  });

  /* PARTICULAS */

  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      d: Math.random() * 0.5 + 0.3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();

    particles.forEach(p => {
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    });

    ctx.fill();
    update();
  }

  function update() {
    particles.forEach(p => {
      p.y -= p.d;
      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();

});
