//Данные сервера
const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
    headers: {
        authorization: "cda53605-ab20-47f0-90b4-9efa5160708a",
        "Content-Type": "application/json"
    }
}

//Проверка запроса
const processResponce = function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
  };


//Данные пользователя
const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers
    })
    .then(processResponce);
  };

//Редактирование данных пользователя
const getEditUser = (Name, Info) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: Name,
        about: Info,
      }),
    })
    .then(processResponce);
  };

//Редактирование аватарки  
const getEditAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(processResponce);
  };

//Запрос стартовых элементов
const getInitialElements = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers,
    })
    .then(processResponce);
  };

//Запрос количества лайков
const getLikes = (id, method) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: config.headers,
    })
    .then(processResponce);
  };

//Добавление нового элемента
const getAddNewElement = (elementName, imageLink) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: elementName,
        link: imageLink,
      }),
    })
    .then(processResponce);
  };

//Удаление элемента
const getDeleteElement = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then(processResponce);
  };


  export { getUser, getEditUser, getEditAvatar, getInitialElements,
    getLikes, getAddNewElement, getDeleteElement };