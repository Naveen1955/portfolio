// ── Smooth scroll helper ──
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Contact form submit ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('send-btn');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'linear-gradient(to right, #16a34a, #15803d)';
    btn.style.opacity = '1';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
    }, 3000);
  }, 1000);
}

// ── AnimatedThemeToggler ──
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  const moon = document.getElementById('icon-moon');
  const sun  = document.getElementById('icon-sun');
  const btn  = document.getElementById('theme-toggle');

  if (isLight) {
    moon.style.display = 'none';
    sun.style.display  = 'block';
    btn.style.transform = 'rotate(180deg)';
    setTimeout(() => btn.style.transform = '', 300);
  } else {
    sun.style.display  = 'none';
    moon.style.display = 'block';
    btn.style.transform = 'rotate(-180deg)';
    setTimeout(() => btn.style.transform = '', 300);
  }
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Restore saved theme on page load
(function restoreTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    const moon = document.getElementById('icon-moon');
    const sun  = document.getElementById('icon-sun');
    if (moon) moon.style.display = 'none';
    if (sun)  sun.style.display  = 'block';
  }
})();

// ── MagicUI Dock magnification ──
(function initDock() {
  const dock  = document.getElementById('dock');
  if (!dock) return;
  const icons = Array.from(dock.querySelectorAll('.dock-icon'));
  const BASE = 40, MAX = 64, SPREAD = 100;

  // Inject tooltip labels from data-label attribute
  icons.forEach(icon => {
    const label = document.createElement('span');
    label.className = 'dock-label';
    label.textContent = icon.dataset.label || '';
    icon.appendChild(label);
  });

  dock.addEventListener('mousemove', (e) => {
    const dockRect = dock.getBoundingClientRect();
    const mouseX   = e.clientX - dockRect.left;
    icons.forEach(icon => {
      const iconRect   = icon.getBoundingClientRect();
      const iconCenter = iconRect.left + iconRect.width / 2 - dockRect.left;
      const dist  = Math.abs(mouseX - iconCenter);
      const scale = dist < SPREAD
        ? 1 + (MAX / BASE - 1) * Math.cos((dist / SPREAD) * (Math.PI / 2))
        : 1;
      const size = BASE * scale;
      icon.style.width  = size + 'px';
      icon.style.height = size + 'px';
    });
  });

  dock.addEventListener('mouseleave', () => {
    icons.forEach(icon => {
      icon.style.width  = BASE + 'px';
      icon.style.height = BASE + 'px';
    });
  });
})();

// ── Scroll-triggered fade-in animations (IntersectionObserver) ──
(function initObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Stagger skill pills inside skill cards
      if (entry.target.classList.contains('skill-card')) {
        entry.target.querySelectorAll('.skill-pill').forEach((pill, i) => {
          setTimeout(() => pill.classList.add('visible'), i * 80);
        });
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  const targets = document.querySelectorAll(
    '.project-card, .skill-card, .cert-card, .research-card, .contact-info-card, .contact-form-wrap'
  );
  targets.forEach(el => observer.observe(el));
})();
// Magic card effect
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('mousemove', (e) => {
    const rect = form.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    form.style.setProperty('--mouse-x', x + '%');
    form.style.setProperty('--mouse-y', y + '%');
  });
}
// Contact dock magnification
(function initContactDock() {
  const dock  = document.getElementById('dock-contact');
  if (!dock) return;
  const icons = Array.from(dock.querySelectorAll('.dock-icon'));
  const BASE = 40, MAX = 64, SPREAD = 100;

  icons.forEach(icon => {
    const label = document.createElement('span');
    label.className = 'dock-label';
    label.textContent = icon.dataset.label || '';
    icon.appendChild(label);
  });

  dock.addEventListener('mousemove', (e) => {
    const dockRect = dock.getBoundingClientRect();
    const mouseX   = e.clientX - dockRect.left;
    icons.forEach(icon => {
      const iconRect   = icon.getBoundingClientRect();
      const iconCenter = iconRect.left + iconRect.width / 2 - dockRect.left;
      const dist  = Math.abs(mouseX - iconCenter);
      const scale = dist < SPREAD
        ? 1 + (MAX / BASE - 1) * Math.cos((dist / SPREAD) * (Math.PI / 2))
        : 1;
      const size = BASE * scale;
      icon.style.width  = size + 'px';
      icon.style.height = size + 'px';
    });
  });

  dock.addEventListener('mouseleave', () => {
    icons.forEach(icon => {
      icon.style.width  = BASE + 'px';
      icon.style.height = BASE + 'px';
    });
  });
})();
function fireConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x: 0.15, y: 0.3 },
    colors: ['#a855f7', '#3b82f6', '#22c55e', '#ec4899', '#f59e0b', '#fff'],
    startVelocity: 40,
    gravity: 0.9,
    ticks: 250,
    shapes: ['circle', 'square'],
  });
}