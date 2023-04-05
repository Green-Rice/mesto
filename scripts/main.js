import Card from './Card.js';
import { initialCards, formsConfig } from './cards.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';

//Берем элемнты из html

const popupEditOpen = document.querySelector(".profile__edit-button");//Кнопка Редактирования
const popupBtnCloseList = Array.from(document.querySelectorAll(".popup__close")); //Кнопки закрытия
const profilePopupContainer = document.querySelector(".popup_type_edit"); //Попап Редактирования
const formDescription = document.querySelector(".popup__form");

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



const popupSelector = '.popup_type_review';
const contenerCards = '.elements';
const popupSelectorAddCard = '.popup_type_add';



// Создание экземпляра класса Card
function createElementCard(item) {
  const elementCard = new Card(item, '.template-element', handlerClickimg);
  const newCardElement = elementCard.generateCard();

  return newCardElement;
};

//Создание попапа с картинкой
const popupImg = new PopupWithImage(popupSelector);

const handlerClickimg = (data) => {
  popupImg.open(data);
}
popupImg.setEventListeners();



//Создание попапа добавления карточки
// const handlerSubmitFormAdd = ({ title, data }) => {
//   cardSectionElement.addItem(createElementCard({ name: title, link: data }));
// }

function handlerSubmitFormAdd({ name, link }) {
  cardSectionElement.addItem({ name, link });
  popupAddCards.close();
}

const popupAddCards = new PopupWithForm('.popup_type_add', handlerSubmitFormAdd)


const handleAddCardPopup = () => {
  console.log('нажал на добавление карт')
  popupAddCards.open();
  popupAddCards.setEventListeners();
};

buttonOpenAddCardPopup.addEventListener("click", handleAddCardPopup);


//открытие попапа добавление карточки
// buttonOpenAddCardPopup.addEventListener("click", () => {
//   //console.log('нажал на добавление карт')
//   popupAddCards.open();
//   addCardValidation.checkBtn();
// });



//Рендера карточек
const dataSection = {
  items: initialCards,
  renderer: createElementCard,
}

const cardSectionElement = new Section(dataSection, contenerCards)
cardSectionElement.rendererItem();









// Включение валидации форм
const profileValidation = new FormValidator(formsConfig, profilePopupContainer);
const addCardValidation = new FormValidator(formsConfig, popupContainerCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();





//Функция редактирования окна
function handleProfileFormSubmit(evt) {

  evt.preventDefault();

  profileUserName.textContent = userNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profilePopupContainer);
};

//Функция сохранения
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const addNewCard = {
    name: inputAddTitle.value,
    link: inputAddLink.value
  };
  publishCard(addNewCard);
  popupAddCardForm.reset(); //обнуляем фopму после создания
  closePopup(popupContainerCard);
};




// // Открываем окнa попапа
// function openPopup(popupName) {
//   popupName.classList.add("popup_is-opened");

//   document.addEventListener("keydown", handleEscape);
//   document.addEventListener("mousedown", handleOverlay)
// };

//Функция закрытия попапов
function closePopup(popupName) {
  popupName.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("mousedown", handleOverlay);
};


// Закрытие попапа по таргету
popupBtnCloseList.forEach((btnClose) => {
  btnClose.addEventListener("click", function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

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



//обработчики сабмита форм
formDescription.addEventListener("submit", handleProfileFormSubmit);
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);



//сохранение значений карточки пользователя для формы
popupEditOpen.addEventListener("click", () => {
  userNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profilePopupContainer);
});
