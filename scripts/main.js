//Берем элемнты из html

const popupEditOpen = document.querySelector(".profile__edit-button");//Кнопка Редактирования
const popupBtnClose = Array.from(document.querySelectorAll(".popup__close")); //Кнопки закрытия
const popupContainer = document.querySelector(".popup_type_edit"); //Попап Редактирования
const formDescription = document.querySelector(".popup__form");

const openAddCardPopup = document.querySelector(".profile__add-button"); //Кнопка добавление карточки
const popupContainerCard = document.querySelector(".popup_type_add"); //Попап добавление карточки

const popupReviewBtn = document.querySelector('.popup_type_review');//Попап попапа картинки
const descriptionCardPopup = document.querySelector('.popup__description');
const imgCardPopup = document.querySelector('.popup__img');
const popupAddCardForm = popupContainerCard.querySelector('.popup__form');
const inputAddTitle = popupContainerCard.querySelector('.popup__input_type_title');
const inputAddLink = popupContainerCard.querySelector('.popup__input_type_link');

const profileUserName = document.querySelector(".profile__user-name");
const profileDescription = document.querySelector(".profile__description");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");

const temElement = document.querySelector('.template-element').content;//Темплей элемент
const containerCards = document.querySelector('.elements');//Контейнер для темплев
const elementCard = temElement.querySelector('.element');//Готовая карточка
const deleteCardBtn = document.querySelector('.element__trash');//Кнопка удаления карточки

//Карточки из коробки
initialCards.forEach((elementCard) => publishCard(elementCard));

// Функция создания карточки
function createCard(name, link) {
  //Переносим шаблон
  const newElemCard = elementCard.cloneNode('true');
  //Переменная для заполнения артибутов src, alt и добавление названия в заголовок карточки
  const newElemCardImg = newElemCard.querySelector('.element__img');
  newElemCard.querySelector('.element__caption').textContent = name;
  newElemCardImg.src = link;
  newElemCardImg.alt = name;
  //Вызов функции "Поставить лайк!"
  newElemCard.querySelector('.element__like-btn').addEventListener('click', addLike);
  //Вызов функции удаления карточки
  newElemCard.querySelector('.element__trash').addEventListener('click', removeElementCard);
  //Открытие полноразменого попапа с картинкой
  newElemCardImg.addEventListener('click', () => openPopupImg(name, link));
  return newElemCard;
};

// Функция рендера карточки
function publishCard(elementCard) {
  containerCards.prepend(createCard(elementCard.name, elementCard.link));
};

//Функция удаления карточки
function removeElementCard(evt) {
  evt.target.closest('.element').remove();
};

// Фунция лайк
function addLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
};

// Функция редактирования окна
function editinProfileName(evt) {

  evt.preventDefault();

  profileUserName.textContent = userNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(popupContainer);
};

//Функция открытия попапа с картинкой
function openPopupImg(name, link) {
  openPopup(popupReviewBtn);
  imgCardPopup.src = link;
  imgCardPopup.alt = name;
  descriptionCardPopup.textContent = name;
};

//Функция сохранения
function submitAddForm(evt) {
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

popupBtnClose.forEach((btnClose) => {
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


openAddCardPopup.addEventListener("click", () => { openPopup(popupContainerCard) });

formDescription.addEventListener("submit", editinProfileName);
popupAddCardForm.addEventListener('submit', submitAddForm);

popupEditOpen.addEventListener("click", () => {
  userNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupContainer);
});

