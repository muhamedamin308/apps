/* ═══════════════════════════════════════════════════════════
   MUHAMED AMIN — PORTFOLIO SCRIPT
   Interactive features: typed effect, scroll reveal, sticky nav,
   modal system, hamburger, code-language toggle, project filter
═══════════════════════════════════════════════════════════ */

'use strict';

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
  if (open) {
    bars[0].style.cssText = 'transform: rotate(45deg) translate(5px,5px)';
    bars[1].style.cssText = 'opacity:0; transform: scaleX(0)';
    bars[2].style.cssText = 'transform: rotate(-45deg) translate(5px,-5px)';
  } else {
    bars.forEach(b => b.style.cssText = '');
  }
});

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
  'Flutter Apps',
  'Clean Architectures',
  'Kotlin & Dart',
  'Cross-Platform UIs',
];
const typedEl = document.getElementById('typedText');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

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
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

setTimeout(type, 800);

// ── HERO CODE PANEL — LANGUAGE TOGGLE ─────────────────────
const codeSamples = {
  kotlin:
    `<span class="kw">class</span> <span class="tp">MuhamedAmin</span> : <span class="tp">Engineer</span> {
    <span class="kw">val</span> base = <span class="str">"Android"</span>
    <span class="kw">val</span> experience = <span class="str">"3+ years"</span>
    <span class="kw">val</span> stack = listOf(
        <span class="str">"Kotlin"</span>, <span class="str">"Compose"</span>,
        <span class="str">"Hilt"</span>, <span class="str">"Coroutines"</span>
    )

    <span class="kw">override fun</span> <span class="fn">ship</span>(idea: Idea): App {
        <span class="cm">// Clean Architecture, always</span>
        <span class="kw">return</span> idea.toCleanArchitecture()
    }
}`,
  dart:
    `<span class="kw">class</span> <span class="tp">MuhamedAmin</span> <span class="kw">implements</span> <span class="tp">Engineer</span> {
  <span class="kw">final</span> base = <span class="str">'Flutter'</span>;
  <span class="kw">final</span> internship = <span class="str">'Knowledge BI'</span>;
  <span class="kw">final</span> stack = [
    <span class="str">'Dart'</span>, <span class="str">'BLoC'</span>,
    <span class="str">'get_it'</span>, <span class="str">'Dio'</span>,
  ];

  <span class="kw">@override</span>
  <span class="tp">App</span> <span class="fn">ship</span>(<span class="tp">Idea</span> idea) {
    <span class="cm">// Clean Architecture, always</span>
    <span class="kw">return</span> idea.toCleanArchitecture();
  }
}`
};

const codePane = document.querySelector('#codePane code');
const codeTabs = document.querySelectorAll('.code-tab');

function setCodeLang(lang) {
  if (!codePane || !codeSamples[lang]) return;
  codePane.innerHTML = codeSamples[lang];
  codeTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.lang === lang));
}

codeTabs.forEach(tab => {
  tab.addEventListener('click', () => setCodeLang(tab.dataset.lang));
});

setCodeLang('kotlin');

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
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

// ── PROJECT FILTER ────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.platform === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

// ── MODAL SYSTEM ──────────────────────────────────────────
const modalMap = {
  'pulse': 'modal-pulse',
  'wavora': 'modal-wavora',
  'wealthwave': 'modal-wealthwave',
  'ordernow': 'modal-ordernow',
  'peblo': 'modal-peblo',
  'readmate': 'modal-readmate',
  'fashion-zone': 'modal-fashion-zone',
  'movies-club': 'modal-movies-club',
};

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  const firstFocusable = el.querySelector('button, a');
  if (firstFocusable) firstFocusable.focus();
}

function closeModal(el) {
  el.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-project');
    const modalId = modalMap[key];
    if (modalId) openModal(modalId);
  });
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.closest('.modal'));
  });
});

document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', () => {
    closeModal(backdrop.closest('.modal'));
  });
});

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
      }, i * 40);
    });
  });
  cat.addEventListener('mouseleave', () => {
    tags.forEach(tag => { tag.style.transform = ''; });
  });
});

// ── STATS COUNTER ANIMATION ───────────────────────────────
function animateCounter(el, end) {
  const duration = 1600;
  const step = (timestamp) => {
    if (!step.startTime) step.startTime = timestamp;
    const progress = Math.min((timestamp - step.startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * end) + (el.dataset.suffix || '+');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = parseInt(entry.target.dataset.end);
      if (!isNaN(num)) animateCounter(entry.target, num);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => {
  const match = el.textContent.match(/\d+/);
  const suffix = el.textContent.replace(/\d+/, '').trim();
  if (match) {
    el.dataset.end = match[0];
    el.dataset.suffix = suffix;
    el.textContent = '0' + suffix;
    statObserver.observe(el);
  }
});
