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
  allPopups,
  popupSubmitButton
} from './data.js';
import { addElement, cardRender } from './card';
import { сontentElements } from './сontentElements.js';
import { enableValidation } from './validation.js';

import { closePopup, openPopup, closePopupsRelease } from './utils.js';

cardRender(сontentElements);
closePopupsRelease();


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
popupSubmitButton.classList.add('pop-up__submit_disabled');
  popupSubmitButton.disabled = true;
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


