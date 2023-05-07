class Card {
  constructor({ data, userId, templateSelector, openCardImage, handleCardDelete, handleCardLike, handleCardRemoveLike }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCardImage = openCardImage;
    this._handleCardDelete = handleCardDelete;
    this._setLike = handleCardLike;
    this._removeLike = handleCardRemoveLike;
    this._userId = userId;
    this.cardData = data;
    this.idCard = data._id;
    this._idUserCard = data.owner._id;
    this._dataLikes = data.likes;
    this._likesCounter = data.likes.length;
  };

  // получить шаблон
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };

  // генерация карточки
  generateCard() {

    this.cardElement = this._getTemplate();
    this._cardElementTitle = this.cardElement.querySelector(".card__title");
    this._cardElementImage = this.cardElement.querySelector('.card__image');
    this._cardElementLike = this.cardElement.querySelector(".card__like-button");
    this._cardElementDelete = this.cardElement.querySelector(".card__delete-button");
    this._cardElementLikeCounter = this.cardElement.querySelector('.card__like-counter');

    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;
    this._cardElementTitle.textContent = this._name;
    this.renderCardLike(this.cardData);

    // Проверка отображения корзины на карточке
    if (this._idUserCard !== this._userId) {
      this._cardElementDelete.remove();
    }

    this._setEventListeners();

    return this.cardElement;
  };

  // ф-ия проверки наличия лайка на карточке
  islikedCard() {
    return this._dataLikes.some(like => like._id === this._userId)
  };

  // ф-ия лайка карточки
  toggleLike() {
    if (this.islikedCard()) {
      this._removeLike(this.idCard);
    } else {
      this._setLike(this.idCard);
    }
  };

  renderCardLike(card) {
    this._dataLikes = card.likes;
    if (this._dataLikes.length === 0) {
      this._cardElementLikeCounter.textContent = '0';
    } else {
      this._cardElementLikeCounter.textContent = this._dataLikes.length;
    }
    if (this.islikedCard()) {
      this._cardElementLike.classList.add('card__like-button_active');
    } else {
      this._cardElementLike.classList.remove('card__like-button_active');
    }
  }

  // слушатели событий (лайк, удаление, открытие фул картинки)
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this.toggleLike());
    this._cardElementDelete.addEventListener('click', () => this._handleCardDelete(this));
    this._cardElementImage.addEventListener('click', () => this._openCardImage());

  };
};

export { Card };
