import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup)
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._buttonElement = this._form.querySelector('.popup__submit')
  }

  //собираем значения инпутов
  _getInputValues() {
    const inputValue = {};
    this._inputs.forEach((input) => {
      inputValue[input.name] = input.value;
    });
    return inputValue;
  }

  renameButton(nameBtn){
    this._buttonElement.textContent = nameBtn
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
};
