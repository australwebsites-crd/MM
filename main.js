/**
 * Landing Page Vanilla JS
 * Intelligence Designed To Evolve
 */

// Easing function for smooth stat counter
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function animateCount(el, target, decimals, suffix, duration, delay) {
  setTimeout(() => {
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = eased * target;

      el.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }
    requestAnimationFrame(tick);
  }, delay);
}

function initStatsCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  const footer = document.getElementById('statsFooter');
  if (!statValues.length || !footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statValues.forEach((el, index) => {
            const target = parseFloat(el.getAttribute('data-target') || '0');
            const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1500 + index * 80;
            const delay = 480 + index * 90;
            animateCount(el, target, decimals, suffix, duration, delay);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(footer);
}

function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sign-in');

  if (!burgerBtn || !mobileMenu) return;

  function openMenu() {
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.removeAttribute('hidden');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burgerBtn.addEventListener('click', toggleMenu);

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}

function initNavLinks() {
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function bindLinks(links) {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
        }
        links.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  bindLinks(desktopLinks);
  bindLinks(mobileLinks);
}

function initVideoAutoplay() {
  const video = document.querySelector('.bg-video');
  if (video) {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initVideoAutoplay();
  initStatsCounter();
  initMobileMenu();
  initNavLinks();
});
