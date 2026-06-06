/* Jensen-Souders & Associates — Main JS */

// ── Mobile nav toggle ──
const toggle   = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
}

// ── Dropdown menus ──
document.querySelectorAll('.nav-has-dropdown').forEach(li => {
  const trigger = li.querySelector('.dropdown-trigger');

  // Desktop: hover
  li.addEventListener('mouseenter', () => li.classList.add('open'));
  li.addEventListener('mouseleave', () => li.classList.remove('open'));

  // Mobile / keyboard: click toggle
  if (trigger) {
    trigger.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        li.classList.toggle('open');
      }
    });
  }
});

// Close dropdowns when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-has-dropdown')) {
    document.querySelectorAll('.nav-has-dropdown.open').forEach(li => li.classList.remove('open'));
  }
});

// ── Active nav link ──
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
      // Also mark parent dropdown trigger active
      const parent = a.closest('.nav-has-dropdown');
      if (parent) parent.querySelector('.dropdown-trigger')?.classList.add('active');
    }
  });
})();

// ── Scroll animations ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Back to top ──
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Contact form ──
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      if (success) { success.style.display = 'block'; success.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 900);
  });
}
