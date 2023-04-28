export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(resolve) {
    if (resolve.ok) {
      return resolve.json();
    } else {
      return Promise.reject(`Ошибка ${resolve.status}: ${resolve.statusText}`)
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
    {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.user_name,
          about: data.biography
        })
      })
      .then(res => this._checkResponse(res))
  }

  getStarterCards() {
    return fetch(`${this._baseUrl}/cards`,
    {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }




}

