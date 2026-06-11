export default function Card(props) {
  const {card, onDeleteClick, onImageClick, onCardLike} = props
  const { name, link, isLiked} = card;
  return (
    <li className="element__card">
      <img className="element__card-image" src={link} alt={name} onClick={()=>{onImageClick(card)}}/>
      <button
        aria-label="Delete card"
        className="element__card-trash"
        type="button"
        onClick={() => onDeleteClick(card)}
      />
      <div className="element__card-info">
        <h2 className="element__card-text">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={`element__card-heart ${isLiked ? "element__card-heart_active" : "" }`}
          onClick={()=> onCardLike(card)}
        />
      </div>
    </li>
  );
}