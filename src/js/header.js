const burgerButton = document.querySelector('.burger-button');

const closeButton = document.querySelector('.mobile-menu-close');

const mobileMenu = document.querySelector('.mobile-menu');

const mobileLinks = document.querySelectorAll(
  '.mobile-nav-link, .mobile-nav-button'
);

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

function openMenu() {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('menu-open');
  burgerButton.setAttribute('aria-expanded', 'true');

  document.addEventListener('keydown', handleEscape);
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  burgerButton.setAttribute('aria-expanded', 'false');

  document.removeEventListener('keydown', handleEscape);
}

burgerButton.addEventListener('click', openMenu);

closeButton.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

const header = document.querySelector('.header');

function handleHeaderScroll() {
  header.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', handleHeaderScroll, {
  passive: true,
});

handleHeaderScroll();
