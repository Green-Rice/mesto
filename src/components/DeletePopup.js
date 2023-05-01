import Popup from "./Popup.js";

export default class DeletePopup extends Popup {
  constructor(selectorPopup, submitForm){
    super(selectorPopup)
    this._submitForm = submitForm
    this._form = this._popup.querySelector('.popup__form');
  }



  setEventListeners = (data) => {
    this._data = data
    this._form.addEventListener('submit', this._submitDelete)
    super.setEventListeners()
  }

  _submitDelete = (evt) => {
    evt.preventDefault();
    this._submitForm(this._data)
  }

}
