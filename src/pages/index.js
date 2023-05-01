import "../pages/index.css";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import DeletePopup from '../components/DeletePopup.js';
import {
  formsConfig,
  infoSelector,
  nameSelector,
  contenerCards,
  popupSelector,
  avatarSelector,
  inputProfileBio,
  inputProfileName,
  popupContainerCard,
  buttonOpenAddCardPopup,
  profilePopupContainer,
  popupEditOpen,
  popupChangesAvatar,
  buttonOpenAvatar,
  baseUrl,
  token
} from '../utils/constants.js';

// ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ
const profileValidation = new FormValidator(formsConfig, profilePopupContainer);
const addCardValidation = new FormValidator(formsConfig, popupContainerCard);
const avatarValidation = new FormValidator(formsConfig, popupChangesAvatar);
avatarValidation.enableValidation();
profileValidation.enableValidation();
addCardValidation.enableValidation();


//Работа с API
const api = new Api(baseUrl, {
  authorization: token,
  'Content-Type': 'application/json'
})

Promise.all([
  api.getUserInfo(),
  api.getStarterCards()
])
.then(([res, data]) => {
  const { name, about, avatar, _id } = res
  userInfo.setUserInfo({ user_name: res.name, biography: res.about, avatar, _id })
  rendererCard.rendererItem(data.reverse())
})
.catch(err => { console.log(err) })

// Работа с лайками

const setLikes = (data) => {
  api.setLikes(data._data)
  .then(res => {
    data.updateLike(res)
  })
  .catch(err => { console.log(err) })
}

const deleteLikes = (data) => {
  api.deleteLikes(data._data)
  .then(res => {
    data.updateLike(res)
  })
  .catch(err => { console.log(err) })
}


//Работа с профилем
const handleProfileFormSubmit = ({ user_name, biography }) => {
  popupProfileForm.renameButton('Сохранение...')
  api.patchUserInfo({ user_name, biography })
    .then(res => {
      userInfo.setUserInfo({ user_name: res.name, biography: res.about, avatar: res.avatar, _id: res._id })
      popupProfileForm.close();
    })
    .catch(err => { console.log(err) })
    .finally(()=> {
      popupProfileForm.renameButton('Сохранить')
    })
}

//СОЗДАНИЯ ПОПАПА С ПРОФИЛЕМ
const popupProfileForm = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
popupProfileForm.setEventListeners();


//создание экземпляра
const userInfo = new UserInfo({
  nameSelector,
  infoSelector,
  avatarSelector
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
function handlerSubmitFormAdd(data) {
  popupAddCards.renameButton('Сохранение...')
  api.addCardToServer(data)
    .then(data => {
      rendererCard.addItem(createElementCard(data))
      popupAddCards.close();
    })
    .catch(err => { console.log(err) })
    .finally(()=> {
      popupAddCards.renameButton('Создать')
    })
}

const popupAddCards = new PopupWithForm('.popup_type_add', handlerSubmitFormAdd)
popupAddCards.setEventListeners();

buttonOpenAddCardPopup.addEventListener("click", () => {
  popupAddCards.open();
  addCardValidation.resetValidation();
});

//РЕНДЕР КАРТОЧЕК

const rendererCard = new Section({
  renderer: (item) => {
    const cardItem = createElementCard(item);
    rendererCard.addItem(cardItem);
  },
}, contenerCards);

// Создание экземпляра класса Card
function createElementCard(item) {
  const elementCard = new Card(item,
     '.template-element',
      handlerClickimg,
      userInfo.getUserInfo(),
      handlerOpenDeletePopup,
      setLikes,
      deleteLikes);
  const newCardElement = elementCard.generateCard();

  return newCardElement;
};

// СОЗДАНИЕ ПОПАПА УДАЛЕНИЯ КАРТОЧКИ

function handlerDeleteSubmit(data) {
  api.deleteCard(data._data)
    .then(() => {
      data.removeCard();
      deletePopup.close()
    })
    .catch(err => { console.log(err) })
}

const deletePopup = new DeletePopup(".popup_type_confirm", handlerDeleteSubmit)
deletePopup.setEventListeners();

function handlerOpenDeletePopup(data) {
  deletePopup.open(data);
}

// СОЗДАНИЕ ПОПАПА РЕДАКТИРОВАНИЯ АВАТАРКИ

function submitChangeAvatar(data) {
  popupWithAvatar.renameButton('Сохранение...')
  api.patchAvaratImage(data)
  .then(res => {
    userInfo.setUserInfo({ user_name: res.name, biography: res.about, avatar: res.avatar, _id: res._id })
    popupWithAvatar.close();
  })
  .catch(err => { console.log(err) })
  .finally(()=> {
    popupWithAvatar.renameButton('Сохранить')
  })
}

const popupWithAvatar = new PopupWithForm(".popup_type_update-avatar", submitChangeAvatar, 'Сохранить')
popupWithAvatar.setEventListeners();

buttonOpenAvatar.addEventListener("click", () => {
  popupWithAvatar.open();
  avatarValidation.resetValidation();
})
