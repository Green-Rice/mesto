  //Исходный массив для рендера


class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
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
    this._elementCardImage.alt = this._name;
    this._elementCardImage.src = this._link;
    this._element = this._element.querySelector('.element__caption').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._elementCardImage.addEventListener('click', () => {
      this._openPopup(this._name, this._link);
    });

    this._cardElement.querySelector('.element__like-btn').addEventListener('click', (event) => {
      event.target.classList.toggle('element__like-btn_active')
    });

    this._cardElement.querySelector('.element__trash').addEventListener('click', () => {
      this._cardElement.remove();
      this._cardElement = null;
    });
  }

};



//  this_data.forEach((item) => {
//   const card = new Card(item, '.template-element');
//   const cardElement = card.generateCard()
//   document.querySelector('.elements').append(cardElement);
// });

export default Card;
