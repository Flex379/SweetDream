import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getDessertById, getPopularDesserts } from './desserts-api';
import {
  clearDessertDetailsModal,
  openDessertDetailsModal,
  populateDessertDetailsModal,
} from './dessert-details-modal';
import { getOptimizedImageUrl } from './image-proxy.js';
import iconsUrl from '../img/icons.svg?url';

const refs = {
  productsList: document.querySelector('.popular-products-wrapper'),
};

async function initSection() {
  intitSwiper();
  try {
    const { desserts } = await getPopularDesserts();
    renderProducts(desserts);
  } catch (err) {
    console.log(`Помилка ініціалізації секції Наші Бестселлери Home ${err}`);
  }
}

function intitSwiper() {
  var swiper = new Swiper('.popular-products-swiper', {
    slidesPerView: 1,
    speed: 250,
    pagination: {
      el: '.popular-products-pugination',
      dynamicBullets: true,
      clickable: true,
    },
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.popular-products-btn-next',
      prevEl: '.popular-products-btn-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

refs.productsList.addEventListener('click', handleOpenDessertDetailsModal);

async function handleOpenDessertDetailsModal(event) {
  const orderButton = event.target.closest('.order-btn');
  if (!orderButton) return;

  clearDessertDetailsModal();
  try {
    const dessert = await getDessertById(orderButton.dataset.id);
    populateDessertDetailsModal(dessert);
    openDessertDetailsModal();
  } catch (error) {
    console.error('Помилка відкривання деталей продукту', error);
  }
}

export function renderProducts(desserts) {
  const markup = desserts
    .map(
      ({ _id, image, name, description, price, category }) => `
    <li class="popular-products-item swiper-slide">
        <img class="popular-dessert-image" src="${getOptimizedImageUrl(image, 640)}" alt="${name}" loading="lazy" decoding="async" />
        <p class="popular-dessert-category">${category.name}</p>
        <h3 class="popular-dessert-name">${name}</h3>
        <p class="popular-dessert-description">${description}</p>
        <div class="popular-dessert-actions">
            <p class="popular-dessert-price">${price} грн</p>

            <button class="order-btn" type="button" data-id="${_id}">
              <svg class="order-btn-icon" width="24" height="24" aria-hidden="true">
                  <use href="${iconsUrl}#arrow-outward"></use>
              </svg>
            </button>
        </div>
        
      </li>`
    )
    .join('');
  refs.productsList.innerHTML = markup;
}

initSection();
