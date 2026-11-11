(() => {
  'use strict';
  const header = document.getElementById('mainNavbar');
  const nav = document.getElementById('lab-navigation');
  const toggle = document.querySelector('.lab-menu-toggle');
  const links = [...nav.querySelectorAll('.lab-nav-link')];
  const progress = document.querySelector('.reading-progress');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 991px)');
  const sections = links.map(link => document.querySelector(link.hash));
  const lightSections = [...document.querySelectorAll('.about-section, .services-section')];
  let framePending = false;
  let ranges = [];
  let lightRanges = [];

  function setMenu(open, restoreFocus = false) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    // Hidden mobile links must also be absent from the keyboard tab order.
    nav.inert = mobile.matches && !open;
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  header.querySelector('.lab-contact').addEventListener('click', () => setMenu(false));
  header.querySelector('.lab-brand').addEventListener('click', () => setMenu(false));
  document.addEventListener('pointerdown', event => {
    if (!header.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) setMenu(false, true);
  });
  header.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!header.contains(document.activeElement)) setMenu(false);
    });
  });
  mobile.addEventListener('change', () => setMenu(false));
  setMenu(false);

  function measure() {
    const top = element => element.getBoundingClientRect().top + window.scrollY;
    ranges = sections.map(section => ({ id: section.id, top: top(section) }));
    lightRanges = lightSections.map(section => ({ top: top(section), bottom: top(section) + section.offsetHeight }));
    scheduleUpdate();
  }

  function updateScroll() {
    framePending = false;
    const y = window.scrollY;
    const compact = header.classList.contains('scrolled') ? y > 32 : y > 110;
    header.classList.toggle('scrolled', compact);
    const headerCenter = y + header.offsetTop + header.offsetHeight / 2;
    header.classList.toggle('on-light', lightRanges.some(range => headerCenter >= range.top && headerCenter < range.bottom));
    const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, y / range))})`;
    const marker = y + Math.min(window.innerHeight * .3, 180);
    let current = 'home';
    // About appears before Services in the original page, irrespective of nav order.
    let latestTop = -Infinity;
    ranges.forEach(section => {
      if (section.top <= marker && section.top > latestTop) {
        current = section.id;
        latestTop = section.top;
      }
    });
    links.forEach(link => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function scheduleUpdate() {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updateScroll);
    }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('load', measure);
  window.addEventListener('pageshow', measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  document.fonts?.ready.then(measure);
  measure();

  const revealGroups = [
    '.about-section .row > [class*="col-"]',
    '.services-section > .container > div:first-child',
    '.service-card', '.services-img-wrapper',
    '.projects-section .row > [class*="col-"]',
    '.inquiry-alt-section .row > .col-lg-5', '.glass-form-card'
  ];
  const reveals = [...document.querySelectorAll(revealGroups.join(','))];
  reveals.forEach((element, index) => {
    element.classList.add('lab-reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
  });
  let revealObserver;
  function configureReveals() {
    revealObserver?.disconnect();
    document.body.classList.remove('lab-motion');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(element => revealObserver.observe(element));
    document.body.classList.add('lab-motion');
  }
  reducedMotion.addEventListener('change', configureReveals);
  configureReveals();

  // The project slideshow starts automatically and keeps moving on hover.
  if (!window.jQuery || !window.jQuery.fn.owlCarousel) {
    document.querySelectorAll('.slider-btn').forEach(button => { button.hidden = true; });
    return;
  }
  const $ = window.jQuery;
  const carousel = $('.projects-carousel');
  let dragging = false;
  carousel.owlCarousel({
    loop: true, margin: 20, nav: false, dots: false,
    autoplay: !reducedMotion.matches, autoplayTimeout: 4000,
    autoplayHoverPause: false, smartSpeed: reducedMotion.matches ? 0 : 450,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 1200: { items: 3 } }
  });
  function syncCarousel() {
    const stop = reducedMotion.matches || document.hidden || dragging;
    carousel.trigger(stop ? 'stop.owl.autoplay' : 'play.owl.autoplay', [4000]);
  }
  document.querySelector('.custom-next-btn').addEventListener('click', () => carousel.trigger('next.owl.carousel', [reducedMotion.matches ? 0 : 450]));
  document.querySelector('.custom-prev-btn').addEventListener('click', () => carousel.trigger('prev.owl.carousel', [reducedMotion.matches ? 0 : 450]));
  carousel.on('drag.owl.carousel', () => { dragging = true; syncCarousel(); });
  carousel.on('dragged.owl.carousel', () => { dragging = false; syncCarousel(); });
  document.addEventListener('visibilitychange', syncCarousel);
  reducedMotion.addEventListener('change', () => {
    carousel.data('owl.carousel').settings.smartSpeed = reducedMotion.matches ? 0 : 450;
    syncCarousel();
  });
  syncCarousel();
})();
