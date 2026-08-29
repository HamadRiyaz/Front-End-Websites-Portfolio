/* =========================================================
   Hamad Riyaz — Portfolio scripts (modular, vanilla JS)
   ========================================================= */

/* ---------- Header: scroll state + mobile nav ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeNav();
  });
}

/* ---------- Active navigation state ---------- */
function initActiveNav() {
  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('#primary-nav a[href]').forEach((link) => {
    const target = link.getAttribute('href').split('/').pop().toLowerCase();
    if (target === file) link.setAttribute('aria-current', 'page');
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.querySelector('.to-top');
  if (!btn) return;

  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 500);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Footer year ---------- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* ---------- Projects: filtering + detail modal ---------- */
function initProjects() {
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.project'));
  const empty = document.getElementById('projects-empty');

  document.querySelectorAll('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      let visible = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || (card.dataset.category || '').split(' ').includes(filter);
        card.classList.toggle('is-hidden', !match);
        if (match) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  });

  initProjectModal(cards);
}

function initProjectModal(cards) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const panel = modal.querySelector('.modal__panel');
  const closeBtn = modal.querySelector('.modal__close');
  const content = modal.querySelector('#modal-content');
  let lastFocused = null;

  const openModal = (card) => {
    const details = card.querySelector('template');
    if (!details) return;
    lastFocused = document.activeElement;
    content.innerHTML = details.innerHTML;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  cards.forEach((card) => {
    const trigger = card.querySelector('[data-open-details]');
    if (trigger) trigger.addEventListener('click', () => openModal(card));
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (!panel.contains(e.target)) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (v) =>
      v.trim().length >= 2
        ? ''
        : 'Please enter your name (2+ characters).',

    email: (v) =>
      emailPattern.test(v.trim())
        ? ''
        : 'Please enter a valid email address.',

    subject: (v) =>
      v.trim().length >= 3
        ? ''
        : 'Please add a short subject.',

    message: (v) =>
      v.trim().length >= 15
        ? ''
        : 'Please write at least 15 characters.',
  };

  const validateField = (input) => {
    const rule = rules[input.name];
    if (!rule) return true;

    const error = rule(input.value);
    const wrapper = input.closest('.field');

    wrapper.classList.toggle('has-error', Boolean(error));
    wrapper.querySelector('.error').textContent = error;
    input.setAttribute('aria-invalid', error ? 'true' : 'false');

    return !error;
  };

  // Field validation
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));

    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = Array.from(
      form.querySelectorAll('input, textarea')
    );

    const valid = inputs.map(validateField).every(Boolean);

    if (!valid) {
      status.textContent = 'Please fix the highlighted fields.';
      status.style.color = '#ff8a8a';

      const firstError = form.querySelector(
        '.field.has-error input, .field.has-error textarea'
      );

      if (firstError) firstError.focus();

      return;
    }

    // Sending message to Formspree
    status.style.color = '';
    status.textContent = 'Sending message...';

    try {
      const response = await fetch('https://formspree.io/f/xppaglrz', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        status.style.color = '#35d6e6';
        status.textContent =
          'Message sent successfully! I will get back to you soon.';

        form.reset();

        form.querySelectorAll('.field').forEach((field) => {
          field.classList.remove('has-error');
          field.querySelector('.error').textContent = '';
        });
      } else {
        status.style.color = '#ff8a8a';
        status.textContent =
          'Something went wrong. Please try again.';
      }
    } catch (error) {
      status.style.color = '#ff8a8a';
      status.textContent =
        'Unable to send message. Please try again later.';
    }
  });
}
/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initActiveNav();
  initReveal();
  initBackToTop();
  initYear();
  initProjects();
  initContactForm();
});
