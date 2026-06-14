import { useEffect, useState } from "react";
import EditProfile from "./components/Forms/EditProfile/EditProfile";
import NewCard from "./components/Forms/NewCard/NewCard";
import EditAvatar from "./components/Forms/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import RemoveCard from "./components/RemoveCard/RemoveCard";
import Popup from "./components/Popup/Popup";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({onOpenPopup, onClosePopup, popup, cards, onCardClick, onCardDelete, onAddPlaceSubmit, setPopup}){
    const userContext = useContext(CurrentUserContext)
    const currentUser = userContext.currentUser
    const [selectedCard, setSelectedCard] = useState(null)
    
    const newCardPopup = {title: "Nuevo lugar", children:  <NewCard onPlaceSubmit={onAddPlaceSubmit}/>};
    const editProfilePopup = {title: "Editar perfil", children: <EditProfile/>}
    const editAvatarPopup = {title:"Editar avatar", children:<EditAvatar/>}

    function handleOpenRemovePopup(card) {
        setSelectedCard(card);
        setPopup({
            title: "Borrar foto",
            children: <RemoveCard card={card} />
        });
    }
    function handleOpenImagePopup(card){
        setPopup({
            title:"",
            children:<ImagePopup card={card}/>
        })
    }

    return(
        <div className="main">
          <section className="forms">              
          </section>
          <section className="profile">
              <div className="profile__image" 
                onClick={()=>{onOpenPopup(editAvatarPopup)}}
                style={{backgroundImage:`url(${currentUser.avatar})`}}
                >
                    <div className="edit-icon"/>
              </div>
              <h2 className="profile__name">{currentUser.name}</h2>
              <button type="button" className="profile__button-edit" onClick={()=>{onOpenPopup(editProfilePopup)}} 
                    style={{backgroundImage:`url(${currentUser.avatar})`}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
                      <rect x="2" y="2" width="20" height="20" rx="3" stroke="black" strokeWidth="2" fill="none"/>
                      <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zM20.7 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 
                              3.75 3.75 1.83-1.83z"/>
                  </svg>
              </button>
              <h3 className="profile__ocupation">{currentUser.about}</h3>
              <button type="button" className="profile__button-add" onClick={()=> onOpenPopup(newCardPopup)}>+</button>
          </section>
          <section className="element" id="element">
               <ul className="element">
                    {cards.map((card) => (
                    <Card key={card._id} card={card} onDeleteClick={onCardDelete} onImageClick={handleOpenImagePopup} onCardLike={onCardClick}/>
                    ))}
                </ul>
          </section>
          {popup && (
                <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
                    {popup.children}
                </Popup>
            )} 
        </div>
    )
}
export default Main