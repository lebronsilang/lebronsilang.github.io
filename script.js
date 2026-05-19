// CERT DATA
const CERTS = [
  {
    name: 'IT Specialist — Python',
    issuer: 'certiport', issuerName: 'Certiport',
    date: '202511', displayDate: 'Nov 2025', extra: 'Expires Nov 2030',
    tag: 'Python', featured: true,
    url: 'https://www.credly.com/badges/66f783ae-7bf9-4b3b-a53e-e3241779d56f'
  },
  {
    name: 'IT Specialist — Databases',
    issuer: 'certiport', issuerName: 'Certiport',
    date: '202505', displayDate: 'May 2025', extra: '',
    tag: 'Database Admin', featured: true,
    url: 'https://www.credly.com/badges/91c12909-bc71-4eb1-8c81-ae04a11bb7fa'
  },
  {
    name: 'Getting Started with Cisco Packet Tracer',
    issuer: 'cisco', issuerName: 'Cisco Networking Academy',
    date: '202605', displayDate: 'May 2026', extra: '',
    tag: 'Networking', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'cisco', issuerName: 'Cisco',
    date: '202605', displayDate: 'May 2026', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.credly.com/badges/e30dc21b-f6b0-40cd-a9e5-76a42ccf4f8b'
  },
  {
    name: 'Introduction to Cybersecurity Tools & Cyberattacks V3',
    issuer: 'coursera', issuerName: 'Coursera',
    date: '202512', displayDate: 'Dec 2025', extra: '',
    tag: 'IAM', featured: false,
    url: 'https://www.credly.com/badges/2764327d-90f9-43f8-be42-6c80f03a3837'
  },
  {
    name: 'Connect and Protect: Networks & Network Security',
    issuer: 'google', issuerName: 'Google',
    date: '202506', displayDate: 'Jun 2025', extra: '',
    tag: 'Networking', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Play It Safe: Manage Security Risks',
    issuer: 'google', issuerName: 'Google',
    date: '202505', displayDate: 'May 2025', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Foundations of Cybersecurity',
    issuer: 'google', issuerName: 'Google',
    date: '202503', displayDate: 'Mar 2025', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'Skill Builder: Introduction to Cybersecurity',
    issuer: 'aws', issuerName: 'AWS Cloud Club — Adamson University',
    date: '202503', displayDate: 'Mar 2025', extra: '',
    tag: 'Cybersecurity', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  },
  {
    name: 'AWS Cloud Clubs Generative AI Camper',
    issuer: 'aws', issuerName: 'AWS / ULSA',
    date: '202410', displayDate: 'Oct 2024', extra: '',
    tag: 'Gen AI', featured: false,
    url: 'https://www.linkedin.com/in/lebronsilang/'
  }
];

// CERT RENDERING
function certCardHTML(cert, featured) {
  const linkHTML = cert.url && cert.url !== '#'
    ? `<a href="${cert.url}" class="cert-link" target="_blank" rel="noopener">View credential ↗</a>`
    : '';
  const extraHTML = cert.extra ? ` · ${cert.extra}` : '';
  const featuredClass = featured ? ' cert-featured' : '';

  return `
    <div class="glass-card cert-card${featuredClass}">
      <div class="cert-issuer ${cert.issuer}">${cert.issuerName}</div>
      <h4>${cert.name}</h4>
      <p>Issued ${cert.displayDate}${extraHTML}</p>
      <div class="cert-card-footer">
        <span class="cert-tag">${cert.tag}</span>
        ${linkHTML}
      </div>
    </div>`;
}

let currentFilter = 'default';

function renderCerts(filter) {
  currentFilter = filter;
  const container = document.getElementById('certRender');

  // Update filter button states
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.sort === filter);
  });

  if (filter === 'default') {
    const featured = CERTS.filter(c => c.featured);
    const others   = CERTS.filter(c => !c.featured);

    container.innerHTML = `
      <div class="cert-featured-grid">
        ${featured.map(c => certCardHTML(c, true)).join('')}
      </div>
      <button class="btn-view-all" id="viewAllCerts">View all ${CERTS.length} certifications ↓</button>
      <div class="cert-all" id="allCertsSection">
        <div class="cert-grid">
          ${others.map(c => certCardHTML(c, false)).join('')}
        </div>
        <button class="btn-view-all" id="collapseAllCerts">Show less ↑</button>
      </div>`;

    document.getElementById('viewAllCerts').addEventListener('click', () => {
      document.getElementById('allCertsSection').classList.add('is-open');
      document.getElementById('viewAllCerts').style.display = 'none';
    });

    document.getElementById('collapseAllCerts').addEventListener('click', () => {
      document.getElementById('allCertsSection').classList.remove('is-open');
      document.getElementById('viewAllCerts').style.display = '';
      document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' });
    });

  } else {
    const sorted = [...CERTS].sort((a, b) =>
      filter === 'date'
        ? b.date.localeCompare(a.date)
        : a.name.localeCompare(b.name)
    );

    container.innerHTML = `
      <div class="cert-grid">
        ${sorted.map(c => certCardHTML(c, false)).join('')}
      </div>`;
  }

  // Re-apply tilt and fade-up to new cards
  container.querySelectorAll('.glass-card').forEach(card => {
    applyTilt(card);
    card.classList.add('fade-up');
    setTimeout(() => card.classList.add('visible'), 60);
  });
}


// THEME
const html      = document.documentElement;
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  document.getElementById('themeToggleDesktop').setAttribute('aria-label', label);
  document.getElementById('themeToggleMobile').setAttribute('aria-label', label);
}

applyTheme(localStorage.getItem(THEME_KEY) || 'light');

function toggleTheme() {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

document.getElementById('themeToggleDesktop').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

// MOBILE HAMBURGER MENU
const menuToggle  = document.getElementById('menuToggle');
const mobileMenu  = document.getElementById('mobileMenu');
const navMenuPill = document.getElementById('navMenuPill');

menuToggle.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

document.querySelectorAll('.mobile-link').forEach(link =>
  link.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
);

// Close on outside click
document.addEventListener('click', e => {
  if (!navMenuPill.contains(e.target)) mobileMenu.classList.remove('is-open');
});

// NAVBAR SCROLL STATE
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// SECTION OBSERVER
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
}, { threshold: 0.4 });

allSections.forEach(s => sectionObserver.observe(s));

// CERT FILTER BUTTONS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => renderCerts(btn.dataset.sort));
});

// Initial render
renderCerts('default');

// SCROLL FADE-UP ANIMATIONS
const fadeEls = document.querySelectorAll('.glass-card, h2, .hero-content, .section-label');
fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 80);
    fadeObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// GLASS CARD TILT
function applyTilt(card) {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}

document.querySelectorAll('.glass-card').forEach(applyTilt);