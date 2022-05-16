import {
    profileName,
    profileDescription,
    addPopup,
    profileAddButton,
    editPopup,
    editCardName,
    editCardDescription,
    editButton,
    createAvatar,
    createAvatarLink,
    createAvatarButton,
    profileEditSubmit,
    createAvatarSubmit
  } from './data.js';
  import {openPopup} from './utils.js';

//Деактивация кнопки submit
function disableButton (button) {
  button.classList.add('pop-up__submit_disabled');
  button.disabled = true;
}

//Слушатель на кнопке аватара
function handleCreateAvatarPopup() {
  createAvatarButton.addEventListener('click', function () {
      disableButton(createAvatarSubmit);
      createAvatarLink.value= '';
      openPopup(createAvatar);
 });
}

// Кнопка редактирования профиля
function handleEditProfile () {
    editButton.addEventListener('click', function () {
        editCardName.value = profileName.textContent;
        editCardDescription.value = profileDescription.textContent;
        disableButton (profileEditSubmit);
        openPopup(editPopup);
  });
}

// Кнопка добавления карточки
function handleAddElementPopup () {
    profileAddButton.addEventListener('click', function () {
      openPopup(addPopup);
    });
}

export { handleEditProfile, handleAddElementPopup, handleCreateAvatarPopup, disableButton };