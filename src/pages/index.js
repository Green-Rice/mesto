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

api.getUserInfo()
  .then(res => {
    // console.log(res)
    const { name, about, avatar, _id } = res
    userInfo.setUserInfo({ user_name: res.name, biography: res.about, avatar, _id })
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
  api.patchUserInfo({ user_name, biography })
    .then(res => {
      userInfo.setUserInfo({ user_name: res.name, biography: res.about, avatar: res.avatar, _id: res._id })
    })
    .catch(err => { console.log(err) })

  popupProfileForm.close();
}

//СОЗДАНИЯ ПОПАПА С ПРОФИЛЕМ
const popupProfileForm = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit, 'Сохранить');
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
  api.addCardToServer(data)
    .then(data => {
      rendererCard.addItem(createElementCard(data))
    })
    .catch(err => { console.log(err) })
  popupAddCards.close();
}

const popupAddCards = new PopupWithForm('.popup_type_add', handlerSubmitFormAdd, 'Создать')
popupAddCards.setEventListeners();

buttonOpenAddCardPopup.addEventListener("click", () => {
  popupAddCards.open();
  addCardValidation.resetValidation();
});

//РЕНДЕР КАРТОЧЕК

api.getStarterCards()
  .then(res => {
    rendererCard.rendererItem(res.reverse())
  })


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
    }
    )
    .catch(err => { console.log(err) })
    .finally(() => {
      deletePopup.close()
    })

}

const deletePopup = new DeletePopup(".popup_type_confirm", handlerDeleteSubmit)

function handlerOpenDeletePopup(data) {
  deletePopup.open();
  deletePopup.setEventListeners(data)
}

// СОЗДАНИЕ ПОПАПА РЕДАКТИРОВАНИЯ АВАТАРКИ

function submitChangeAvatar(data) {
  api.patchAvaratImage(data)
  .then(res => {
    userInfo.setUserInfo({ user_name: res.name, biography: res.about, avatar: res.avatar, _id: res._id })
  })
  .catch(err => { console.log(err) })

  popupWithAvatar.close();
}

const popupWithAvatar = new PopupWithForm(".popup_type_update-avatar", submitChangeAvatar, 'Сохранить')
popupWithAvatar.setEventListeners();

buttonOpenAvatar.addEventListener("click", () => {
  popupWithAvatar.open();
  avatarValidation.resetValidation();
})


