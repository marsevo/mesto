class UserInfo {
    constructor({ selectorUserName, selectorUserOccupation }) {
        this._profileName = document.querySelector(selectorUserName);
        this._profileOccupation = document.querySelector(selectorUserOccupation);
    }

    // ф-ия получения информации из профиля
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            occupation: this._profileOccupation.textContent,
        }
    }

    // ф-ия добавления инф-ии из формы в профиль
    addUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileOccupation.textContent = data.occupation;
    }
};

export { UserInfo };