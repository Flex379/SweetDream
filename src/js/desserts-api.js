import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import { FEEDBACKS_PER_PAGE } from './constants';
import { DESSERTS_PER_PAGE } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getDesserts(currentPage = 1) {
  const { data } = await axios(
    `${API_ENDPOINTS.DESSERTS}?limit=${DESSERTS_PER_PAGE}&page=${currentPage}`
  );
  return data;
}

export async function getCategories() {
  const { data } = await axios(API_ENDPOINTS.CATEGORIES);
  return data;
}

export async function getDessertsByCategory(category, currentPage = 1) {
  const { data } = await axios(
    `${API_ENDPOINTS.DESSERTS}?category=${category}&limit=${DESSERTS_PER_PAGE}&page=${currentPage}`
  );
  return data;
}

export async function getFeedbacks(currentPage = 1) {
  const { data } = await axios(
    `${API_ENDPOINTS.FEEDBACKS}?limit=${FEEDBACKS_PER_PAGE}&page=${currentPage}`
  );
  return data;
}

export async function getDessertById(dessertId) {
  const { data } = await axios(`${API_ENDPOINTS.DESSERT_BY_ID}${dessertId}`);
  return data;
}

export async function createOrder(newOrderBody) {
  const { data } = await axios.post(`${API_ENDPOINTS.ORDERS}`, newOrderBody);
  return data;
}
