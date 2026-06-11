import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import { useState, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import Api from "../utils/api"

const api = new Api("https://around-api.es.tripleten-services.com/v1", {Authorization:"39e7e87b-63d8-4747-bf9f-2089ed281080", "Content-Type": "application/json"})
function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [popup, setPopup] = useState(null)

  useEffect(()=>{
    api.getAppInfo()
    .then(([userData, cardsData])=>{
      setCurrentUser(userData)
      setCards(cardsData)
    })
  },[])

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    })
    .catch((error) => console.error(error));
  }
  async function handleCardDelete(cardDelete){
      await api.deleteCard(cardDelete._id)
      .then(()=>{
          setCards(cards.filter(card => card._id !== cardDelete._id))
      })
  }
  async function handleAddPlaceSubmit(data){
    await api.addCard(data)
    .then((newCard) => {
        setCards([newCard, ...cards])
        handleClosePopup()
    })
    .catch((error) => console.error(error))
  }
  function handleOpenPopup(popup){
      setPopup(popup)
  }
  function handleClosePopup() {
      setPopup(null);touch 
  }
  const handleUpdateUser = (data) => {
        api.setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
  };
   const handleUpdateAvatar = (data) => {
        api.setUserAvatar(data.avatar)
       .then((newData) => {
         setCurrentUser(newData);
         handleClosePopup();
       })
       .catch((error) => console.error(error));
  };
  return (
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
    <div className="page">
      <Header/>
      <Main 
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        popup={popup}
        cards={cards} 
        setPopup={setPopup}
        onCardClick={handleCardLike}
        onCardDelete={handleCardDelete}
        onAddPlaceSubmit={handleAddPlaceSubmit}/>
      <Footer/>  
    </div>

    </CurrentUserContext.Provider>
  )
}

export default App
