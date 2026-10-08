import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.about-us-swiper', {
  modules: [Navigation, Pagination],

  enabled: false,

  slidesPerView: 1,
  spaceBetween: 24,

  navigation: {
    nextEl: '.about-us-button-next',
    prevEl: '.about-us-button-prev',
  },

  pagination: {
    el: '.about-us-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      enabled: true,
      slidesPerView: 2,
      spaceBetween: 24,
    },

    1440: {
      enabled: true,
      slidesPerView: 2,
      spaceBetween: 24,
    },
  },
});
