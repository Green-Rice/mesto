import Card from './Card.js';
import { initialCards, formsConfig } from './cards.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//Берем элемнты из html

const popupEditOpen = document.querySelector(".profile__edit-button");//Кнопка Редактирования
const popupBtnCloseList = Array.from(document.querySelectorAll(".popup__close")); //Кнопки закрытия
const profilePopupContainer = document.querySelector(".popup_type_edit"); //Попап Редактирования
const submitBtnFormDescription = document.querySelector(".popup__form");

const buttonOpenAddCardPopup = document.querySelector(".profile__add-button"); //Кнопка добавление карточки
const popupContainerCard = document.querySelector(".popup_type_add"); //Попап добавление карточки

const popupImage = document.querySelector('.popup_type_review');//Попап картинки
const descriptionCardPopup = document.querySelector('.popup__description');
const imgCardPopup = document.querySelector('.popup__img');
const popupAddCardForm = popupContainerCard.querySelector('.popup__form');
const inputAddTitle = popupContainerCard.querySelector('.popup__input_type_title');
const inputAddLink = popupContainerCard.querySelector('.popup__input_type_link');

const profileUserName = document.querySelector(".profile__user-name");
const profileDescription = document.querySelector(".profile__description");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");

const cardTemplate = document.querySelector('.template-element').content;//Темплей элемент
const containerCards = document.querySelector('.elements');//Контейнер для темплев

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileBio = document.querySelector('.popup__input_type_description');

const popupSelector = '.popup_type_review';
const contenerCards = '.elements';
const popupSelectorAddCard = '.popup_type_add';
const nameProfileSelector = '.profile__user-name';
const bioProfileSelector = '.profile__description';


// const userInfo = new UserInfo({nameProfileSelector, bioProfileSelector})
// //Функция редактирования окна
// function handleProfileFormSubmit(evt) {

//   evt.preventDefault();

//   profileUserName.textContent = userNameInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;

//   closePopup(profilePopupContainer);
// };

// //сохранение значений карточки пользователя для формы
// popupEditOpen.addEventListener("click", () => {
//   userNameInput.value = profileUserName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openPopup(profilePopupContainer);
// });

//Работа с профилем

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupProfileForm.close();
}

//СОЗДАНИЯ ПОПАПА С ПРОФИЛЕМ
const popupProfileForm = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
popupProfileForm.setEventListeners();

const editButtonClickHandler = () => {
  popupProfileForm.open();
  profileValidation.resetValidation();
  setInitialUserInfo(userInfo.getUserInfo());
  console.log(document.querySelector('.profile__name'));
  console.log(userInfo.getUserInfo());
};

//обработчики сабмита формы профиля
submitBtnFormDescription.addEventListener("submit", handleProfileFormSubmit);
popupEditOpen.addEventListener("click", editButtonClickHandler);




const userInfo = new UserInfo({
  name: profileUserName.textContent,
  bio: profileDescription.textContent
});

const setInitialUserInfo = ({ name, bio }) => {
  inputProfileName.value = name;
  inputProfileBio.value = bio;
};



//СОЗДАНИЯ ПОПАПА С БОЛЬШОЙ КАРТИНКОЙ
const popupImg = new PopupWithImage(popupSelector);

const handlerClickimg = (data) => {
  popupImg.open(data);
};
popupImg.setEventListeners();

//СОЗДАНИЕ ПОПАПА С ДОБАВЛЕНИЕМ КАРТОЧКИ
function handlerSubmitFormAdd(item) {
  rendererCard.addItem(createElementCard(item));
  popupAddCards.close();
}

const popupAddCards = new PopupWithForm('.popup_type_add', handlerSubmitFormAdd)
popupAddCards.setEventListeners();

buttonOpenAddCardPopup.addEventListener("click", () => {
  popupAddCards.open();
  addCardValidation.resetValidation();
});


//РЕНДЕР КАРТОЧЕК В ДОМ
const dataSection = {
  items: initialCards,
  renderer: createElementCard
}

const initialcardSectionElement = new Section(dataSection, contenerCards)
initialcardSectionElement.rendererItem();

const rendererCard = new Section({ items: {}, createElementCard }, contenerCards)

// Создание экземпляра класса Card
function createElementCard(item) {
  const elementCard = new Card(item, '.template-element', handlerClickimg);
  const newCardElement = elementCard.generateCard();

  return newCardElement;
};



// ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ
const profileValidation = new FormValidator(formsConfig, profilePopupContainer);
const addCardValidation = new FormValidator(formsConfig, popupContainerCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();












// // Открываем окнa попапа
// function openPopup(popupName) {
//   popupName.classList.add("popup_is-opened");

//   document.addEventListener("keydown", handleEscape);
//   document.addEventListener("mousedown", handleOverlay)
// };

// //Функция закрытия попапов
// function closePopup(popupName) {
//   popupName.classList.remove("popup_is-opened");

//   document.removeEventListener("keydown", handleEscape);
//   document.removeEventListener("mousedown", handleOverlay);
// };


// // Закрытие попапа по таргету
// popupBtnCloseList.forEach((btnClose) => {
//   btnClose.addEventListener("click", function (evt) {
//     closePopup(evt.target.closest('.popup'));
//   });
// });

//Закрытие по Escape
// const handleEscape = function (evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_is-opened");
//     closePopup(openedPopup);
//   }
// };

// //Закрытие по оверлею
// const handleOverlay = function (evt) {
//   if (evt.target.classList.contains("popup")) {
//     closePopup(evt.target);
//   }
// };


// const handleAddCardPopup = () => {
//   console.log('нажал на добавление карт')
//   popupAddCards.open();
//   popupAddCards.setEventListeners();
// };




//открытие попапа добавление карточки
// buttonOpenAddCardPopup.addEventListener("click", () => {
//   //console.log('нажал на добавление карт')
//   popupAddCards.open();
//   addCardValidation.checkBtn();
// });



