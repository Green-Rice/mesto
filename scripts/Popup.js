export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  };

  open() {
    console.log('cсначало попап просто')
    this._popup.classList.add('popup_is-opened');
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
  }

  // _handleEscClose() {

  // }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }


};
