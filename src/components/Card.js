export default class Card {
  constructor(data, templateSelector, handlerClickimg, api,) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handlerClickimg = handlerClickimg;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementCardImage = this._element.querySelector('.element__img');
    this._elementCardImage.src = this._link;
    this._elementCardImage.alt = this._name;
    this._element.querySelector('.element__caption').textContent = this._name;
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._elementCardImage.addEventListener('click', () => {
      this._handlerClickimg({link: this._link, name: this._name});
    });

    this._elementLikeBtn.addEventListener('click', () => {
      this._elementLikeBtn.classList.toggle('element__like-btn_active')
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._element.remove();
    });
  }

};
