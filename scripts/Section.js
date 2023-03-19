export default class Section {
  constructor({items, renderer}, conteinerSelector){
    this._items = items;
    this._renderer = renderer;
    this._conteiner = document.querySelector(conteinerSelector)
  }

  renderer(){

  }
  //принимает DOM-элемент и добавляет его в контейнер.
  addItem(){

  }

}
