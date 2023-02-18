const editProfileButton = document.querySelector('#edit-profile-button');
const editProfilePopup = document.querySelector('#edit-popup');

// ф-ии открытия-закрытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
};
function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

const userNameElement = document.querySelector('#user-name');
const userOccupationElement = document.querySelector('#user-occupation');
const userNameInput = document.querySelector('#user-name-input');
const userOccupationInput = document.querySelector('#user-occupation-input');

editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
});

const closeProfileButton = document.querySelector('#close-profile-button');

closeProfileButton.addEventListener("click", function () {
  closePopup(editProfilePopup);
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

const addPictureButton = document.querySelector('#add-picture-button');
const addPicturePopup = document.querySelector('#add-popup');

addPictureButton.addEventListener('click', function () {
  openPopup(addPicturePopup);
});

// Закрываем форму добавления карточки
const closeAddPictureButton = document.querySelector('#close-add-picture-button');

closeAddPictureButton.addEventListener("click", function () {
  closePopup(addPicturePopup);
});

// КЛонируем карточки из template
const cardTemplate = document.querySelector(".template").content;

function cloneTemplateCard() {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  return cardElement;
}

const cards = document.querySelector(".cards");

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

function renderCard (cardData) {
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

// Закрываем форму добавления карточки
const closeFullImageButton = document.querySelector('#close-image-button');

closeFullImageButton.addEventListener("click", function () {
  closePopup(imagePopup);
});

