import { useState } from "react"
export default function NewCard({onPlaceSubmit}) {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const isValid = name.trim().length >= 2 && isValidUrl(link)

  const handleOnChangeName = (e) =>{
    setName(e.target.value)
  }
  const handleOnChangeLink = (e) =>{
    setLink(e.target.value)
  }
  function isValidUrl(string) {
    try {
        new URL(string)
        return true
    } catch {
        return false
    }
  }

  function handleSubmit(evt){
    evt.preventDefault()
    onPlaceSubmit({ name, link })
  }
  
  return (
   <form className="forms " id="new-element__form" name="formAdd" noValidate>
            <fieldset className="form__fieldset">
                <input 
                id="new-element__input-name"
                className="form__input"
                type="text"
                placeholder="Title*"
                name="title"
                minLength="2"
                maxLength="30"
                required
                value={name}
                onChange={handleOnChangeName}
                />
                <span className="form__input-error new-element__input-name-error">El campo "Título" debe contener entre 2 y 30 caracteres.</span>
                <input 
                id="new-element__input-link"
                className="form__input"
                placeholder="URL*"
                name="link"
                type="url"
                required
                value={link}
                onChange={handleOnChangeLink}
                />
                <span className="form__input-error new-element__input-link-error">El campo "URL de la imagen" debe contener una URL.</span>
                <button 
                type="submit" 
                name="saveAdd" 
                id="new-element__button" 
                className={`form__button ${!isValid ? "form__button_disabled" : ""}`}
                disabled={!isValid}
                onClick={handleSubmit}>
                Guardar
                </button>
            </fieldset>
    </form>
  );
}