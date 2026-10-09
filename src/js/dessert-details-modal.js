import Raty from 'raty-js';
import 'raty-js/src/raty.css';
import { getDessertById } from './desserts-api';
import { openOrderModal } from './order-modal';

const dessertDetailsRefs = {
  dessertDetailsModal: document.querySelector('.dessert-details'),

  img: document.querySelector('.dessert-details-img'),
  title: document.querySelector('.dessert-details-title'),
  priceNumber: document.querySelector('.dessert-details-price-number'),
  rating: document.querySelector('.dessert-details-rating'),
  description: document.querySelector('.dessert-details-description'),
  compositionValue: document.querySelector(
    '.dessert-details-composition-value'
  ),

  orderBtn: document.querySelector('.dessert-details-btn'),
  closeBtn: document.querySelector('.dessert-details-close'),

  orderModal: document.querySelector('.order'),
};

export let currentDessertId = '6852a9fcb459460cb6b47720';

const dessertRating = createDessertRatingObject();
dessertRating.init();

export function populateDessertDetailsModal({
  composition,
  description,
  image,
  name,
  price,
  rate,
}) {
  let refs = dessertDetailsRefs;

  refs.img.src = image;
  refs.title.textContent = name;
  refs.priceNumber.textContent = price;
  refs.description.textContent = description;
  refs.compositionValue.textContent = composition;

  dessertRating.setScore(rate);
}

function createDessertRatingObject() {
  return new Raty(dessertDetailsRefs.rating, {
    halfShow: true,
    starType: 'i',
  });
}

export function clearDessertDetailsModal() {
  populateDessertDetailsModal({
    composition: '',
    description: '',
    image: '',
    name: '',
    price: '',
    rate: 0,
    _id: '',
  });
}

export async function handleOpenDessertDetailsModal() {
  clearDessertDetailsModal();

  const dessert = await getDessertById('6852a9fcb459460cb6b47720');
  populateDessertDetailsModal(dessert);
  openDessertDetailsModal();
}

export function openDessertDetailsModal() {
  const refs = dessertDetailsRefs;
  refs.dessertDetailsModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  window.addEventListener('keydown', handleEscPress);
  refs.closeBtn.addEventListener('click', closeDessertDetailsModal);
  refs.dessertDetailsModal.addEventListener('click', handleBackDropClick);
  refs.orderBtn.addEventListener('click', handleOpenOrderModalClick);
}

export function closeDessertDetailsModal() {
  const refs = dessertDetailsRefs;
  refs.dessertDetailsModal.classList.remove('is-open');
  document.body.style.overflow = '';

  window.removeEventListener('keydown', handleEscPress);
  refs.closeBtn.removeEventListener('click', closeDessertDetailsModal);

  refs.dessertDetailsModal.removeEventListener('click', handleBackDropClick);
}

function handleOpenOrderModalClick() {
  closeDessertDetailsModal();
  openOrderModal();
}

function handleEscPress(event) {
  if (event.code === 'Escape') {
    closeDessertDetailsModal();
  }
}

function handleBackDropClick(event) {
  if (event.currentTarget === event.target) {
    closeDessertDetailsModal();
  }
}

// handleOpenDessertDetailsModal();
