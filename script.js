/* ═══════════════════════════════════════════════════════════
   MUHAMED AMIN — PORTFOLIO SCRIPT
   Interactive features: typed effect, scroll reveal,
   sticky nav, modal system, hamburger, theme toggle
═══════════════════════════════════════════════════════════ */

'use strict';

// ── THEME TOGGLE ──────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('ma-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('ma-theme', next);
});

// ── STICKY NAVBAR ─────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── HAMBURGER MENU ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const bars = hamburger.querySelectorAll('span');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  // Animate bars into X
  if (open) {
    bars[0].style.cssText = 'transform: rotate(45deg) translate(5px,5px)';
    bars[1].style.cssText = 'opacity:0; transform: scaleX(0)';
    bars[2].style.cssText = 'transform: rotate(-45deg) translate(5px,-5px)';
  } else {
    bars.forEach(b => b.style.cssText = '');
  }
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    bars.forEach(b => b.style.cssText = '');
  });
});

// ── ACTIVE NAV LINK on SCROLL ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observeNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

sections.forEach(s => observeNav.observe(s));

// ── TYPED TEXT EFFECT ─────────────────────────────────────
const phrases = [
  'Android Apps',
  'Clean Architectures',
  'Beautiful UIs',
  'Kotlin Code',
  'Mobile Experiences',
];
const typedEl = document.getElementById('typedText');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimer;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

// Start typing after a short delay
setTimeout(type, 800);

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(idx * 80, 400));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── MODAL SYSTEM ──────────────────────────────────────────
const modalMap = {
  'fashion-zone'  : 'modal-fashion-zone',
  'movies-club'   : 'modal-movies-club',
  'mini-amazon'   : 'modal-mini-amazon',
  'spotify-clone' : 'modal-spotify-clone',
  'udemyfy'       : 'modal-udemyfy',
  'readmate'      : 'modal-readmate',
};

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Trap focus
  const firstFocusable = el.querySelector('button, a');
  if (firstFocusable) firstFocusable.focus();
}

function closeModal(el) {
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// Open via project buttons
document.querySelectorAll('[data-project]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-project');
    const modalId = modalMap[key];
    if (modalId) openModal(modalId);
  });
});

// Close via X buttons
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.closest('.modal'));
  });
});

// Close via backdrop click
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', () => {
    closeModal(backdrop.closest('.modal'));
  });
});

// Close via Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
  }
});

// ── FOOTER YEAR ───────────────────────────────────────────
const footerYear = document.getElementById('footerYear');
if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} Muhamed Amin. All rights reserved.`;
}

// ── SMOOTH SCROLL for anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── SKILL TAG HOVER STAGGER ───────────────────────────────
document.querySelectorAll('.skill-category').forEach(cat => {
  const tags = cat.querySelectorAll('.skill-tag');
  cat.addEventListener('mouseenter', () => {
    tags.forEach((tag, i) => {
      setTimeout(() => {
        tag.style.transform = 'scale(1.06)';
        tag.style.background = 'rgba(61,220,132,0.2)';
      }, i * 40);
    });
  });
  cat.addEventListener('mouseleave', () => {
    tags.forEach(tag => {
      tag.style.transform = '';
      tag.style.background = '';
    });
  });
});

// ── CURSOR PARTICLE TRAIL ─────────────────────────────────
// Lightweight particle on hero only
const hero = document.getElementById('hero');
if (hero) {
  hero.addEventListener('mousemove', e => {
    if (Math.random() > 0.5) return; // throttle
    const dot = document.createElement('span');
    dot.style.cssText = `
      position:fixed; pointer-events:none; z-index:0;
      left:${e.clientX}px; top:${e.clientY}px;
      width:4px; height:4px;
      border-radius:50%;
      background:rgba(61,220,132,0.6);
      transform:translate(-50%,-50%);
      animation: particleFade 0.8s ease forwards;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
  });

  // Add keyframes once
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleFade {
        0%   { opacity:0.8; transform:translate(-50%,-50%) scale(1); }
        100% { opacity:0;   transform:translate(-50%,-50%) scale(0) translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ── STATS COUNTER ANIMATION ───────────────────────────────
function animateCounter(el, end) {
  let start = 0;
  const duration = 1600;
  const step = (timestamp) => {
    if (!step.startTime) step.startTime = timestamp;
    const progress = Math.min((timestamp - step.startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * end) + (el.dataset.suffix || '+');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = parseInt(entry.target.textContent);
      if (!isNaN(num)) animateCounter(entry.target, num);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => {
  // Store suffix
  const match = el.textContent.match(/\d+/);
  const suffix = el.textContent.replace(/\d+/, '').trim();
  if (match) {
    el.dataset.suffix = suffix;
    el.dataset.target = match[0];
    el.textContent = '0' + suffix;
    statObserver.observe(el);
  }
});
