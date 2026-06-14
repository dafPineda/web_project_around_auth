import Popup from "../Main/components/Popup/Popup";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) { 
  return (
    <Popup className="popup popup__block infoTooltip" isOpen={isOpen} onClose={onClose} title=" ">
      <div className={`infoTooltip__image ${isSuccess ? "infoTooltip__image_success" : "infoTooltip__image_error"}`}/>
      <h1 className="form__title infoTooltip__text">{isSuccess ? "¡Correcto! Ya estás registrado." : "Uy, algo salió mal. Por favor, inténtalo de nuevo"}</h1>
    </Popup>
  );
}
