# Sweet Dream

Sweet Dream is a responsive, single-page storefront for a small dessert shop. It introduces the bakery and its products, helps visitors browse desserts by category, and lets them submit an order request for a selected item. The experience brings the catalog, product information, customer reviews, and ordering flow together in one place.

## Features

- **Shop introduction:** hero section, bakery story, and responsive photo gallery.
- **Popular desserts:** featured products shown in a responsive carousel.
- **Dessert catalog:** API-loaded products with category filters, pagination through a “load more” button, and an image-loading indicator.
- **Product details:** a modal with the dessert image, description, ingredients, price, and rating.
- **Order requests:** a form linked to the selected dessert, with browser-based validation, phone number formatting, and success or error notifications. In-progress form values are saved in local storage and restored when the page is reopened.
- **Customer feedback:** API-loaded reviews with star ratings in a responsive carousel.
- **FAQ:** expandable questions and answers.
- **Responsive navigation and imagery:** mobile menu, breakpoint-specific hero and gallery images, lazy-loaded product images, and optimized remote product images.

## Tech Stack

- **Application:** HTML, CSS, and vanilla JavaScript using ES modules.
- **Build and development:** Vite 5, with HTML partial injection, full reload for partial changes, and mobile-first media-query sorting.
- **API requests:** Axios, using the Sweet Dream dessert store API at `https://deserts-store.b.goit.study/api`.
- **Interactive UI:** Swiper for carousels, Accordion JS for FAQ items, Raty for product ratings, and iziToast for notifications.
- **Images and typography:** WebP image assets, the weserv.nl image proxy for remote image resizing and conversion, and the Nunito font from Google Fonts.
- **Deployment:** GitHub Actions builds the site and publishes `dist` to the `gh-pages` branch on pushes to `main`.

## Run Locally

Requirements: Node.js (LTS recommended) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build using the `/SweetDream/` base path for GitHub Pages. |
| `npm run build:local` | Create a production build using `/` as the base path. |
| `npm run preview` | Preview the production build locally. |

## Project Structure

```text
src/
  index.html          Main page and partial assembly
  main.js             JavaScript entry point
  partials/           Header, hero, catalog, reviews, modals, and other sections
  js/                 API, rendering, and feature modules
  css/                Global and section-specific stylesheets
  img/                Icons and responsive image assets
assets/               Repository and project assets
.github/workflows/    GitHub Pages deployment workflow
```

The page is assembled from HTML partials in `src/partials/`. Feature behavior lives in separate modules in `src/js/`, while styles are organized under `src/css/`.

## API Integration

The frontend uses the dessert store API to retrieve categories, desserts, popular desserts, individual dessert details, and customer feedback. Order forms are submitted to the API's orders endpoint. Catalog and review requests use pagination; desserts can also be requested by category.

## Deployment

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main`, installs dependencies, runs `npm run build`, and deploys the generated `dist` directory to `gh-pages`. The build base path is configured as `/SweetDream/` in `package.json` for the GitHub Pages project URL.