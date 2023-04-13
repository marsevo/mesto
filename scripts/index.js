import { FormValidator } from './formValidator.js';
import { Card } from './card.js';
import { initialCards, validationConfig } from './initialData.js';

const buttonEditProfile = document.querySelector('#edit-profile-button');
const popupEditProfile = document.querySelector('#edit-popup');

const userNameElement = document.querySelector('#user-name');
const userOccupationElement = document.querySelector('#user-occupation');
const userNameInput = document.querySelector('#user-name-input');
const userOccupationInput = document.querySelector('#user-occupation-input');

const formElement = document.querySelector('#edit-profile-popup-form');

const buttonAddPicture = document.querySelector('#add-picture-button');
const popupAddPicture = document.querySelector('#add-popup');

const cards = document.querySelector(".cards");

const imageLinkInput = document.querySelector("#image-link");
const placeNameInput = document.querySelector("#place-name");
const formAddPlace = document.querySelector("#add-place-popup-form");

const imagePopup = document.querySelector('#image-popup');
const fullImagePopup = document.querySelector('.popup__full-image');
const imageCaptionPopup = document.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');

// ф-ия создания карточки 
const createCard = (cardData) => {
  const card = new Card(cardData, '.template', openCardImage);
  return card.generateCard();
};


// ф-ия открытия просмотра изображения карточки 
const openCardImage = (cardImage) => {
  openPopup(imagePopup);

  fullImagePopup.src = cardImage.link;
  fullImagePopup.alt = cardImage.name;
  imageCaptionPopup.textContent = cardImage.name;
}

// ф-ии открытия-закрытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove("popup_opened");
};

// перезапись полей профиля при нажатии "Сохранить"
function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  closePopup(popupEditProfile);
}
formElement.addEventListener('submit', handleFormSubmit);

// добавление карточеек по умолчанию
initialCards.forEach(function (item) {
  renderCard(item);
});

function renderCard(cardData) {
  cards.prepend(createCard(cardData));
};

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

// закрытие всех крестиков
// находим все крестики проекта по универсальному селектору
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

buttonEditProfile.addEventListener('click', function () {
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
  openPopup(popupEditProfile);
  validationFormProfile.clearValidationForm();
});

// Открываем форму добавления карточки
buttonAddPicture.addEventListener('click', function () {
  openPopup(popupAddPicture);
  placeNameInput.value = '';
  imageLinkInput.value = '';
  validationFormPlace.clearValidationForm();
});

// дoбавление новой карточки из popup
formAddPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: imageLinkInput.value,
  });
  evt.target.reset();
  closePopup(popupAddPicture);
});

// валидация форм 
const validationFormProfile = new FormValidator(validationConfig, popupEditProfile);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(validationConfig, popupAddPicture);
validationFormPlace.enableValidation();