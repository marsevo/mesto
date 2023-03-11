// Объект валидации 
const validationObject = {
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputSelector: '.popup__text',
  inputErrorClass: 'popup__text_type_error',
}

const buttonEditProfile = document.querySelector('#edit-profile-button');
const editProfilePopup = document.querySelector('#edit-popup');

// ф-ии открытия-закрытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove("popup_opened");
};

const userNameElement = document.querySelector('#user-name');
const userOccupationElement = document.querySelector('#user-occupation');
const userNameInput = document.querySelector('#user-name-input');
const userOccupationInput = document.querySelector('#user-occupation-input');

buttonEditProfile.addEventListener('click', function () {
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
  openPopup(editProfilePopup);
  resetValidation(validationObject);
});

// Перезапись полей профиля при нажатии "Сохранить"
const formElement = document.querySelector('#edit-profile-popup-form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  closePopup(editProfilePopup);
}
formElement.addEventListener('submit', handleFormSubmit);

/* -------------5 sprint-------------------- */

// Открываем форму добавления карточки
const buttonAddPicture = document.querySelector('#add-picture-button');
const addPicturePopup = document.querySelector('#add-popup');

buttonAddPicture.addEventListener('click', function () {
  openPopup(addPicturePopup);
  placeNameInput.value = '';
  imageLinkInput.value = '';
  resetValidation(validationObject);
});

// КЛонируем карточки из template
const cardTemplate = document.querySelector(".template").content;

function cloneTemplateCard() {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  return cardElement;
}

const cards = document.querySelector(".cards");

// опставить лайк
function makeLikeActive(evt) {
  evt.target.classList.toggle("card__like-button_active");
}
//удалить карточку
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// функция создания карточки
function createCard(item) {
  const cardElement = cloneTemplateCard();
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementLike = cardElement.querySelector(".card__like-button");
  const cardElementDelete = cardElement.querySelector(".card__delete-button");

  cardElementImage.src = item.link;
  cardElementImage.alt = item.name;
  cardElementTitle.textContent = item.name;

  cardElementLike.addEventListener("click", makeLikeActive);
  cardElementDelete.addEventListener("click", deleteCard);
  cardElementImage.addEventListener("click", openFullImagePopup);

  return cardElement;
}


// функция сброса стилей валидации при открытии Popup
const resetValidation = (validationObject) => {
  resetInput(validationObject);
  resetSubmit(validationObject);
};

// добавление карточеек по умолчанию
initialCards.forEach(function (item) {
  cards.prepend(createCard(item));
});

// дoбавление новой карточки из popup
const imageLinkInput = document.querySelector("#image-link");
const placeNameInput = document.querySelector("#place-name");
const addPlaceForm = document.querySelector("#add-place-popup-form");

addPlaceForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: imageLinkInput.value,
  });
  evt.target.reset();
  closePopup(addPicturePopup);
});

function renderCard(cardData) {
  cards.prepend(createCard(cardData));
};

// открытие popup с full image
const imagePopup = document.querySelector('#image-popup');
const fullImagePopup = document.querySelector('.popup__full-image');
const imageCaptionPopup = document.querySelector('.popup__caption');

function openFullImagePopup(evt) {
  fullImagePopup.src = evt.target.src;
  const cardElement = evt.target.closest(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  imageCaptionPopup.textContent = cardTitle.textContent;
  fullImagePopup.alt = cardTitle.textContent;
  openPopup(imagePopup);
}

// закрытие всех крестиков
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// функция закрытия по клавише Esc 
const closePopupByEsc = (evt) => {
  if (evt.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// закрытие попапов нажитием на overlay
const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
    }
  });
});
