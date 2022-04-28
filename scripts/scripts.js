'use strict'; // Включаем строгий режим


const contentPage = document.querySelector('.content'); // Контентная часть


const elementTemplate = document.querySelector('.element-template'); // Шаблон элемента

const elements = contentPage.querySelector('.elements'); //Директория для вставки элементов

const profile = contentPage.querySelector('.profile'); // Находим секцию профиля
const profileMain = profile.querySelector('.profile__main'); // Контентный блок профиля


const profileInfo = contentPage.querySelector('.profile__info'); //Поля ввода профиля
const profileName = profileInfo.querySelector('.profile__name'); // Имя профиля
const profileDescription = profileInfo.querySelector('.profile__description'); // Описание



const addPopup = document.querySelector('#addPop-up'); // Добавление элементов
const addForm = addPopup.querySelector('.pop-up__container'); // форма добавления элемента
const addCardName = addPopup.querySelector('.pop-up__item_data_name'); // Поле ввода названия
const addCardDescription = addPopup.querySelector('.pop-up__item_data_description'); //Поле ввода ссылки на фото
const profileAddButton = profile.querySelector('.profile__add-button'); // Добавление профиля
const popupSubmitButton = addForm.querySelector('.pop-up__submit')//добавление кнопки сабмит 



const editPopup = document.querySelector('#editPop-up'); // Редактирование профиля
const editForm = editPopup.querySelector('.pop-up__container'); //Форма редактирования профиля
const editCardName = editPopup.querySelector('.pop-up__item_data_name'); // Поле ввода редактирования имени профиля
const editCardDescription = editPopup.querySelector('.pop-up__item_data_description'); //Поле ввода редактирования описания профиля
const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля


const openImage = document.querySelector('#OpenImage'); // Форма открытия изображения
const fullScreenImage = openImage.querySelector('.pop-up__fullscreen-image'); // Изображение
const fullscreenImageDescription = openImage.querySelector('.pop-up__image-description'); // Описание изображения
const allPopup = document.querySelectorAll('.pop-up'); // Все окна

 //Массив с контентом
 const сontentElements = 
[ {name: 'Архыз', link: './images/Arkhyz.jpg'},
  {name: 'Домбай', link: './images/dombai.jpg'},
  {name: 'Карачаево-Черкессия', link: './images/karachaevsk.jpg'},
  {name: 'Ростов-на-Дону', link: './images/Rostov.jpeg'},
  {name: 'Ставрополь', link: './images/stavropol.jpg'},
  {name: 'Эльбрус', link: './images/elbrus.jpg'},
];


//функция открытия карточки
function openPopup(popup) {
    popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', closeEsc);
}
  
//Функция закрытия карточки
function closePopup(popup) {
  popup.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closeEsc);
}

// Функция закрытия клавишей ESC
function closeEsc(evt) {
  if (evt.key === "Escape") {
    let openedPopup = document.querySelector('.pop-up_opened')
    closePopup(openedPopup);
  }
}

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

  
//Добавление элементов
function createElement(initialElement) {
    const initialElements = elementTemplate.content.cloneNode(true); // Клонирование элемента
    const imageElement = initialElements.querySelector('.element__image'); // Изображение элемента
    initialElements.querySelector('.element__title').textContent = initialElement.name; // Имя элемента
    imageElement.src = initialElement.link; // Ссылка на изображение
    imageElement.alt = initialElement.name; // Альтернатива при ошибке загрузки фото

    // Кнопка лайка
    initialElements
    .querySelector('.element__button-like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button-like_active'); 
    });                

    // Удаление элемента           
    initialElements
    .querySelector('.element__button-delete')
    .addEventListener('click', (evt) => {
      const elementItem = evt.target.closest('.element');    
      elementItem.remove();
    });

    // Окно с изображением
    initialElements
    .querySelector('.element__image')
    .addEventListener('click', (evt) => {
      const elementLink = evt.target.src;                     
      const elementName = evt.target.closest('.element');
      const elementText = elementName.querySelector('.element__title').textContent;
      
      openPopup(openImage);  // Открытие окна с фото
    
    // Присвоение ссылки картинке
      fullScreenImage.src = elementLink;
      fullscreenImageDescription.textContent = elementText;         
      fullScreenImage.alt = elementText;
    });

    return initialElements;
}



// Вставка элемента в DOM-дерево
function addElement(initialElement) {
    elements.prepend(createElement(initialElement));
}

// Рендер массива
const reverseElements = сontentElements.reverse();
сontentElements.forEach(addElement);



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

  


//Валидация форм
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  inactiveButtonClass: 'pop-up__submit_disabled',
  inputErrorClass: 'pop-up__item_error',
  errorClass: 'pop-up__error-item_active',
  formSelector: '.pop-up__container',
  inputSelector: '.pop-up__item',
  submitButtonSelector: '.pop-up__submit',
});


