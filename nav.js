// nav.js — shared navigation

const fabBtn     = document.getElementById('fabBtn');
const fabWrapper = document.getElementById('fabWrapper');
const mainMenu   = document.getElementById('mainMenu');
const overlay    = document.getElementById('overlay');
const closeBtn   = document.getElementById('closeMenuBtn');

function openMenu() {
  mainMenu.classList.add('open');
  overlay.classList.add('show');
  fabBtn.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mainMenu.classList.remove('open');
  overlay.classList.remove('show');
  fabBtn.classList.remove('open');
  document.body.style.overflow = '';
}

fabBtn.addEventListener('click', () => {
  mainMenu.classList.contains('open') ? closeMenu() : openMenu();
});

let hoverTimeout;
fabWrapper.addEventListener('mouseenter', () => { clearTimeout(hoverTimeout); openMenu(); });
mainMenu.addEventListener('mouseenter',   () => { clearTimeout(hoverTimeout); });
fabWrapper.addEventListener('mouseleave', () => {
  hoverTimeout = setTimeout(() => { if (!mainMenu.matches(':hover')) closeMenu(); }, 220);
});
mainMenu.addEventListener('mouseleave', () => {
  hoverTimeout = setTimeout(() => { if (!fabWrapper.matches(':hover')) closeMenu(); }, 220);
});

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// Smooth scroll for top-navbar section links
document.addEventListener('click', function(e) {
  const link = e.target.closest('.top-navbar-links a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || !href.startsWith('#')) return;
  const target = document.getElementById(href.slice(1));
  if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});
