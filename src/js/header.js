const burgerButton = document.querySelector('.burger-button');
const closeButton = document.querySelector('.mobile-menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll(
  '.mobile-nav-link, .mobile-nav-button'
);

function openMenu() {
  mobileMenu.classList.add('is-open');

  document.body.classList.add('menu-open');

  burgerButton.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');

  document.body.classList.remove('menu-open');

  burgerButton.setAttribute('aria-expanded', 'false');
}

burgerButton.addEventListener('click', openMenu);

closeButton.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});
