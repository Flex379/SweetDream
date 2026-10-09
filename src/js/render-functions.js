import { refs } from './dessert-list.js';
import iconsUrl from '../img/icons.svg?url';

export function renderCategories(categories) {
    // Render category select options and buttons
    const allCategories = [{ _id: '', name: 'Всі десерти' }, ...categories];

    const options = allCategories.map(({ name, _id }) =>
        `<option value="${_id}">${name}</option>`).join('');
    refs.categorySelect.innerHTML = options;

    const buttons = allCategories
        .map(category =>
            `<li class="categories-item">
                    <button class="category-btn" type="button" data-category="${category._id}">${category.name}</button>
                </li>`)
        .join('');

    refs.categoryButtons.innerHTML = buttons;
    const firstCategoryBtn = document.querySelector('.category-btn');
    firstCategoryBtn.classList.add('category-btn--active');
}

export function renderProducts(products) {
    const markup = products.desserts
        .map(({ _id, image, name, description, price, category }) => `
    <li class="dessert-item">
        <img class="dessert-image" src="${image}" alt="${name}" loading="lazy" />

        <p class="dessert-category">${category.name}</p>
        <h3 class="dessert-name">${name}</h3>
        <p class="dessert-description">${description}</p>
        <div class="dessert-actions">
            <p class="dessert-price">${price} грн</p>

            <button class="order-btn" type="button" data-id="${_id}">
            <svg class="order-btn-icon" width="24" height="24" aria-hidden="true">
                <use href="${iconsUrl}#arrow-outward"></use>
            </svg>
            </button>
        </div>
        
      </li>`
        )
        .join('');
    refs.dessertList.insertAdjacentHTML('beforeend', markup);
}

export const clearDessertList = () => {
    refs.dessertList.innerHTML = '';
};





export function showLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

