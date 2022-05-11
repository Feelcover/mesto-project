//Данные сервера
const config = {
    baseURL: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
    headers: {
        authorization: 'cda53605-ab20-47f0-90b4-9efa5160708a',
        'Content-Type': 'application/json'
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
const fetchGetUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
    .then(processResponce);
  };

//Редактирование данных пользователя
const fetchEditUser = (Name, Info) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: Name,
        about: Info,
      }),
    })
    .then(processResponce);
  };

//Редактирование аватарки  
const fetchEditAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(processResponce);
  };

//Запрос стартовых элементов
const fetchGetInitialElements = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers,
    })
    .then(processResponce);
  };

//Запрос количества лайков
const fetchLikes = (id, method) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: config.headers,
    })
    .then(processResponce);
  };

//Добавление нового элемента
const fetchAddNewElement = (elementName, imageLink) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: elementName,
        link: imageLink,
      }),
    })
    .then(processResponce);
  };

//Удаление элемента
const fetchDeleteElement = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(processResponce);
  };


  export { fetchGetUser, fetchEditUser, fetchEditAvatar, fetchGetInitialElements,
    fetchLikes, fetchAddNewElement, fetchDeleteElement };