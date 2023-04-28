export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      user_name: this._name.textContent,
      biography: this._info.textContent,
      avatar: this._avatar.src,
      _id: this._id
    };
  }

  setUserInfo({ user_name, biography, avatar, _id}) {
    this._id = _id
    this._avatar.src = avatar;
    this._name.textContent = user_name;
    this._info.textContent = biography;
  }
};
