import { useState, useEffect, useContext } from "react"
import CurrentUserContext from "../../../../../contexts/CurrentUserContext"
function EditProfile(){
    const userContext = useContext(CurrentUserContext); 
    const { currentUser, handleUpdateUser } = userContext;
    const [name, setName] = useState(currentUser.name||"")
    const [about, setAbout] = useState(currentUser.about||"")
    const [isValid, setIsValid] = useState(false)
    
    function handleNameChange(event){
        setName(event.target.value)
        setIsValid(name.length >= 2 && about.length >= 2)
    }
    function handleAboutChange(event){
        setAbout(event.target.value)
        setIsValid(name.length >= 2 && about.length >= 2)
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 
        handleUpdateUser({ name, about }); 
        setIsValid(false)
    };
    return(
        <form className="form" id="edit-profile__form" name="formEdit" noValidate>
            <fieldset className="form__fieldset">
                <input 
                id="profile-name"
                className="form__input"
                type="text"
                placeholder="name*"
                name="name"
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
                required
                />
                <span className="form__input-error profile-name-error">El campo "Nombre" debe contener entre 2 y 40 caracteres.</span>
                <input 
                id="profile-work"
                type="text"
                className="form__input"
                placeholder="Acerca de mi*"
                name="work"
                minLength="2"
                maxLength="200"
                value={about}
                onChange={handleAboutChange}
                required
                />
                <span className="form__input-error profile-work-error">El campo "Acerca de" debe contener entre 2 y 200 caracteres.</span>
                <button type="submit" 
                    name="saveEdit" 
                    className={`form__button ${!isValid ? "form__button_disabled" : ""}`}
                    disabled={!isValid}
                    onClick={handleSubmit}>
                Guardar
                </button>
            </fieldset>
        </form>  
    )
}

export default EditProfile