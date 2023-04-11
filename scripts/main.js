import Card from './Card.js';
import { initialCards, formsConfig } from './cards.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//Берем элемнты из html

const popupEditOpen = document.querySelector(".profile__edit-button");//Кнопка Редактирования

const profilePopupContainer = document.querySelector(".popup_type_edit"); //Попап Редактирования

const buttonOpenAddCardPopup = document.querySelector(".profile__add-button"); //Кнопка добавление карточки
const popupContainerCard = document.querySelector(".popup_type_add"); //Попап добавление карточки

// Инпуты попап профиля
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileBio = document.querySelector('.popup__input_type_description');

const popupSelector = '.popup_type_review';
const contenerCards = '.elements';

//Работа с профилем
const nameSelector = '.profile__user-name'
const infoSelector = '.profile__description'

const handleProfileFormSubmit = ({ user_name, biography }) =>{
  console.log({ user_name, biography })
  userInfo.setUserInfo({ user_name, biography });
  popupProfileForm.close();
}

//СОЗДАНИЯ ПОПАПА С ПРОФИЛЕМ
const popupProfileForm = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
popupProfileForm.setEventListeners();

//создание экземпляра
const userInfo = new UserInfo({
  nameSelector,
  infoSelector
});

const editButtonClickHandler = () => {
  popupProfileForm.open();
  profileValidation.resetValidation();
  setInitialUserInfo(userInfo.getUserInfo());
};

const setInitialUserInfo = ({ user_name, biography }) => {
  inputProfileName.value = user_name;
  inputProfileBio.value = biography;
};

popupEditOpen.addEventListener("click", editButtonClickHandler);

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
