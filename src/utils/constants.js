//Исходный массив для рендера
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const formsConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}

// Popups
const profilePopupContainer = document.querySelector(".popup_type_edit"); //Попап Редактирования
const popupContainerCard = document.querySelector(".popup_type_add"); //Попап добавление карточки
const popupSelector = '.popup_type_review'; //  Попап широкоформатной карточки
const popupChangesAvatar = document.querySelector(".popup_type_update-avatar");//Попап изменения аватарки
const popupDeleteCard = document.querySelector(".popup_type_confirm");//Попап подверждения удаления карточки

//Popup open button
const popupEditOpen = document.querySelector(".profile__edit-button");//Кнопка Редакт. проф
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button"); //Кнопка add card
const buttonOpenAvatar = document.querySelector(".button__avatar-changes")//Кнопка changes ava
const buttonOpenConfirm = document.querySelector(".button__avatar-changes")//Кнопка удаления card

// Инпуты попап профиля
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileBio = document.querySelector('.popup__input_type_description');

// Инпут аватара
const inputProfileImg = document.getElementById('avatar-link')


const contenerCards = '.elements';
const nameSelector = '.profile__user-name'
const infoSelector = '.profile__description'



export {
  initialCards,
  formsConfig,
  infoSelector,
  nameSelector,
  contenerCards,
  popupSelector,
  inputProfileBio,
  inputProfileName,
  popupContainerCard,
  buttonOpenAddCardPopup,
  profilePopupContainer,
  popupEditOpen,
  popupDeleteCard,
  popupChangesAvatar,
  buttonOpenAvatar,
  buttonOpenConfirm,
  inputProfileImg
};
