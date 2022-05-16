import { openPopup, closePopup, renderLoading } from './utils.js';
import { getDeleteElement, getLikes, getAddNewElement } from './api.js';
import {
  elementTemplate,
  elements,
  addPopup,
  addForm,
  addCardName,
  addCardDescription,
  popupSubmitButton,
  openImage,
  fullScreenImage,
  fullscreenImageDescription,
  confirmPopup,
  confirmButtonSubmit
  } from './data.js';
  import { dataFromServer } from './index.js'
  import { disableButton } from './modal.js'

//Переменная для перезаписи данных с сервера
let cardsForDelete = null;

//Копирование темплейта 
const cloneElement = () => {
  return elementTemplate.querySelector('.element').cloneNode(true);
};

// Слушатель с анонимной функцией
confirmButtonSubmit.addEventListener('click', () => {
  submitDeleteCardConfirmed(cardsForDelete)
});

//Проверка совпадения карточки пользователя для возможности удаления
function handleDeleteCard(cardElement, _id) {
  cardsForDelete = {
    cardElement,
    _id,
  };
  openPopup(confirmPopup);
}


//Удаление элемента
function submitDeleteCardConfirmed(cardsForDelete) {
  if (!cardsForDelete) return;

  renderLoading(true, confirmButtonSubmit, 'Да');

  getDeleteElement(cardsForDelete._id)
    .then(() => {
      cardsForDelete.cardElement.remove();
      closePopup(confirmPopup);
      cardsForDelete = null;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, confirmButtonSubmit, 'Да'));
}


//Добавление элементов на страницу
function createElementCard({ name, link, _id, owner, likes }, myId) {

  const cardElement = cloneElement();
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const cardLikesCounter = cardElement.querySelector('.element__counter-likes');
  const cardLikeButton = cardElement.querySelector('.element__button-like');
  const cardDeleteButton = cardElement.querySelector('.element__button-delete');
  
  //Вставляем данные с сервера
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikesCounter.textContent = `${likes.length}`;

  //Сверяем id лайков
  if (likes.some((like) => like._id === myId)) {
    cardLikeButton.classList.add('element__button-like_active');
  }
  //Сверяем id для возможности удаления только своей карточки
  cardDeleteButton.classList.toggle(
    'element__button-delete_hidden',
    owner._id !== myId
  );

  if (owner._id === myId) {
    cardDeleteButton.addEventListener(
      'click',
      () => {
        handleDeleteCard(cardElement, _id);
      },
      true
      
    );
  }
//Вставка изображения в попап
  cardImage.addEventListener('click', function () {
    fullScreenImage.src = cardImage.src;
    fullScreenImage.alt = name;
    fullscreenImageDescription.textContent = name;
    openPopup(openImage);
  });

//Добавление лайков
  cardLikeButton.addEventListener('click', 
  function handleLikes() {
    const myLike = likes.find((like) => like._id === myId);
    const method = myLike !== undefined ? "DELETE" : "PUT";
    getLikes(_id, method)
      .then((data) => {
        likes = data.likes;
        cardLikesCounter.textContent = `${likes.length}`;

        if (likes.some((like) => like._id === myId)) {
          cardLikeButton.classList.add('element__button-like_active');
        } else {
          cardLikeButton.classList.remove('element__button-like_active');
        }
      })
      .catch((err) => console.log(err));
  });
  return cardElement;
}

//Получение карточки с сервера
function addElementCard(evt) {
  evt.preventDefault();
  renderLoading(true, popupSubmitButton);
  getAddNewElement(addCardName.value, addCardDescription.value)
    .then((card) => {
      elements.prepend(createElementCard(card, dataFromServer._id));
    })
    .then(() => {
      closePopup(addPopup);
      addForm.reset();
      disableButton(popupSubmitButton);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupSubmitButton));
}

export { createElementCard, submitDeleteCardConfirmed, addElementCard }