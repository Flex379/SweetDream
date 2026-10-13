const burgerButton = document.querySelector('.burger-button');
const closeButton = document.querySelector('.mobile-menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll(
  '.mobile-nav-link, .mobile-nav-button'
);
const header = document.querySelector('.header');

function openMenu() {
  mobileMenu.classList.add('is-open');
  mobileMenu.removeAttribute('inert');
  mobileMenu.setAttribute('aria-hidden', 'false');

  document.body.classList.add('menu-open');
  burgerButton.setAttribute('aria-expanded', 'true');

  closeButton.focus();

  document.addEventListener('keydown', handleEscape);
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('inert', '');
  mobileMenu.setAttribute('aria-hidden', 'true');

  document.body.classList.remove('menu-open');
  burgerButton.setAttribute('aria-expanded', 'false');

  document.removeEventListener('keydown', handleEscape);

  burgerButton.focus();
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

burgerButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

function handleHeaderScroll() {
  header.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', handleHeaderScroll, {
  passive: true,
});

handleHeaderScroll();
