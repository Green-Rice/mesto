export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  };

  open() {
    this._popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    window.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_is-opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
};
