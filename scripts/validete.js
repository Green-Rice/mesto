const formsConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}

 const formElement = document.querySelector('.popup__form'); //Сама форма
// const formInput = formElement.querySelector('.popup__input');//Поле input в форме
// const formError = formElement.querySelector(`.${formInput.id}-error`);//Span привязанный к Полю input

//Показываем ошибку
const showInputError = (formsConfig, formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Показываем сообщение об ошибке
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorElement.classList.add(formsConfig.errorClass);
  errorElement.textContent = errorMessage;
};

//Скрываем ошибку
const hideInputError = (formsConfig, formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Скрываем сообщение об ошибке
  inputElement.classList.remove(formsConfig.inputErrorClass);
  errorElement.classList.remove(formsConfig.errorClass);
  errorElement.textContent = '';
};

//Слушатели на все поля
const setEventListeners = (formsConfig, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
  const buttonElement = formElement.querySelector(formsConfig.submitButtonSelector);
  toggleButtonState(formsConfig, inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      isValid(formsConfig, formElement, inputElement)
      toggleButtonState(formsConfig, inputList, buttonElement);
    });
  });
};
// Функция, которая проверяет валидность поля
const isValid = (formsConfig, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formsConfig, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formsConfig, formElement, inputElement);
  }
};

//ПРоверка полей на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (formsConfig, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formsConfig.submitButtonSelector);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(formsConfig.submitButtonSelector);
    buttonElement.disabled = false;
  }
};

// Вызовем функцию isValid на каждый ввод символа
//formInput.addEventListener('input', isValid);


const enableValidation = (formsConfig) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    setEventListeners(formsConfig,formElement);
  });
};

// Вызовем функцию
enableValidation(formsConfig);
