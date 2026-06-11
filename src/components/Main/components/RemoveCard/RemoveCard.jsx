export default function RemoveCard(){
    return(
        <form className="form" id="confirmation__form" name="formConfirmation" noValidate>
            <fieldset className="form__fieldset">
                <p className="form__title">¿Deseas eliminar este elemento? Esta acción no se puede deshacer.</p>
                <button type="submit" className="form__button">Confirmar</button>
            </fieldset>
        </form>
    )
}