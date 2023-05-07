import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDeletion } from '../components/PopupWithDeletion';
import { apiConfig, validationConfig } from '../utils/initialData.js';
import { Api } from '../components/Api.js'
import '../pages/index.css';

const buttonEditProfile = document.querySelector('#edit-profile-button');
const buttonAddPicture = document.querySelector('#add-picture-button');
const popupOpenAvatar = document.querySelector('.profile__avatar');
let userCurrentId;

// api
const api = new Api(apiConfig);

// получить ответ 
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([resUser, resCard]) => {
    userCurrentId = resUser._id;
    userInfo.addUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cardsSection.renderItems(resCard, userCurrentId)
  })
  .catch((err) => alert(err))

// создание Popup изображения
const cardImagePopup = new PopupWithImage('#image-popup');

// ф-ия создания карточки 
const createCard = (data, user) => {
  const card = new Card({
    data: data, userId: user, templateSelector: '.template',

    handleCardDelete: (card) => {
      popupFormDelete.open(card);
    },

    openCardImage: () => {
      cardImagePopup.open(data);
    },

    handleCardLike: (cardId) => {
      api.setCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res);
        })
        .catch((err) => alert(err))
    },

    handleCardRemoveLike: (cardId) => {
      api.removeCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res)
        })
        .catch((err) => alert(err))
    }

  });
  return card.generateCard();
};

// создание Section для отрисовки карточек
const cardsSection = new Section({
  renderer: (item, userID) => {
    cardsSection.addItem(createCard(item, userID));
  },
}, '.cards');

// отображение карточек на странице
//cardsSection.renderItems(initialCards);

// получение формы профиля
const userInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserAbout: '.profile__subtitle',
  selectorUserAvatar: '.profile__img'
})

// ф-ия создания Popup редактировапния профиля
const popupEditProfile = new PopupWithForm('#edit-popup', {
  submitCallback: (data) => {
    popupEditProfile.renderPreloader(true, 'Загрузка...')
    api.setUserInfoApi(data)
      .then((res) => {
        userInfo.addUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupEditProfile.renderPreloader(false);
      })
  }
})

// ф-ия открытия Popup редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.addInputValues(userInfo.getUserInfo());
  validatorForms['edit-profile-popup-form'].clearValidationForm();
});

// ф-ия создания Popup редактирования аватара
const popupAvatarForm = new PopupWithForm('#update-avatar', {
  submitCallback: (data) => {
    popupAvatarForm.renderPreloader(true, 'Загрузка...')
    api.setUserAvatar(data)
      .then((resUser) => {
        userInfo.setUserAvatar(resUser);
        popupAvatarForm.close();
      })
      .finally(() => {
        popupAvatarForm.renderPreloader(false);
      })
  }
})

// ф-ия открытия Popup аватара 
popupOpenAvatar.addEventListener('click', () => {
  popupAvatarForm.open();
  validatorForms['update-avatar-form'].clearValidationForm();
})

// ф-ия создания Popup добавления карточки
const popupAddPicture = new PopupWithForm('#add-popup', {
  submitCallback: (data) => {
    popupAddPicture.renderPreloader(true, 'Сохранение...')
    api.addNewCard(data)
      .then((newCard) => {
        cardsSection.prependItem(createCard(newCard, userCurrentId));
        popupAddPicture.close();
      })
      .finally(() => {
        popupAddPicture.renderPreloader(false);
      })
  }
})

// ф-ия открытия Popup добавления карточки
buttonAddPicture.addEventListener('click', () => {
  popupAddPicture.open();
  validatorForms['add-place-popup-form'].clearValidationForm();
});

// ф-ия создания Popup подтверждения удаления
const popupFormDelete = new PopupWithDeletion('#deletion-confirmation', {
  submitCallback: ({id, card}) => {
    popupFormDelete.renderPreloader(true, 'Удаление...');
    api.deleteCard(id)
      .then(() => {
        card.remove();
        card = null;
        popupFormDelete.close();
      })
      .finally(() => {
        popupFormDelete.renderPreloader(false);
      })
  }
})

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
popupAvatarForm.setEventListeners();
popupFormDelete.setEventListeners();