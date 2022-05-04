//функция открытия карточки
export function openPopup(popup) {
    popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', closeEsc);
}
  
//Функция закрытия карточки
export function closePopup(popup) {
  popup.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closeEsc);
}

// Функция закрытия клавишей ESC
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.pop-up_opened')
    closePopup(openedPopup);
  }
}

