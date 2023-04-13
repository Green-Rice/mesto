export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      user_name: this._name.textContent,
      biography: this._info.textContent
    };
  }

  setUserInfo({ user_name, biography }) {
    this._name.textContent = user_name;
    this._info.textContent = biography;
  }
};
