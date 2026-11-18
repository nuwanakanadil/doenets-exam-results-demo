const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mainNav = document.querySelector('.main-nav');
const siteHeader = document.querySelector('.site-header');
const returnToTop = document.querySelector('#return-to-top');
const slides = [...document.querySelectorAll('.hero-slide')];
const dotsWrap = document.querySelector('.hero-dots');

let currentSlide = 0;
let slideTimer;

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show slide ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index, true));
  dotsWrap.append(dot);
});

const dots = [...dotsWrap.children];

function showSlide(index, restart = false) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
  dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide));
  if (restart) startCarousel();
}

function startCarousel() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showSlide(currentSlide + 1), 4000);
}

function updateNavigationState() {
  const stuck = window.scrollY >= 280;
  mainNav.classList.toggle('is-stuck', stuck);
  siteHeader.classList.toggle('nav-stuck', stuck);
  siteHeader.style.setProperty('--nav-space', `${mainNav.offsetHeight}px`);
  returnToTop.hidden = window.scrollY <= 200;
}

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

returnToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', updateNavigationState, { passive: true });
window.addEventListener('resize', updateNavigationState);

showSlide(0);
startCarousel();
updateNavigationState();
