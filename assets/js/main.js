'use strict';

// Responsive navigation
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.main-nav');
if (menuToggle && siteNav) {
  const setMenu = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航');
    siteNav.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false); });
}

// Motion is progressive enhancement: all text stays visible without JS.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealElements.forEach(element => element.classList.add('will-reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px 35px 0px' });
  revealElements.forEach(element => observer.observe(element));
}

const galleryItems = [...document.querySelectorAll('.gallery-card')];
const filters = [...document.querySelectorAll('.filter-button')];
const lightbox = document.getElementById('lightbox');
if (galleryItems.length) {
  const empty = document.getElementById('gallery-empty');
  filters.forEach(button => button.addEventListener('click', () => {
    const selection = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visibleCount = 0;
    galleryItems.forEach(item => {
      const show = selection === 'all' || item.dataset.category === selection;
      item.hidden = !show;
      if (show) visibleCount++;
    });
    if (empty) empty.hidden = visibleCount !== 0;
  }));
}

if (lightbox && galleryItems.length) {
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSubtitle = document.getElementById('lightbox-subtitle');
  const closeButton = lightbox.querySelector('.lightbox-close');
  let activeIndex = 0;
  let returnFocus = null;
  const visibleItems = () => galleryItems.filter(item => !item.hidden);
  const showItem = index => {
    const items = visibleItems();
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    const thumbnail = item.querySelector('img');
    lightboxImage.src = thumbnail.src.replace(/([?&])w=\d+/, '$1w=1600');
    lightboxImage.alt = thumbnail.alt;
    lightboxTitle.textContent = item.dataset.title;
    lightboxSubtitle.textContent = item.dataset.subtitle;
  };
  const openLightbox = item => {
    returnFocus = item;
    showItem(visibleItems().indexOf(item));
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    if (returnFocus) returnFocus.focus();
  };
  galleryItems.forEach(item => item.addEventListener('click', () => openLightbox(item)));
  closeButton.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showItem(activeIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showItem(activeIndex + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showItem(activeIndex - 1);
    if (event.key === 'ArrowRight') showItem(activeIndex + 1);
    if (event.key === 'Tab') {
      const controls = [closeButton, lightbox.querySelector('.lightbox-prev'), lightbox.querySelector('.lightbox-next')];
      const i = controls.indexOf(document.activeElement);
      if (event.shiftKey && i === 0) { event.preventDefault(); controls[2].focus(); }
      if (!event.shiftKey && i === 2) { event.preventDefault(); controls[0].focus(); }
    }
  });
}
