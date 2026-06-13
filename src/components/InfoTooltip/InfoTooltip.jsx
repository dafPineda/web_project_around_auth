import Popup from "../Main/components/Popup/Popup";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} title="">
      <div className={`infoTooltip__image ${isSuccess ? "infoTooltip__image_success" : "infoTooltip__image_error"}`}/>
      <h1 className="infoTooltip__message">
        {isSuccess ? "¡Registro exitoso!" : "Algo salió mal, intenta de nuevo."}
      </h1>
    </Popup>
  );
}
