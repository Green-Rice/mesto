import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector('.popup__img');
    this._title = this._popup.querySelector('.popup__description');
  }



  open(data) {
    super.open();
    this._image.src = data.link;
    this._image.alt = `картинка ${data.name}`;
    this._title.textContent = data.name;
  }
}
