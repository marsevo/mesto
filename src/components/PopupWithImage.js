import Popup from '../components/Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullImage = this._popup.querySelector('.popup__full-image');
        this._imageCaption = this._popup.querySelector('.popup__caption');
    }

    // открываем popup с картинкой и описанием 
    open(image) {
        super.open();
        this._fullImage.src = image.link;
        this._fullImage.alt = image.name;
        this._imageCaption.textContent = image.name;
    }
};

export { PopupWithImage };