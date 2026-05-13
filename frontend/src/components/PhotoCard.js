import "./PhotoCard.css";

function PhotoCard({ image, title }) {
  return (
    <div className="photo-card">
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default PhotoCard;