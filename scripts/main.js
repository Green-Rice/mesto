//Берем элемнты из html

const openEditPopup = document.querySelector(".profile__edit-button");//Кнопка Редактирования
const popupBtnClose = document.querySelectorAll(".popup__close"); //Кнопки закрытия
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

const temElement = document.querySelector('.template-element').content;//Темплей элемент
const containerCards = document.querySelector('.elements');//Контейнер для темплев
const elementCard = temElement.querySelector('.element');//Готовая карточка
const deleteCardBtn = document.querySelector('.element__trash');//Кнопка удаления карточки


let profileUserName = document.querySelector(".profile__user-name");
let profileDescription = document.querySelector(".profile__description");
let userNameInput = document.querySelector(".popup__input_type_name");
let profileDescriptionInput = document.querySelector(".popup__input_type_description");


// Функция редактирования окна
function editinProfileName(evt) {

  evt.preventDefault();

  profileUserName.textContent = userNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup();
}

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

initialCards.forEach((elementCard) => publishCard(elementCard));

popupBtnClose.forEach(btn => {
  btn.addEventListener("click", closePopup)
});

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
}

// Функция рендера карточки
function publishCard(elementCard) {
  containerCards.prepend(createCard(elementCard.name, elementCard.link));
}

//Функция удаления карточки
function removeElementCard(evt) {
  evt.target.closest('.element').remove();
}

// Фунция лайк
function addLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

//Функция открытия попапа с картинкой
function openPopupImg(name, link) {
  openPopup(popupReviewBtn);
  imgCardPopup.src = link;
  imgCardPopup.alt = name;
  descriptionCardPopup.textContent = name;
}

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
}

// Функция закрытия попапов
function closePopup() {
  popupContainerCard.classList.remove("popup_is-opened")
  popupContainer.classList.remove("popup_is-opened")
  popupReviewBtn.classList.remove("popup_is-opened")
}



openAddCardPopup.addEventListener("click", () => { openPopup(popupContainerCard) });

formDescription.addEventListener("submit", editinProfileName);
popupAddCardForm.addEventListener('submit', submitAddForm);

openEditPopup.addEventListener("click", () => {
  userNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupContainer);
})
