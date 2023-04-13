import "../pages/index.css";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';
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
} from '../utils/constants.js';

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

//РЕНДЕР КАРТОЧЕК
 const rendererCard = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardItem = createElementCard(item);
      rendererCard.addItem(cardItem);
    },
  }, contenerCards);

  rendererCard.rendererItem();

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
