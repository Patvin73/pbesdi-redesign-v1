/* ============================================================
   PBESDI - Esport Domino Indonesia
   Main Script | script.js
   Sticky Nav · Hamburger Menu · Scroll Progress · Counters
   ============================================================ */

const nav       = document.getElementById('main-nav');
  const progress  = document.getElementById('nav-progress');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu= document.getElementById('mobile-menu');
  const sections  = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks  = document.querySelectorAll('.mobile-nav-links a');

  /* ── Scroll: progress bar + nav style + active link ── */
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    progress.style.width = (scrollTop / docHeight * 100) + '%';

    // Sticky style switch
    if (scrollTop > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // Active nav link
    let current = '';
    sections.forEach(s => {
      if (scrollTop >= s.offsetTop - 90) current = s.id;
    });
    [...desktopLinks, ...mobileLinks].forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── Hamburger toggle ─────────────────────────────── */
  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close drawer when a mobile link is clicked
  mobileLinks.forEach(a => {
    a.addEventListener('click', () => {
      setTimeout(closeMobileMenu, 200);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ── Counter animation ────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const text = el.textContent;
      const num  = parseFloat(text);
      if (isNaN(num)) return;
      let start = 0; const duration = 1500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.innerHTML = text.replace(num.toString(), Math.floor(progress * num).toString());
        if (progress < 1) requestAnimationFrame(step);
        else el.innerHTML = text;
      };
      requestAnimationFrame(step);
    });
  }
  const statsSection = document.getElementById('stats');
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); observer.disconnect(); }
  }, { threshold: .3 });
  observer.observe(statsSection);