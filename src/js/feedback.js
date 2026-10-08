import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getFeedbacks } from './desserts-api.js';

const feedbackList = document.querySelector('.feedback-list');
const feedbackSection = document.querySelector('.feedback');

if (feedbackList && feedbackSection) {
  initFeedback();
}

async function initFeedback() {
  feedbackSection.setAttribute('aria-busy', 'true');

  try {
    const response = await getFeedbacks();
    const feedbacks = Array.isArray(response)
      ? response
      : response.data ?? response.feedbacks ?? response.results ?? [];

    if (!feedbacks.length) {
      throw new Error('No feedbacks received');
    }

    feedbackList.innerHTML = feedbacks
      .map(createFeedbackCard)
      .join('');

    new Swiper('.feedback-swiper', {
      modules: [Navigation, Pagination, A11y],
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 400,
      watchOverflow: true,

      navigation: {
        nextEl: '.feedback-button-next',
        prevEl: '.feedback-button-prev',
      },

      pagination: {
        el: '.feedback-pagination',
        clickable: true,
      },

      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити відгуки. Спробуйте пізніше.',
      position: 'topRight',
    });
  } finally {
    feedbackSection.removeAttribute('aria-busy');
  }
}

function createFeedbackCard(feedback) {
  const name = escapeHtml(
    feedback.name ?? feedback.author ?? feedback.userName ?? 'Клієнт'
  );

  const text = escapeHtml(
    feedback.description ?? feedback.comment ?? feedback.text ?? ''
  );

  const rating = Math.max(
    0,
    Math.min(5, Number(feedback.rate ?? feedback.rating ?? 0) || 0)
  );

  return `
    <li class="swiper-slide feedback-card">
      <div class="feedback-stars"
           role="img"
           aria-label="Рейтинг: ${rating} з 5">
        ${createStars(rating)}
      </div>
      <p class="feedback-text">${text}</p>
      <p class="feedback-author">${name}</p>
    </li>
  `;
}

function createStars(rating) {
  return Array.from({ length: 5 }, (_, index) => {
    const fill = Math.max(0, Math.min(1, rating - index)) * 100;

    return `
      <svg width="20" height="20"
           viewBox="0 0 24 24"
           aria-hidden="true">
        <defs>
          <linearGradient id="feedback-star-${index}-${Math.round(rating * 10)}">
            <stop offset="${fill}%" stop-color="#080c0c"/>
            <stop offset="${fill}%" stop-color="#d0cbc8"/>
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill="url(#feedback-star-${index}-${Math.round(rating * 10)})"
        />
      </svg>
    `;
  }).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char];
  });
}