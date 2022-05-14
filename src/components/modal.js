import {
    profileName,
    profileDescription,
    addPopup,
    profileAddButton,
    popupSubmitButton,
    editPopup,
    editCardName,
    editCardDescription,
    editButton,
    createAvatar,
    createAvatarSubmit,
    createAvatarButton
  } from './data.js';
  import {openPopup} from './utils.js';


//Слушатель на кнопке аватара
function openCreateAvatarPopup() {
  createAvatarButton.addEventListener('click', function () {
      openPopup(createAvatar);
      createAvatarSubmit.classList.add("popup__submit_disabled");
      createAvatarSubmit.disabled = true;
 });
}

// Кнопка редактирования профиля
function editProfile () {
    editButton.addEventListener('click', function () {
        editCardName.value = profileName.textContent;
        editCardDescription.value = profileDescription.textContent;
        openPopup(editPopup);
        popupSubmitButton.classList.add('pop-up__submit_disabled');
        popupSubmitButton.disabled = true;
  });
}

// Кнопка добавления карточки
function openAddElementPopup () {
    profileAddButton.addEventListener('click', function () {
      openPopup(addPopup);
    });
}

export { editProfile, openAddElementPopup, openCreateAvatarPopup };