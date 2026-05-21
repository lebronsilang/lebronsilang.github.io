// CERT DATA
const CERTS = [
  {
    name: 'IT Specialist — Python',
    issuer: 'Certiport',
    date: '202511', displayDate: 'Nov 2025', extra: 'Expires Nov 2030',
    tag: 'Python', featured: true,
    url: 'https://www.credly.com/badges/66f783ae-7bf9-4b3b-a53e-e3241779d56f'
  },
  {
    name: 'IT Specialist — Databases',
    issuer: 'Certiport',
    date: '202505', displayDate: 'May 2025', extra: '',
    tag: 'Database Admin', featured: true,
    url: 'https://www.credly.com/badges/91c12909-bc71-4eb1-8c81-ae04a11bb7fa'
  },
  {
    name: 'Getting Started with Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
    date: '202605', displayDate: 'May 2026', extra: '',
    tag: 'Networking', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    date: '202605', displayDate: 'May 2026', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.credly.com/badges/e30dc21b-f6b0-40cd-a9e5-76a42ccf4f8b'
  },
  {
    name: 'Introduction to Cybersecurity Tools & Cyberattacks V3',
    issuer: 'Coursera',
    date: '202512', displayDate: 'Dec 2025', extra: '',
    tag: 'IAM', featured: false,
    url: 'https://www.credly.com/badges/2764327d-90f9-43f8-be42-6c80f03a3837'
  },
  {
    name: 'Connect and Protect: Networks & Network Security',
    issuer: 'Google',
    date: '202506', displayDate: 'Jun 2025', extra: '',
    tag: 'Networking', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Play It Safe: Manage Security Risks',
    issuer: 'Google',
    date: '202505', displayDate: 'May 2025', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Foundations of Cybersecurity',
    issuer: 'Google',
    date: '202503', displayDate: 'Mar 2025', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Skill Builder: Introduction to Cybersecurity',
    issuer: 'AWS Cloud Club — Adamson University',
    date: '202503', displayDate: 'Mar 2025', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'AWS Cloud Clubs Generative AI Camper',
    issuer: 'AWS / ULSA',
    date: '202410', displayDate: 'Oct 2024', extra: '',
    tag: 'Gen AI', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  }
];

// ── CERT RENDERING ──────────────────────────────────────────
let currentFilter  = 'default';
let certsExpanded  = false;

function certRowHTML(cert, index) {
  const numStr  = String(index + 1).padStart(2, '0');
  const hasLink = cert.url && cert.url !== '#';
  const linkClass = hasLink ? ' has-link' : '';
  const arr = hasLink ? '↗' : '';
  const extra = cert.extra ? ` · <span style="color:var(--muted);font-weight:400">${cert.extra}</span>` : '';

  return `
    <div class="cert-row${linkClass}" ${hasLink ? `tabindex="0" role="link" data-href="${cert.url}"` : ''}>
      <div class="cert-row-n">${numStr}</div>
      <div class="cert-name">${cert.name}${extra}</div>
      <div class="cert-issuer-cell">${cert.issuer}</div>
      <div class="cert-date-cell">${cert.displayDate}</div>
      <div class="cert-link-arr">${arr}</div>
    </div>`;
}

function renderCerts(filter) {
  currentFilter = filter;

  // Update filter tab states
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.sort === filter);
  });

  let list;
  if (filter === 'date') {
    list = [...CERTS].sort((a, b) => b.date.localeCompare(a.date));
  } else if (filter === 'alpha') {
    list = [...CERTS].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // default: featured first, then rest
    list = [...CERTS.filter(c => c.featured), ...CERTS.filter(c => !c.featured)];
  }

  const INITIAL_COUNT = 5;
  const showAll = certsExpanded || list.length <= INITIAL_COUNT;
  const visible  = showAll ? list : list.slice(0, INITIAL_COUNT);
  const hidden   = showAll ? [] : list.slice(INITIAL_COUNT);

  const tableEl = document.getElementById('certTableBody');
  tableEl.innerHTML = visible.map((c, i) => certRowHTML(c, i)).join('');

  // Expand button
  const expandBtn = document.getElementById('certExpandBtn');
  if (list.length > INITIAL_COUNT) {
    expandBtn.style.display = '';
    if (certsExpanded) {
      expandBtn.innerHTML = `Show less <span class="arr">↑</span>`;
    } else {
      expandBtn.innerHTML = `View all ${list.length} certifications <span class="arr">↓</span>`;
    }
  } else {
    expandBtn.style.display = 'none';
  }

  // Clickable rows
  tableEl.querySelectorAll('.cert-row.has-link').forEach(row => {
    row.addEventListener('click', () => window.open(row.dataset.href, '_blank', 'noopener'));
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(row.dataset.href, '_blank', 'noopener');
      }
    });
  });

  // Fade-up new rows
  tableEl.querySelectorAll('.cert-row').forEach((row, i) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(10px)';
    row.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    setTimeout(() => {
      row.style.opacity = '';
      row.style.transform = '';
    }, i * 40 + 20);
  });
}

// ── THEME ───────────────────────────────────────────────────
const html      = document.documentElement;
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const label = theme === 'dark' ? 'Light' : 'Dark';
  document.querySelectorAll('.theme-btn').forEach(btn => btn.textContent = label);
}

applyTheme(localStorage.getItem(THEME_KEY) || 'light');

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
});

// ── MOBILE MENU ─────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('is-open'));
  });

  document.addEventListener('click', e => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('is-open');
    }
  });
}

// ── NAVBAR SCROLL STATE ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── SECTION ACTIVE LINK ─────────────────────────────────────
const allSections = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link =>
      link.classList.toggle('active', link.getAttribute('href') === '#' + id)
    );
  });
}, { threshold: 0.35 });

allSections.forEach(s => sectionObserver.observe(s));

// ── CERT FILTER BUTTONS ──────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    certsExpanded = false;
    renderCerts(btn.dataset.sort);
  });
});

// Expand / collapse
document.getElementById('certExpandBtn').addEventListener('click', () => {
  certsExpanded = !certsExpanded;
  renderCerts(currentFilter);
  if (!certsExpanded) {
    document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' });
  }
});

// ── INITIAL RENDER ───────────────────────────────────────────
renderCerts('default');

// ── SCROLL FADE-UP ───────────────────────────────────────────
const fadeEls = document.querySelectorAll('.sec-head, .about-grid, .edu-items, .interlude-text, .skills-split, .contact-split, footer');
fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    fadeObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObserver.observe(el));