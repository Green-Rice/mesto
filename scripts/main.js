//Берем элемнты из html

const openEditPopup = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__close");
const formDescription = document.querySelector(".popup__form");
let profileUserName = document.querySelector(".profile__user-name");
let profileDescription = document.querySelector(".profile__description");
let userNameInput = document.querySelector(".popup__input_type_name");
let profileDescriptionInput = document.querySelector(".popup__input_type_description");

// Открываем и закрываем окно редактирования профиля
function openPopup() {
  userNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  popupContainer.classList.add("popup_is-opened")
}

function closePopup() {

  popupContainer.classList.remove("popup_is-opened")
}

// Функция редактирования окна

function editinProfileName(evt) {

  evt.preventDefault();

  profileUserName.textContent = userNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup();
}


openEditPopup.addEventListener("click", openPopup)
popupBtnClose.addEventListener("click", closePopup)
formDescription.addEventListener("submit", editinProfileName);
