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
const popupSubmitButton = addForm.querySelector('.pop-up__submit'); //Кнопки отправки 
const confirmPopup = document.querySelector('#confirmPop-up'); //Окно подтверджения удаления элемента
const confirmForm = confirmPopup.querySelector('.pop-up__container');// Форма подтверждения удаления элемента
const confirmButtonSubmit = confirmForm.querySelector('.pop-up__submit');// Кнопка подтверждения удаления элемента


const editPopup = document.querySelector('#editPop-up'); // Редактирование профиля
const editForm = editPopup.querySelector('.pop-up__container'); //Форма редактирования профиля
const editCardName = editPopup.querySelector('.pop-up__item_data_name'); // Поле ввода редактирования имени профиля
const editCardDescription = editPopup.querySelector('.pop-up__item_data_description'); //Поле ввода редактирования описания профиля
const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля

const createAvatar = document.querySelector('#createAvatarPopup'); // Окно редактирования аватара
const createAvatarForm = createAvatar.querySelector('.pop-up__container'); //Форма редактирования аватара
const createAvatarLink = document.querySelector('#avatarLink');// Инпут для ссылки редактирования аватара
const createAvatarSubmit = createAvatar.querySelector('.pop-up__submit'); //Кнопка редактирования аватара



const openImage = document.querySelector('#OpenImage'); // Форма открытия изображения
const fullScreenImage = openImage.querySelector('.pop-up__fullscreen-image'); // Изображение
const fullscreenImageDescription = openImage.querySelector('.pop-up__image-description'); // Описание изображения
const allPopups = document.querySelectorAll('.pop-up'); // Все окна

export {
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
    createAvatarSubmit
}