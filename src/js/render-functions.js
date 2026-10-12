import { refs } from './dessert-list.js';
import { getOptimizedImageUrl } from './image-proxy.js';
import iconsUrl from '../img/icons.svg?url';

let imageBatchVersion = 0;
let pendingImageBatches = 0;

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

export async function renderProducts(products) {
    const batchVersion = imageBatchVersion;
    const firstNewItemIndex = refs.dessertList.children.length;
    const markup = products.desserts
        .map(({ _id, image, name, description, price, category }, index) => `
    <li class="dessert-item" style="--reveal-index: ${index}">
        <img class="dessert-image" src="${getOptimizedImageUrl(image, 640)}" alt="${name}" loading="lazy" decoding="async" />

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

    const images = Array.from(refs.dessertList.querySelectorAll('.dessert-image'))
        .slice(firstNewItemIndex);
    if (images.length === 0) return;

    refs.dessertLoader.classList.remove('is-hidden');
    pendingImageBatches += 1;

    await Promise.all([
        new Promise(resolve => window.setTimeout(resolve, 500)),
        Promise.all(images.map(image => new Promise(resolve => {
            if (image.complete) {
                resolve();
                return;
            }

            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
        }))),
    ]);

    if (batchVersion !== imageBatchVersion) return;

    pendingImageBatches -= 1;
    if (pendingImageBatches === 0) {
        refs.dessertLoader.classList.add('is-hidden');
    }
}

export const clearDessertList = () => {
    imageBatchVersion += 1;
    pendingImageBatches = 0;
    refs.dessertLoader.classList.add('is-hidden');
    refs.dessertList.innerHTML = '';
};





export function showLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

