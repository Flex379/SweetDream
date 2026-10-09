import { getCategories, getDessertsByCategory, getDesserts, getDessertById } from './desserts-api.js';
import { renderCategories, renderProducts, clearDessertList, showLoadMoreBtn, hideLoadMoreBtn } from './render-functions.js';
import { DESSERTS_PER_PAGE } from './constants.js';
import { clearDessertDetailsModal, populateDessertDetailsModal, openDessertDetailsModal } from './dessert-details-modal.js';

export const refs = {
    categorySelect: document.querySelector('.category-select'),
    categoryButtons: document.querySelector('.category-buttons'),
    dessertList: document.querySelector('.dessert-list'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
}

let currentPage = 1;


document.addEventListener('DOMContentLoaded', async event => {
    const categories = await getCategories();
    renderCategories(categories);
    hideLoadMoreBtn();

    applyCategory('');
});


refs.categorySelect.addEventListener('change', event => {
    currentPage = 1;
    clearDessertList();
    hideLoadMoreBtn();
    applyCategory(event.target.value);

    refs.categoryButtons.querySelector('.category-btn--active')?.classList.remove('category-btn--active');
    refs.categoryButtons.querySelector(`[data-category="${event.target.value}"]`)?.classList.add('category-btn--active');
});

refs.categoryButtons.addEventListener('click', event => {
    currentPage = 1;
    hideLoadMoreBtn();
    const button = event.target.closest('[data-category]');
    if (!button) return;

    const activeButton = document.querySelector('.category-btn--active');
    if (activeButton) {
        activeButton.classList.remove('category-btn--active');
    }
    button.classList.add('category-btn--active');

    clearDessertList();
    refs.categorySelect.value = button.dataset.category;
    applyCategory(button.dataset.category);
});

refs.loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    const activeCategory = refs.categorySelect.value;
    applyCategory(activeCategory, currentPage);
});

refs.dessertList.addEventListener('click', async event => {
    const orderButton = event.target.closest('.order-btn');
    if (!orderButton) return;

    // Add your order button click handling logic here

    console.log('Order button clicked:', orderButton);

    clearDessertDetailsModal();

    const dessert = await getDessertById(orderButton.dataset.id);
    populateDessertDetailsModal(dessert);
    openDessertDetailsModal();
});

async function applyCategory(category, currentPage = 1) {
    let desserts;
    if (category) {
        desserts = await getDessertsByCategory(category, currentPage);
    } else {
        desserts = await getDesserts(currentPage);
    }

    if (Math.ceil(desserts.totalItems / DESSERTS_PER_PAGE) > currentPage + 1) {
        showLoadMoreBtn();
    } else {
        hideLoadMoreBtn();
    }

    renderProducts(desserts);
}