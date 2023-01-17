//Берем элемнты из html

const openEditPopup = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__close");
const formDescription = document.querySelector(".popup__form");
let profileUserName = document.querySelector(".profile__user-name");
let profileDescription = document.querySelector(".profile__edit-button");
let userNameInput = document.querySelector(".popup__input_type_name");
let profileDescriptionInput = document.querySelector(".popup__input_type_description");

// Открываем и закрываем окно редактирования профиля

openEditPopup.addEventListener("click", openPopup)
popupBtnClose.addEventListener("click", closePopup)

function openPopup () {
  popupContainer.classList.add("popup__is_opened")
}

function closePopup () {
  popupContainer.classList.remove("popup__is_opened")
}

function EditinProfileName(evt) {

  evt.preventDefault();

  let valueName = userNameInput.value;
  let valueDescription = profileDescriptionInput.value;

  profileUserName.textContent = valueName;
  profileDescription.textContent = valueDescription;

  popupContainer.classList.remove("popup__is_opened")
}


formDescription.addEventListener("submit",EditinProfileName);
