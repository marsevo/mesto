const editProfileButton = document.querySelector('#edit-profile-button');
const editProfilePopup = document.querySelector('#edit-popup');

editProfileButton.addEventListener('click', function () {
  editProfilePopup.classList.add("popup_opened")
});

const closeProfileButton = document.querySelector('#close-profile-button');
function closeProfilePopup() {
  editProfilePopup.classList.remove("popup_opened")
}
closeProfileButton.addEventListener("click", closeProfilePopup);

const userName = 'Жак-Ив Кусто';
const userOccupation = 'Исследователь океана';

const userNameElement = document.querySelector('#user-name');
userNameElement.textContent = userName;

const userOccupationElement = document.querySelector('#user-occupation');
userOccupationElement.textContent = userOccupation;

const userNameInput = document.querySelector('#user-name-input');
userNameInput.value = userName;

const userOccupationInput = document.querySelector('#user-occupation-input');
userOccupationInput.value = userOccupation;

// Перезапись полей профиля при нажатии "Сохранить"
const formElement = document.querySelector(".popup__form");

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  closeProfilePopup();
}
formElement.addEventListener('submit', handleFormSubmit);

/* -------------5 sprint-------------------- */

// Открываем форму добавления карточки
const addPictureButton = document.querySelector('#add-picture-button');
const addPicturePopup = document.querySelector('#add-popup');

addPictureButton.addEventListener('click', function () {
  addPicturePopup.classList.add("popup_opened");
});

// Закрываем форму добавления карточки
const closeAddPictureButton = document.querySelector('#close-add-picture-button');
function closeAddPicturePopup() {
  addPicturePopup.classList.remove("popup_opened");
}
closeAddPictureButton.addEventListener("click", closeAddPicturePopup);

// КЛонируем карточки из template
const cardTemplate = document.querySelector(".template").content;

function cloneTemplateCard() {
  return (cardElement = cardTemplate.querySelector(".card").cloneNode(true));
}

// Вставляем карточки в cards
const cards = document.querySelector(".cards");

function addCardToCards(cardElement) {
  cards.prepend(cardElement);
}

// 6 карточек по умолчанию
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// опставить лайк
function makeLikeActive(evt) {
  evt.target.classList.toggle("card__like-button_active");
}
//удалить карточку
function deleteCard(evt) {
  evt.target.parentElement.remove();
}

// добаавление карточек по умолчанию
function addInitialCards(item) {
  cloneTemplateCard();
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  addCardToCards(cardElement);
  cardElement.querySelector(".card__like-button").addEventListener("click", makeLikeActive);
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardElement.querySelector(".card__image").addEventListener("click", openFullImagePopup);
}
initialCards.forEach(addInitialCards);

// длбавление новой карточки из popup
let imageLinkInput= document.querySelector("#image-link");
let placeNameInput = document.querySelector("#place-name");

function addNewCard(evt) {
  evt.preventDefault();
  cloneTemplateCard();
  cardElement.querySelector(".card__image").src = imageLinkInput.value;
  cardElement.querySelector(".card__image").alt = placeNameInput.value;
  cardElement.querySelector(".card__title").textContent = placeNameInput.value;
  addCardToCards(cardElement);
  closeAddPicturePopup();
  cardElement.querySelector(".card__like-button").addEventListener("click", makeLikeActive);
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardElement.querySelector(".card__image").addEventListener("click", openFullImagePopup);
}
addPicturePopup.addEventListener("submit", addNewCard);

// открытие popup с full image
const imagePopup = document.querySelector('#image-popup');
const fullImagePopup = document.querySelector('.popup__full-image');
const imageCaptionPopup = document.querySelector('.popup__caption');

function openFullImagePopup(evt) {
  fullImagePopup.src = evt.target.src;
  const cardElement = evt.target.parentElement;
  const cardTitle = cardElement.querySelector(".card__title");
  imageCaptionPopup.textContent = cardTitle.textContent;
  fullImagePopup.alt = cardTitle.textContent;
  imagePopup.classList.add("popup_opened");
}

// Закрываем форму добавления карточки
const closeFullImageButton = document.querySelector('#close-image-button');
function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}
closeFullImageButton.addEventListener("click", closeImagePopup);

