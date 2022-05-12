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
  elements,
  editCardDescription,
  popupSubmitButton,
  createAvatarForm,
  profileAvatar
} from './data.js';
import { createElementCard } from './card.js';
import { enableValidation } from './validation.js';
import { editProfile, openAddElementPopup, openCreateAvatarPopup } from './modal.js';
import { closePopup, closePopupsRelease } from './utils.js';
import { saveUserInfoProfile, createUserAvatar, addElementCard } from './profile.js'
import { fetchGetUser, fetchGetInitialElements } from './api.js';
export let dataFromServer = null;

closePopupsRelease();
editProfile();
openAddElementPopup();
openCreateAvatarPopup();


createAvatarForm.addEventListener('submit', createUserAvatar);
editForm.addEventListener('submit', saveUserInfoProfile);
addForm.addEventListener('submit', addElementCard);

Promise.all([fetchGetUser(), fetchGetInitialElements()])
  .then(([userData, cardsData]) => {
    dataFromServer = userData;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    const cards = cardsData.map((card) => createElementCard(card, userData._id));
    elements.prepend(...cards);
  })
  .catch((err) => console.log(err));



enableValidation({
  inactiveButtonClass: 'pop-up__submit_disabled',
  inputErrorClass: 'pop-up__item_error',
  errorClass: 'pop-up__error-item_active',
  formSelector: '.pop-up__container',
  inputSelector: '.pop-up__item',
  submitButtonSelector: '.pop-up__submit',
});


