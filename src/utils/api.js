export default class Api{
    constructor(baseUrl){
    this.baseUrl = baseUrl
  }
  _getHeaders(){
    return {Authorization:"39e7e87b-63d8-4747-bf9f-2089ed281080", "Content-Type": "application/json"}
  }
  _checkError(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error: ${res.status}`)
  }
  getAppInfo() {
    return Promise.all([
      this.getUserInfo(),
      this.getInitialCards()
    ])
  }
  changeLikeCardStatus(id, isLiked){
    if(isLiked) return this.like(id)
    else  return this.dislike(id)
  }

  getInitialCards(){
    return fetch(`${this.baseUrl}/cards/`, {
      headers: this._getHeaders()
    })
    .then(res=> this._checkError(res))
    .catch((err) => console.log(err))
  }
  getUserInfo(){
    return fetch(`${this.baseUrl}/users/me`,
      {
        headers: this._getHeaders()
      })
    .then(res=> this._checkError(res))
    .catch((err) => console.log(err))
  }
  setUserInfo(data){
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res=> this._checkError(res))
    .catch((err) => console.log(err))
  }
  setUserAvatar(link){
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res=> this._checkError(res))
    .catch((err) => console.log(err))
  }
  addCard(data){
    return fetch(`${this.baseUrl}/cards/`,{
      method:"POST",
      headers: this._getHeaders(), 
      body: JSON.stringify({
        name:data.name,
        link: data.link
      })
    })
    .then(res=> this._checkError(res))
    .catch((err) => console.log(err))
  }
  dislike(id){
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method:"DELETE",
      headers: this._getHeaders()
    })
    .then(res=> this._checkError(res))
    .catch((err) => console.log(err))
  }
  like(id){
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),    
    }).then(res => this._checkError(res))
    .catch((err) => console.log(err))
  }
  deleteCard(id){
    return fetch(`${this.baseUrl}/cards/${id}`,{
      method: "DELETE",
      headers: this._getHeaders(),    
    })
    .then(res=> this._checkError(res))
    .catch(err => console.log(err))
  }
}


