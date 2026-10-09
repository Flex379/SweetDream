import { STORAGE_KEYS } from './constants';

export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`Помилка читання з LocalStorage ${err.message}`);
    return null;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Помилка запису в LocalStorage ${err.message}`);
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

export function getOrderFormData() {
  return getFromStorage(STORAGE_KEYS.ORDER_FORM_DATA);
}

export function saveOrderFormData(order) {
  saveToStorage(STORAGE_KEYS.ORDER_FORM_DATA, order);
}

export function removeOrderFormData() {
  removeFromStorage(STORAGE_KEYS.ORDER_FORM_DATA);
}
