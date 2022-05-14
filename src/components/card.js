import { openPopup, closePopup, renderLoading } from './utils.js';
import { fetchDeleteElement, fetchLikes } from './api.js';
import {
    elementTemplate,
    openImage,
    fullScreenImage,
    fullscreenImageDescription,
    confirmPopup,
    confirmButtonSubmit
  } from './data.js';

//Переменная для перезаписи данных с сервера
let cardsForDelete = null;

//Копирование темплейта 
const cloneElement = () => {
  return elementTemplate.querySelector('.element').cloneNode(true);
};

//Слушатель подтверждения удаления
function confirmedCardDeletion() {
  confirmButtonSubmit.addEventListener('click', submitDeleteCardConfirmed(cardsForDelete));
}

//Проверка совпадения карточки пользователя для возможности удаления
function handleDeleteCard(cardElement, _id) {
  cardsForDelete = {
    cardElement,
    _id,
  };
  openPopup(confirmPopup);
  confirmButtonSubmit.addEventListener('click', confirmedCardDeletion);
}

//Удаление элемента
function submitDeleteCardConfirmed(cardsForDelete) {
  if (!cardsForDelete) return;

  renderLoading(true, confirmButtonSubmit);

  fetchDeleteElement(cardsForDelete._id)
    .then(() => {
      cardsForDelete.cardElement.remove();
      closePopup(confirmPopup);
      cardsForDelete = null;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, confirmButtonSubmit));
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

  if (likes.some((like) => like._id === myId)) {
    cardLikeButton.classList.add('element__button-like_active');
  }

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
    fetchLikes(_id, method)
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
  fetchAddNewElement(addCardName.value, addCardDescription.value)
    .then((card) => {
      elements.prepend(createElementCard(card, dataFromServer._id));
    })
    .then(() => {
      closePopup(addPopup);
      addForm.reset();
      popupSubmitButton.classList.add('pop-up__submit_disabled');
      popupSubmitButton.disabled = true;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupSubmitButton));
}

export { confirmedCardDeletion, createElementCard, submitDeleteCardConfirmed, addElementCard }