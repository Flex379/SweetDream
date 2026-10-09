import {
  closeDesertDetailsModal,
  currentDessertId,
  openDesertDetailsModal,
} from './dessert-details-modal';
import { createOrder } from './desserts-api';
import { showTost } from './helpers';
import {
  getOrderFormData,
  removeOrderFormData,
  saveOrderFormData,
} from './storage';

const orderModalRefs = {
  form: document.querySelector('.order-form'),
  orderModal: document.querySelector('.order'),
  submitBtn: document.querySelector('.order-submit-btn'),
  closeBtn: document.querySelector('.order-modal-close'),
  phoneInput: document.querySelector('#phone'),
};

function initOrderModal() {
  restoreFormData();
  const refs = orderModalRefs;
  refs.closeBtn.addEventListener('click', () => {
    closeOrderModal();
    openDesertDetailsModal();
  });
  refs.form.addEventListener('submit', handleOrderSubmit);
  refs.form.addEventListener('input', handleFormInput);

  refs.phoneInput.addEventListener('input', handlePhoneInput);
}

export function openOrderModal() {
  const refs = orderModalRefs;
  refs.orderModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  window.addEventListener('keydown', handleOrderEscPress);
  refs.orderModal.addEventListener('click', handleOrderBackDropClick);
}

export function closeOrderModal() {
  const refs = orderModalRefs;
  refs.orderModal.classList.remove('is-open');
  document.body.style.overflow = '';

  window.removeEventListener('keydown', handleOrderEscPress);
  refs.orderModal.removeEventListener('click', handleOrderBackDropClick);
}

function handlePhoneInput(e) {
  let value = e.target.value.replace(/\D/g, '');
  value = value.slice(0, 12);

  let formatted = '';

  if (value.length > 0) {
    formatted += value.substring(0, 2);
  }

  if (value.length > 2) {
    formatted += ' ' + value.substring(2, 5);
  }

  if (value.length > 5) {
    formatted += ' ' + value.substring(5);
  }

  e.target.value = formatted;
}

function handleFormInput(event) {
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  saveOrderFormData(data);
}

async function handleOrderSubmit(event) {
  console.log('submit');
  event.preventDefault();
  const form = event.target;

  validateForm();

  if (form.checkValidity()) {
    const formData = Object.fromEntries(new FormData(form));
    formData.dessertId = currentDessertId;
    formData.phone = removeSpacesFromPhone(formData.phone);
    console.log(formData);
    try {
      let result = await createOrder(formData);
      showTost(
        `Замовлення ${result.orderNum} було успішно створене`,
        'success'
      );
      form.reset();
      closeOrderModal();
      closeDesertDetailsModal();
      removeOrderFormData();
    } catch (error) {
      console.log(`Помилка оформлення замовлення ${error}`);
      showTost(`Помилка оформлення замовлення ${error}`, 'error');
    }
  }
}

function handleOrderEscPress(event) {
  if (event.code === 'Escape') {
    closeOrderModal();
    openDesertDetailsModal();
  }
}

function handleOrderBackDropClick(event) {
  if (event.currentTarget === event.target) {
    closeOrderModal();
    openDesertDetailsModal();
  }
}

function validateForm() {
  orderModalRefs.form.classList.add('was-validated');
  const inputs = orderModalRefs.form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    const error = input.nextElementSibling;

    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        error.textContent = 'Це поле обов’язкове';
      } else if (input.validity.tooShort) {
        error.textContent = `Мінімум ${input.minLength} символів`;
      } else if (input.validity.tooLong) {
        error.textContent = `Максимум ${input.maxLength} символів`;
      } else if (input.validity.typeMismatch) {
        error.textContent = 'Введіть коректну адресу електронної пошти';
      } else if (input.validity.patternMismatch) {
        error.textContent = 'Неправильний формат';
      }
    } else {
      error.textContent = 'Поле заповнено правильно';
    }
  });
}

function removeSpacesFromPhone(phone) {
  return phone.replace(/\s/g, '');
}

function restoreFormData() {
  const form = orderModalRefs.form;
  const savedData = getOrderFormData();
  if (savedData) {
    for (const field of form.elements) {
      if (!field.name || !(field.name in savedData)) {
        continue;
      }
      field.value = savedData[field.name];
    }
  }
}

initOrderModal();
