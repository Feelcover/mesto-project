import{
    profileName,
    profileDescription,
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
    getEditUser,
    getEditAvatar,
  } from './api.js';

import {
    closePopup,
    renderLoading
} from './utils.js';

import {
  disableButton
} from './modal.js'

//Редактирование аватара
function createUserAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, createAvatarSubmit);
  getEditAvatar(createAvatarLink.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(createAvatar);
      disableButton(createAvatarSubmit);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, createAvatarSubmit));
}

//Отправка имени и описания пользователя
function saveUserInfoProfile(evt) {
    evt.preventDefault();
    renderLoading(true, profileEditSubmit);
    getEditUser(editCardName.value, editCardDescription.value)
      .then(() => {
        profileName.textContent = editCardName.value;
        profileDescription.textContent = editCardDescription.value;
        closePopup(editPopup);
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, profileEditSubmit));
}

export { saveUserInfoProfile, createUserAvatar };