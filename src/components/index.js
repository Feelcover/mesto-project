import '../pages/index.css';
import {
  profileName,
  profileDescription,
  addForm,
  editForm,
  elements,
  createAvatarForm,
  profileAvatar
} from './data.js';
import { createElementCard, addElementCard } from './card.js';
import { enableValidation } from './validation.js';
import { handleEditProfile, handleAddElementPopup, handleCreateAvatarPopup } from './modal.js';
import { closePopupsRelease } from './utils.js';
import { saveUserInfoProfile, createUserAvatar } from './profile.js'
import { getUser, getInitialElements } from './api.js';

enableValidation({
  inactiveButtonClass: 'pop-up__submit_disabled',
  inputErrorClass: 'pop-up__item_error',
  errorClass: 'pop-up__error-item_active',
  formSelector: '.pop-up__container',
  inputSelector: '.pop-up__item',
  submitButtonSelector: '.pop-up__submit',
});

closePopupsRelease();
handleEditProfile();
handleAddElementPopup();
handleCreateAvatarPopup();

createAvatarForm.addEventListener('submit', createUserAvatar);
editForm.addEventListener('submit', saveUserInfoProfile);
addForm.addEventListener('submit', addElementCard);

export let dataFromServer = null;
Promise.all([getUser(), getInitialElements()])
  .then(([userData, cardsData]) => {
    dataFromServer = userData;
    profileAvatar.src = userData.avatar;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    const cards = cardsData.map((card) => createElementCard(card, userData._id));
    elements.prepend(...cards);
  })
  .catch((err) => console.log(err));





