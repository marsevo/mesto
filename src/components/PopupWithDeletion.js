import Popup from "./Popup.js";

class PopupWithDeletion extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
  }

  // ф-ия открытия Popup и получения данных карточки
  open({ idCard, cardElement }) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._submitCallback(this);
    })
  }
}

export { PopupWithDeletion };