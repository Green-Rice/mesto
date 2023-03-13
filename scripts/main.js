import Card from './Card.js';
import {initialCards, formsConfig} from './cards.js';
import FormValidator from './FormValidator.js';
//Берем элемнты из html

const popupEditOpen = document.querySelector(".profile__edit-button");//Кнопка Редактирования
const popupBtnCloseList = Array.from(document.querySelectorAll(".popup__close")); //Кнопки закрытия
const profilePopupContainer = document.querySelector(".popup_type_edit"); //Попап Редактирования
const formDescription = document.querySelector(".popup__form");

const buttonOpenAddCardPopup = document.querySelector(".profile__add-button"); //Кнопка добавление карточки
const popupContainerCard = document.querySelector(".popup_type_add"); //Попап добавление карточки

const popupImage = document.querySelector('.popup_type_review');//Попап попапа картинки
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

// ПР 7
//Функция открытия попапа с картинкой
function openPopupImg(name, link) {
  openPopup(popupImage);
  imgCardPopup.src = link;
  imgCardPopup.alt = name;
  descriptionCardPopup.textContent = name;
};

// Создание экземпляра класса Card
function createElementCard(item){
  const elementCard = new Card (item,'.template-element', openPopupImg);
  const newCardElement = elementCard.generateCard();

  return newCardElement;
};

// Функция рендера карточки
function publishCard(elementCard) {
  containerCards.prepend(createElementCard(elementCard));
};

// Обработка начального объекта
function renderInitialCards() {
  initialCards.forEach(card => {
    publishCard(card);
  });
}

renderInitialCards();

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

// Открываем окнa попапа
function openPopup(popupName) {
  popupName.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscape);
  document.addEventListener("mousedown", handleOverlay)
};

// Функция закрытия попапов
function closePopup(popupName) {
  popupName.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("mousedown", handleOverlay);
};

popupBtnCloseList.forEach((btnClose) => {
  btnClose.addEventListener("click", function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

//Закрытие по Escape
const handleEscape = function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
};

//Закрытие по оверлею
const handleOverlay = function (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

buttonOpenAddCardPopup.addEventListener("click", () => { openPopup(popupContainerCard) });

formDescription.addEventListener("submit", handleProfileFormSubmit);
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);

popupEditOpen.addEventListener("click", () => {
  userNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profilePopupContainer);
});
