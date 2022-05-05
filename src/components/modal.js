//функция открытия карточки
export function openPopup(popup) {
    popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', handleEscKey);
}
  
//Функция закрытия карточки
export function closePopup(popup) {
  popup.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', handleEscKey);
}

// Функция закрытия клавишей ESC
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.pop-up_opened')
    closePopup(openedPopup);
  }
}

