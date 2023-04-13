import "../pages/index.css";
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import {
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
  popupEditOpen
} from '../scripts/constants.js';

//Работа с профилем
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
