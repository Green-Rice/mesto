export default class Section {
  constructor({ items, renderer }, conteinerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._conteiner = document.querySelector(conteinerSelector)
  }

  renderer() {
    this._items.forEach(element => {
      this._conteiner.append(this._renderer(element));
    });
  }
  //принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._conteiner.prepend(element)
  }

}
