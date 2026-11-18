const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mainNav = document.querySelector('.main-nav');
const siteHeader = document.querySelector('.site-header');
const returnToTop = document.querySelector('#return-to-top');
const form = document.querySelector('#lookup-form');
const message = document.querySelector('#form-message');
const examSelect = document.querySelector('#exam');
const yearSelect = document.querySelector('#year');
const searchType = document.querySelector('#search-type');
const queryInput = document.querySelector('#query');
const captchaCheckbox = document.querySelector('#captcha-checkbox');
const captchaChallenge = document.querySelector('#captcha-challenge');
const captchaQuestion = document.querySelector('#captcha-question');
const captchaAnswerInput = document.querySelector('#captcha-answer');
const captchaError = document.querySelector('#captcha-error');
const captchaVerify = document.querySelector('#captcha-verify');
const captchaCancel = document.querySelector('#captcha-cancel');

let captchaExpectedAnswer = 0;
let captchaVerified = false;
let navStickPoint = 0;

const indexPlaceholders = {
  al: 'Enter Your AL index',
  ol: 'Enter Your OL index',
  grade5: 'Enter Your Grade 5 index'
};

function updateSearchInput() {
  const hasExam = Boolean(examSelect.value);
  const hasYear = Boolean(yearSelect.value);
  const useNic = searchType.value === 'NIC';

  queryInput.disabled = !(hasExam && hasYear);
  queryInput.placeholder = useNic
    ? 'Enter Your NIC number'
    : (indexPlaceholders[examSelect.value] || 'Search By ...');

  queryInput.maxLength = useNic
    ? 12
    : (examSelect.value === 'ol' ? 8 : 7);
}

function measureNavigation() {
  mainNav.classList.remove('is-stuck');
  siteHeader.classList.remove('nav-stuck');
  navStickPoint = 280;
  siteHeader.style.setProperty('--nav-space', `${mainNav.offsetHeight}px`);
  updateNavigationState();
}

function updateNavigationState() {
  const isStuck = window.scrollY >= navStickPoint;
  mainNav.classList.toggle('is-stuck', isStuck);
  siteHeader.classList.toggle('nav-stuck', isStuck);
  returnToTop.hidden = window.scrollY <= 200;
}

function openCaptchaChallenge() {
  if (captchaVerified) return;

  const firstNumber = Math.floor(Math.random() * 8) + 2;
  const secondNumber = Math.floor(Math.random() * 8) + 1;
  captchaExpectedAnswer = firstNumber + secondNumber;
  captchaQuestion.textContent = `What is ${firstNumber} + ${secondNumber}?`;
  captchaAnswerInput.value = '';
  captchaError.textContent = '';
  captchaChallenge.hidden = false;
  window.setTimeout(() => captchaAnswerInput.focus(), 0);
}

function closeCaptchaChallenge() {
  captchaChallenge.hidden = true;
  captchaCheckbox.focus();
}

function verifyCaptchaAnswer() {
  if (Number(captchaAnswerInput.value) !== captchaExpectedAnswer) {
    captchaError.textContent = 'That answer is incorrect. Please try again.';
    captchaAnswerInput.select();
    return;
  }

  captchaVerified = true;
  captchaCheckbox.setAttribute('aria-checked', 'true');
  closeCaptchaChallenge();
}

function resetCaptcha() {
  captchaVerified = false;
  captchaCheckbox.setAttribute('aria-checked', 'false');
  captchaChallenge.hidden = true;
  captchaAnswerInput.value = '';
  captchaError.textContent = '';
}

examSelect.addEventListener('change', updateSearchInput);
yearSelect.addEventListener('change', updateSearchInput);
searchType.addEventListener('change', updateSearchInput);
window.addEventListener('scroll', updateNavigationState, { passive: true });
window.addEventListener('resize', measureNavigation);
window.addEventListener('load', measureNavigation);
captchaCheckbox.addEventListener('click', openCaptchaChallenge);
captchaVerify.addEventListener('click', verifyCaptchaAnswer);
captchaCancel.addEventListener('click', closeCaptchaChallenge);
returnToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

captchaAnswerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    verifyCaptchaAnswer();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !captchaChallenge.hidden) {
    closeCaptchaChallenge();
  }
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

form.addEventListener('reset', () => {
  window.setTimeout(() => {
    message.textContent = '';
    updateSearchInput();
    resetCaptcha();
  }, 0);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const exam = document.querySelector('#exam').value;
  const year = document.querySelector('#year').value;
  const query = document.querySelector('#query').value.trim();
  if (!exam || !year || !query || !captchaVerified) {
    message.textContent = 'Please complete every field and confirm the human check.';
    return;
  }

  sessionStorage.setItem('demoResultContext', JSON.stringify({
    exam,
    year,
    searchType: searchType.value
  }));
  window.location.href = 'result.html';
});

measureNavigation();
