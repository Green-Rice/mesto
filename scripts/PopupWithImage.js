import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector('.popup__img');
    this._title = this._popup.querySelector('.popup__description');
  }

  open({link, name}) {
    this._image.src = link;
    this._image.alt = `картинка ${name}`;
    this._title.textContent = name;
    super.open();
  }
}
