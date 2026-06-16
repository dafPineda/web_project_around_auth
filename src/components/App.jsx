import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import Login from "./Login/Login"
import Register from "./Register/Register"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"
import { useState, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import Api from "../utils/api"
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import InfoTooltip from "./InfoTooltip/InfoTooltip"
import * as auth from '../utils/auth';

const api = new Api("https://around-api.es.tripleten-services.com/v1")

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [popup, setPopup] = useState(null)
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const [infoTooltip, setInfoTooltip] = useState({ isOpen: false, isSuccess: false });
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth.validToken(token)
    .then((userData) => {
      setUserEmail(userData.data.email);
      setIsLoggedIn(true);
      return api.getAppInfo();
    })
    .then(([profileData, cardsData]) => {
      setCurrentUser(profileData);
      setCards(cardsData);
      navigate("/web_project_around_react/");
    })
    .catch((err) => {
      console.error('Token inválido:', err);
      localStorage.removeItem("jwt");
    });
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
  async function handleRegister(email, password){
    auth.register(email, password)
      .then((data) => {
        navigate("/web_project_around_react/signin")
        console.log('Registro exitoso:', data);
        setInfoTooltip({ isOpen: true, isSuccess: true });
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, isSuccess: false });
        console.error('Error al registrar:', err);
      });
  };

 async function handleLogin(email, password){
  auth.login(email, password)
  .then((data) => {
    localStorage.setItem('jwt', data.token);
    return auth.validToken(data.token);
  })
  .then((userData) => {
    setUserEmail(userData.data.email)
    setIsLoggedIn(true)
    return api.getAppInfo()
  })
  .then(([profileData, cardsData]) => {
    setCurrentUser(profileData);
    setCards(cardsData);
    navigate("/web_project_around_react/");
  })
  .catch((err) => {
    console.error('Error al registrar:', err);
    setInfoTooltip({ isOpen: true, isSuccess: false });
  });
}

  function handleCloseSession(){
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
  }
  return (
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
      <Header isLoggedIn={isLoggedIn} closeSession={handleCloseSession} userEmail={userEmail}/>
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
        <Route path="/web_project_around_react/signin" element={<Login onLogin={handleLogin}/>}/>
        <Route path="/web_project_around_react/signup" element={<Register onRegister={handleRegister}/>}/>

        <Route path="*" element={
          isLoggedIn ? (
            <Navigate to="/" replace/>):(
            <Navigate to="/web_project_around_react/signin" replace/>
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
