class UserInfo {
    constructor({ selectorUserName, selectorUserAbout, selectorUserAvatar }) {
        this._profileName = document.querySelector(selectorUserName);
        this._profileAbout = document.querySelector(selectorUserAbout);
        this._profileAvatar = document.querySelector(selectorUserAvatar);
    }

    // ф-ия получения информации из профиля
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent,
        }
    }

    // ф-ия добавления инф-ии из формы в профиль
    addUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
    }

    // ф-ия добавления ссылки на картинку аватара
   setUserAvatar(url) {
    this._profileAvatar.src = url.avatar;
  }
};

export { UserInfo };