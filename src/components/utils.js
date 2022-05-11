import { popupSubmitButton, allPopups, confirmButtonSubmit } from './data.js'

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
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopup(openedPopup);
  }
}
function renderLoading(isLoading, button) {
    if (isLoading){
        button.textContent= 'Сохранение...';
    } else if (button === popupSubmitButton) {
        button.textContent= 'Создать';
    } else if (button === confirmButtonSubmit){
        button.textContent= 'Да';
    } else {
        button.textContent= 'Сохранить';
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