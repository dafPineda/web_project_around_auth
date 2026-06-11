import { useState, useRef, useContext} from "react"
import CurrentUserContext from "../../../../../contexts/CurrentUserContext"
function EditAvatar(){
    const avatarRef = useRef(null)
    const userContext = useContext(CurrentUserContext); 
    const { handleUpdateAvatar : onUpdateAvatar } = userContext;
    const [url, setUrl] = useState("")
    const [isValid, setIsValid] = useState(false)
    
    function isValidUrl(string) {
        try {
            new URL(string)
            return true
        } catch {
            return false
        }
    }
    function handleUrlChange(evt){
        const value = evt.target.value
        setUrl(value)
        setIsValid(isValidUrl(value) && value.trim().length > 0)
    }
    function handleSubmit(evt){
        evt.preventDefault();
        let value = onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }
    return(
        <form className="form" id="editPhotoProfile" name="editPhotoProfile">
            <fieldset className="form__fieldset">
                <input 
                    id="photo-link"
                    className="form__input"
                    type="url"
                    name="avatar"
                    placeholder="http://...*"
                    value={url}
                    onChange={handleUrlChange}
                    ref={avatarRef}
                    required
                    />
                <button 
                    type="submit" 
                    className={`form__button ${!isValid ? "form__button_disabled" : ""}`}
                    disabled = {!isValid}
                    onClick={handleSubmit}
                    >Guardar</button>
            </fieldset>  
        </form>
    )
}
export default EditAvatar