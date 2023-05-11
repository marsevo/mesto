import Popup from "./Popup.js";

class PopupWithDeletion extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector('.popup__submit');
  }

  // ф-ия открытия Popup и получения данных карточки
  open({ idCard, cardElement }) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
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
    this._buttonSubmit.addEventListener('click', () => {
      this._submitCallback(this);
    })
  }
}

export { PopupWithDeletion };