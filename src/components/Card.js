export default class Card {
  constructor(data,
    templateSelector,
    handlerClickimg,
    getterCallback,
    handlerOpenDeletePopup,
    setLikes,
    deleteLikes) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handlerClickimg = handlerClickimg;
    this._countLikesNumber = data.likes.length;
    this._userId = getterCallback._id;
    this._data = data;
    this._clickBtnDelete = handlerOpenDeletePopup;
    this._setLikes = setLikes;
    this._deleteLikes = deleteLikes;
  }


  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  //Проверка пользователя для удаления карточки
  _cheketId() {
    if (this._userId === this._data.owner._id) {
      this._element.querySelector('.element__trash').classList.add('element__trash_active');
    }
  }


  _cheketLikes() {
    return this._data.likes.some((item) => {
      return item._id === this._userId;
    })
  }

  _postLikes(){
    if(this._cheketLikes(this._data.likes)){
      this._deleteLikes(this)
    }
    else {
      this._setLikes(this)
    }
  }


  updateLike = (result) => {
    this._elementLikeCount.textContent = result.likes.length;
    this._elementLikeBtn.classList.toggle('element__like-btn_active');
    this._data.likes = result.likes;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementCardImage = this._element.querySelector('.element__img');
    this._elementCardImage.src = this._link;
    this._elementCardImage.alt = this._name;
    this._element.querySelector('.element__caption').textContent = this._name;
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._elementLikeCount = this._element.querySelector('.element__count');
    this._elementLikeCount.textContent = this._countLikesNumber;
    this._cheketId();
    if (this._cheketLikes(this._data.likes)) {
      this._elementLikeBtn.classList.add('element__like-btn_active')
    }
    this._setEventListeners();
    return this._element;
  };

  removeCard() {
    this._element.remove();
  }



  _setEventListeners() {
    this._elementCardImage.addEventListener('click', () => {
      this._handlerClickimg({ link: this._link, name: this._name });
    });

    this._elementLikeBtn.addEventListener('click', () => {
      this._postLikes(this._data)
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._clickBtnDelete(this);
    });
  }


};
