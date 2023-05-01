export default class Section {
  constructor({renderer }, conteinerSelector) {
    this._renderer = renderer;
    this._conteiner = document.querySelector(conteinerSelector)
  }

//принимает DOM-элемент и добавляет его в контейнер.
 addItem(item) {
  this._conteiner.prepend(item)
}

  rendererItem(res) {
    res.forEach((item) => {
      this._renderer(item);
    });
  }
};
