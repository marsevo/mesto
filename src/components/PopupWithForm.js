import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(selectorPopup, { submitCallback }) {
        super(selectorPopup);
        this._submitCallback = submitCallback;
        this._formSubmit = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._formSubmit.querySelectorAll('.popup__text'));
        this._buttonSubmit = this._formSubmit.querySelector('.popup__submit');
    }

    // ф-ия собирающая данные со всех полей формы
    _getInputValues() {
        this._inputsValues = {};
        this._inputList.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        });
        return this._inputsValues;
    }

    // ф-ия добавления переданных данных в инпут
    addInputValues = (data) => {
        this._inputList.forEach((input, i) => {
            input.value = Object.values(data)[i];
        });
    }

    // ф-ия закрытия формы и сброса данных
    close() {
        this._formSubmit.reset();
        super.close();
    }

    // ф-ия отображения Preloader 
    renderPreloader(loading, displayText) {
        if (!this._buttonSubmit) return;
        if (loading) {
            this.defaulText = this._buttonSubmit.textContent;
            this._buttonSubmit.textContent = displayText;
        } else {
            this._buttonSubmit.textContent = this.defaulText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formSubmit.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        })
    }
};

export { PopupWithForm };