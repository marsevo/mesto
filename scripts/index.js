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