import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import Login from "./Login/Login"
import Register from "./Register/Register"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"
import { useState, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import Api from "../utils/api"
import { Routes, Route, Navigate } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip/InfoTooltip"

const api = new Api("https://around-api.es.tripleten-services.com/v1", {Authorization:"39e7e87b-63d8-4747-bf9f-2089ed281080", "Content-Type": "application/json"})

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [popup, setPopup] = useState(null)
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const [infoTooltip, setInfoTooltip] = useState({ isOpen: false, isSuccess: false });


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
  function handleCloseInfoTooltip() {
    setInfoTooltip({ isOpen: false, isSuccess: false });
  }
  return (
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
      <Header/>
      <Routes className="page">
        <Route
          path="/" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main 
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}
                cards={cards} 
                setPopup={setPopup}
                onCardClick={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}/>
            </ProtectedRoute>
          }
            />
        <Route path="/signup" element={<Login/>}/>
        <Route path="/signin" element={<Register/>}/>

        <Route path="*" element={
          isLoggedIn ? (
            <Navigate to="/" replace/>):(
            <Navigate to="/signin" replace/>
          )
        }/> 
      </Routes>
      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={handleCloseInfoTooltip}
        isSuccess={infoTooltip.isSuccess}
      />
      <Footer/>  
    </CurrentUserContext.Provider>
  )
}

export default App
