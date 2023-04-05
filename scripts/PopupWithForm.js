import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup)
    this._submitForm = submitForm;
    this._form = this._popup = document.querySelector('.popup__form');
    this._inputs = this._popup = document.querySelector('.popup__input');
  }

  _getInputValues() {
    const inputValue = {};
    this._inputs.forEach((item) => {
      inputValue[item.name] = item.value;
    });
    return inputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues())
      //this._handleEscClose();
      //this._close();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
};
