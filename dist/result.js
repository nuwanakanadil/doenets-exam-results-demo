const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mainNav = document.querySelector('.main-nav');
const siteHeader = document.querySelector('.site-header');
const returnToTop = document.querySelector('#return-to-top');
const printButton = document.querySelector('#print-result');

const subjectSets = {
  al: [
    ['CAT PHYSICS', 'A'],
    ['CAT CHEMISTRY', 'A'],
    ['CAT BIOLOGY', 'A'],
    ['COMMON CAT TEST', '075'],
    ['GENERAL MEOW', 'A']
  ],
  ol: [
    ['BUDDHISM', 'A'],
    ['SINHALA LANGUAGE & LITERATURE', 'A'],
    ['ENGLISH LANGUAGE', 'A'],
    ['MATHEMATICS', 'A'],
    ['HISTORY', 'A'],
    ['SCIENCE', 'A'],
    ['BUSINESS & ACCOUNTING STUDIES', 'A'],
    ['INFORMATION & COMMUNICATION TECHNOLOGY', 'A'],
    ['ART', 'A']
  ],
  grade5: [['TOTAL MARKS', '185']]
};

const examNames = {
  al: 'G.C.E. (A/L) EXAMINATION',
  ol: 'G.C.E. (O/L) EXAMINATION',
  grade5: 'GRADE 5 SCHOLARSHIP EXAMINATION'
};

let context = {};
try {
  context = JSON.parse(sessionStorage.getItem('demoResultContext') || '{}');
} catch (_) {
  context = {};
}

const exam = subjectSets[context.exam] ? context.exam : 'al';
const year = /^20\d{2}$/.test(context.year || '') ? context.year : '2025';
const examName = examNames[exam];

document.querySelector('#result-exam').textContent = examName;
document.querySelector('#result-year').textContent = year;
document.querySelector('#info-exam').textContent = examName;
document.querySelector('#info-year').textContent = year;
document.querySelector('#info-index').textContent = exam === 'ol' ? '00000000' : '0000000';

if (exam !== 'al') {
  document.querySelectorAll('.al-only').forEach((row) => row.remove());
}

document.querySelector('#subject-list').innerHTML = subjectSets[exam]
  .map(([subject, result]) => `<li><span><i aria-hidden="true">›</i> ${subject}</span><strong>${result}</strong></li>`)
  .join('');

function updateNavigation() {
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

printButton.addEventListener('click', () => window.print());
returnToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
