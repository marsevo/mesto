import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { initialCards, validationConfig } from '../utils/initialData.js';
import '../pages/index.css';

const buttonEditProfile = document.querySelector('#edit-profile-button');
const buttonAddPicture = document.querySelector('#add-picture-button');

// создание Popup изображения
const cardImagePopup = new PopupWithImage('#image-popup');

// ф-ия создания карточки 
const createCard = (cardData) => {
  const card = new Card(cardData, '.template', () => {
    cardImagePopup.open(cardData);
  });
  return card.generateCard();
};

// создание Section для отрисовки карточек
const cardsSection = new Section({
  renderer: (card) => {
    cardsSection.addItem(createCard(card));
  },
}, '.cards');

// отображение карточек на странице
cardsSection.renderItems(initialCards);

// получение формы профиля
const userInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserOccupation: '.profile__subtitle'
})

// ф-ия создания Popup редактировапния профиля
const popupEditProfile = new PopupWithForm('#edit-popup', {
  submitCallback: (data) => {
    userInfo.addUserInfo(data);
  }
})

// ф-ия открытия Popup редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.addInputValues(userInfo.getUserInfo());
  validatorForms['edit-profile-popup-form'].clearValidationForm();
});

// ф-ия создания Popup добавления карточки
const popupAddPicture = new PopupWithForm('#add-popup', {
  submitCallback: ({ name, link }) => {
    cardsSection.addItem(createCard({
      name: name,
      link: link
    }))
  }
})

// Функция открытия Popup добавления карточки
buttonAddPicture.addEventListener('click', () => {
  popupAddPicture.open();
  validatorForms['add-place-popup-form'].clearValidationForm();
});

///////////////////////////////////////////////

// валидация форм 
// создание экземпляров валидаторов всех форм 
const validatorForms = {};

// Включение валидации
const enableValidation = (config) => {
  const listForm = Array.from(document.querySelectorAll(config.formSelector))
  listForm.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    // получаем данные из атрибута `id` у формы
    const formId = formElement.getAttribute('id');
    validatorForms[formId] = formValidator;
    formValidator.enableValidation();
  })
}

// Вызов функции валидации 
enableValidation(validationConfig);

cardImagePopup.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPicture.setEventListeners();