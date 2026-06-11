export default function Popup(props) {
  const { onClose, title, children, isOpen } = props;
  
  return (
    <div className={`popup ${isOpen ? "popup__open": ""}`}>
      <div
        className = {`popup__block ${!title ? "popup__content_content_image" : ""}`}
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <h3 className="form__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
