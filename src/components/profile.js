import{
    elements,
    profileName,
    profileDescription,
    addPopup,
    addForm,
    addCardName,
    addCardDescription,
    popupSubmitButton,
    editPopup,
    editCardName,
    editCardDescription,
    createAvatar,
    createAvatarLink,
    createAvatarSubmit,
    profileEditSubmit,
    profileAvatar
} from './data.js';

import {
    fetchEditUser,
    fetchEditAvatar,
    fetchAddNewElement
  } from './api.js';

import {
    closePopup,
    renderLoading
} from './utils.js';

import {
    dataFromServer
  } from './index.js';

import {
    createElementCard
} from './card.js';

//Редактирование аватара
function createUserAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, createAvatarSubmit);
  fetchEditAvatar(createAvatarLink.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(createAvatar);
      createAvatarSubmit.disabled = true;
      createAvatarSubmit.classList.add('pop-up__submit_disabled');
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, createAvatarSubmit));
}

//Отправка имени и описания пользователя
function saveUserInfoProfile(evt) {
    evt.preventDefault();
    renderLoading(true, profileEditSubmit);
    fetchEditUser(editCardName.value, editCardDescription.value)
      .then(() => {
        profileName.textContent = editCardName.value;
        profileDescription.textContent = editCardDescription.value;
        closePopup(editPopup);
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, profileEditSubmit));
}

export { saveUserInfoProfile, createUserAvatar };