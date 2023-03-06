  //Исходный массив для рендера
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = this.templateSelector;
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

    this._element = document.querySelector('.element__caption').textContent = this._name;
    this._element = document.querySelector('.element__img').alt = this._name;
    this._element = document.querySelector('.element__img').src = this._link;

    return this._element;
  }


};



initialCards.forEach((item) => {
  const card = new Card(item, '.template-element');
  const cardElement = card.generateCard()
  document.querySelector('.elements').append(cardElement);
});

export default Card;
