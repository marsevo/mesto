let editProfileButton = document.querySelector('#edit-profile-button');

editProfileButton.addEventListener('click', function () {
  document.querySelector('#edit-popup').style.visibility = "visible";
});

let closeProfileButton = document.querySelector('#close-profile-button');

function closeProfilePopup() {
  document.querySelector('#edit-popup').style.visibility = "hidden";
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
let formElement = document.querySelector(".popup__form");

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  closeProfilePopup();
}
formElement.addEventListener('submit', handleFormSubmit);

/* -------------5 sprint-------------------- */

// Открываем форму добавления карточки
let addPictureButton = document.querySelector('#add-picture-button');

addPictureButton.addEventListener('click', function () {
  document.querySelector('#add-popup').style.visibility = "visible";
});

// Закрываем форму добавления карточки
let closeAddPictureButton = document.querySelector('#close-add-picture-button');
function closeAddPicturePopup() {
  document.querySelector('#add-popup').style.visibility = "hidden";
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

// 6 карточек мест по умолчанию
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
function makeLikeActive (evt) {
  evt.target.classList.toggle("card__like-button_active");
}
function addEventListenerToCards(cardElement) {
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", makeLikeActive); // добавление слушателя события на кнопку лайк у карточек
}
function addInitialCards(item) {
  cloneTemplateCard();
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  addCardToCards(cardElement);
  addEventListenerToCards(cardElement);
}
initialCards.forEach(addInitialCards);

