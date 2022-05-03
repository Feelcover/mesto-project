import '../pages/index.css';
import {
  profileName,
  profileDescription,
  addPopup,
  addForm,
  addCardName,
  addCardDescription,
  profileAddButton,
  editPopup,
  editForm,
  editCardName,
  editCardDescription,
  editButton,
  allPopup
} from './data.js';
import { addElement, cardRender } from './card';
import { сontentElements } from './сontentElements.js';
import { enableValidation } from './validation.js';

import { closePopup, openPopup } from './modal.js';

cardRender(сontentElements);

//Закрытие окон
allPopup.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_opened')) {
      closePopup(popup);
    }
  });
  popup.addEventListener('click', (evt) => {
    if (evt.target.closest('.pop-up__close')) {
      closePopup(popup);
    }
  });
});

// Сохранение профиля
editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // Заполнение полей введенными данными
    profileName.textContent = editCardName.value;
    profileDescription.textContent = editCardDescription.value;
    closePopup(editPopup);
  });


//Добавление карточки
addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

// Создание объекта
    const newElement = {
      name: addCardName.value,
      link: addCardDescription.value,
    };

// Вызов функции добавления карточки
    addElement(newElement);
    addForm.reset();
    //закрытие попапа
    closePopup(addPopup);
  });

// Кнопка редактирования профиля
editButton.addEventListener('click', function () {
  editCardName.value = profileName.textContent;
  editCardDescription.value = profileDescription.textContent;
  openPopup(editPopup);
});


// Кнопка добавления карточки
profileAddButton.addEventListener('click', function () {
  openPopup(addPopup);
});

enableValidation({
  inactiveButtonClass: 'pop-up__submit_disabled',
  inputErrorClass: 'pop-up__item_error',
  errorClass: 'pop-up__error-item_active',
  formSelector: '.pop-up__container',
  inputSelector: '.pop-up__item',
  submitButtonSelector: '.pop-up__submit',
});


