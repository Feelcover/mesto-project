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

//Закрытие окон кликом на оверлей
allPopup.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_opened')) {
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


// Закрыть окно редактирования
const editClose = editPopup.querySelector('.pop-up__close');
editClose.addEventListener('click', (evt) => {
  closePopup(editPopup);
});

// Закрыть окно добавления
const addClose = addPopup.querySelector('.pop-up__close');
addClose.addEventListener('click', (evt) => {
  closePopup(addPopup);
  addForm.reset();
});

// Закрыть окно с фото
const photoClose = openImage.querySelector('.pop-up__close');
photoClose.addEventListener('click', (evt) => {
  closePopup(openImage);
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




