import { popupSubmitButton, allPopups, confirmButtonSubmit, confirmPopup} from './data.js'
// import { confirmedCardDeletion } from './card.js'

//функция открытия элемента
function openPopup(popup) {
    popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', handleEscKey);
}
  
//Функция закрытия элемента
function closePopup(popup) {
  popup.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', handleEscKey);
}

// Функция закрытия клавишей ESC
function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopup(openedPopup);
  }
}
//Изменение текста кнопки самбит
function renderLoading(isLoading, button, buttonText = 'Сохранить') {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = buttonText;
  }
}

//Закрытие окон
function closePopupsRelease () {
allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('pop-up_opened')) {
        closePopup(popup);
      }
    });
    popup.addEventListener('click', (evt) => {
      if (evt.target.closest('.pop-up__close')) {
        closePopup(popup);
      }
    });
  });
}

export {openPopup, closePopup, renderLoading, closePopupsRelease};