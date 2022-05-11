import {
    contentPage,
    elementTemplate,
    elements,
    profile,
    profileMain,
    profileInfo,
    profileName,
    profileDescription,
    addPopup,
    addForm,
    addCardName,
    addCardDescription,
    profileAddButton,
    popupSubmitButton,
    editPopup,
    editForm,
    editCardName,
    editCardDescription,
    editButton,
    openImage,
    fullScreenImage,
    fullscreenImageDescription,
    allPopups,
    confirmPopup,
    confirmForm,
    confirmButtonSubmit,
    createAvatar,
    createAvatarForm,
    createAvatarLink,
    createAvatarSubmit,
    createAvatarButton
  } from './data.js';
  import {openPopup} from './utils.js';


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

//Слушатель на кнопке аватара
function openCreateAvatarPopup() {
    createAvatarButton.addEventListener('click', function () {
        openPopup(createAvatar);
        createAvatarSubmit.classList.add("popup__submit_disabled");
        createAvatarSubmit.disabled = true;
   });
}

export { editProfile, openAddElementPopup, openCreateAvatarPopup };