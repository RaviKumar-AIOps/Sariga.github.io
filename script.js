// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Scrollspy — highlight the nav link for the section in view
const navLinks = nav.querySelectorAll('a[href^="#"]');
const linkByTargetId = {};
navLinks.forEach((link) => {
  linkByTargetId[link.getAttribute('href').slice(1)] = link;
});

const heroSection = document.querySelector('.hero');
const spyTargets = [
  heroSection,
  ...Object.keys(linkByTargetId).map((id) => document.getElementById(id)),
].filter(Boolean);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove('is-active'));
      const activeLink = linkByTargetId[entry.target.id];
      if (activeLink) activeLink.classList.add('is-active');
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
spyTargets.forEach((target) => spyObserver.observe(target));

// Back to top
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();