export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close')
  }

  // ф-ия открытия Popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClosePopup)
  }

  // ф-ия закрытия Popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClosePopup)
  }

  // ф-ия закрытия по ESC */
  _handleEscClosePopup = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // закрытие Popup при нажатии на оверлей
  _handleOverlayClosePopup = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  // обработчик закрытия по оверлею и крестику 
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })
  };

};