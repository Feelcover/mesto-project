import { openPopup } from './modal';
import {
    elementTemplate,
    elements,
    openImage,
    fullScreenImage,
    fullscreenImageDescription,
  } from './data.js';

//Добавление элементов
function createElement(initialElement) {
    const initialElements = elementTemplate.content.cloneNode(true); // Клонирование элемента
    const imageElement = initialElements.querySelector('.element__image'); // Изображение элемента
    initialElements.querySelector('.element__title').textContent = initialElement.name; // Имя элемента
    imageElement.src = initialElement.link; // Ссылка на изображение
    imageElement.alt = initialElement.name; // Альтернатива при ошибке загрузки фото

    // Кнопка лайка
    initialElements
    .querySelector('.element__button-like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button-like_active'); 
    });                

    // Удаление элемента           
    initialElements
    .querySelector('.element__button-delete')
    .addEventListener('click', (evt) => {
      const elementItem = evt.target.closest('.element');    
      elementItem.remove();
    });

    // Окно с изображением
    initialElements
    .querySelector('.element__image')
    .addEventListener('click', (evt) => {
      const elementLink = evt.target.src;                     
      const elementName = evt.target.closest('.element');
      const elementText = elementName.querySelector('.element__title').textContent;
      
      openPopup(openImage);  // Открытие окна с фото
    
    // Присвоение ссылки картинке
      fullScreenImage.src = elementLink;
      fullscreenImageDescription.textContent = elementText;         
      fullScreenImage.alt = elementText;
    });

    return initialElements;
}



// Вставка элемента в DOM-дерево
export function addElement(initialElement) {
    elements.prepend(createElement(initialElement));
}

// Рендер массива
export function cardRender(сontentElements){
const reverseElements = сontentElements.reverse();
сontentElements.forEach(addElement);
}