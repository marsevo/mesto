class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers['authorization'];
    }

// проверка на ошибки 
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

// запросить карточки с сервера 
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            },
        })
            .then(res => this._checkResponse(res))
    }

// ф-ия добавления новой карточки на сервер 
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then(res => this._checkResponse(res))
    };

// ф-ия  получения данных пользователя с сервера
    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            },
        })
            .then(res => this._checkResponse(res))
    }

// ф-ия передачи данных пользователя с сервера
    setUserInfoApi(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        })
            .then(res => this._checkResponse(res))
    }

// ф-ия передачи нового аватара на сервер
    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
            .then(res => this._checkResponse(res))
    }

// ф-ия удаления карточки с сервера
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res))
    }

// ф-ия отправки лайка на сервер 
    setCardLike(cardId) {
        console.log(cardId);
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res))
    }

// ф-ия удаления лайка с сервера
    removeCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res))
    }
}

export { Api };