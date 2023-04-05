export default class UserInfo {
  constructor({ name, bio}) {
    this._name = name;
    this._bio = bio;
    this._profileName = document.querySelector('.profile__user-name');
    this._profileBio = document.querySelector('.profile__description');
  }

  getUserInfo(){
    let userInfo = { name: this._profileName.textContent, bio: this._profileBio.textContent }
    return userInfo;
  }

  setUserInfo(){
    this._profileName.textContent = name;
    this._profileBio.textContent = bio;
  }
}
