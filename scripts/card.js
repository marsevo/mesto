class Card {
  constructor(card, templateSelector, openCardImage) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._openCardImage = openCardImage;
  };

  // получить шаблон 
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };

  // генерация карточки 
  generateCard() {

    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector(".card__title");
    this._cardElementImage = this._cardElement.querySelector('.card__image');
    this._cardElementLike = this._cardElement.querySelector(".card__like-button");
    this._cardElementDelete = this._cardElement.querySelector(".card__delete-button");

    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;
    this._cardElementTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  };

  // функция лайка карточки 
  _toggleLike() {
    this._cardElementLike.classList.toggle('card__like-button_active');
  };

  // функция удаления карточки 
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };

  // слушатели событий (лайк, удаление, открытие фул картинки)
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._toggleLike());
    this._cardElementDelete.addEventListener('click', () => this._deleteCard());
    this._cardElementImage.addEventListener('click', () => this._openCardImage(
      {
        link: this._link,
        name: this._name,
      }));

  };
};

export { Card };