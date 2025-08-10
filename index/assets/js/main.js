// Mobile nav toggle
const navToggleButton = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggleButton && navLinks) {
  navToggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Menu navigation logic
const menuScreen = document.getElementById('menu');
const contentSections = Array.from(document.querySelectorAll('.content'));
const backToMenuBtn = document.getElementById('backToMenu');

function showMenu() {
  menuScreen?.classList.add('show');
  contentSections.forEach((s) => s.classList.remove('show'));
  if (backToMenuBtn) backToMenuBtn.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSection(id) {
  menuScreen?.classList.remove('show');
  contentSections.forEach((s) => {
    if (s.id === id) s.classList.add('show');
    else s.classList.remove('show');
  });
  if (backToMenuBtn) backToMenuBtn.hidden = false;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Initialize default view
showMenu();

// Handle menu tile clicks
document.querySelectorAll('.menu-tile').forEach((tile) => {
  tile.addEventListener('click', (e) => {
    e.preventDefault();
    const target = tile.getAttribute('data-target');
    if (target) showSection(target);
  });
});

// Back to menu
if (backToMenuBtn) {
  backToMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showMenu();
  });
}

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      // If the target is a content section and menu is showing, switch view first
      if (contentSections.some((s) => s.id === targetId)) {
        e.preventDefault();
        showSection(targetId);
      } else {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
      navLinks?.classList.remove('show');
    }
  });
});

// Product details: toggle expandable sections below cards
document.querySelectorAll('.details-toggle').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const controlsId = btn.getAttribute('aria-controls');
    const panel = controlsId ? document.getElementById(controlsId) : null;
    if (!panel) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', (!expanded).toString());
    if (expanded) {
      panel.hidden = true;
    } else {
      panel.hidden = false;
    }
  });
});

// Contact form handler (no backend; just shows a success message)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    contactForm.reset();
  });
}

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}


