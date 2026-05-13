import { Link, useParams } from "react-router-dom";
import albums from "../data/albums";
import "./Album.css";
import { useState } from "react";

function Album() {
  const { id } = useParams();

  const album = albums.find((a) => a.id === id);
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  if (!album) return <div>Album introuvable</div>;

  return (

    <div className="album-page">
      <Link to="/portfolio" className="back-button">
        ← Retour
      </Link>

      <h1>{album.title}</h1>
        <div className="album-grid">
          {album.photos.map((photo, index) => (
            <div className="photo-cell" key={index}>
              <img
                key={index}
                src={photo}
                alt=""
                onClick={() => setSelectedImage(photo)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
        {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="" />
        </div>
      )}
    </div>
  );
}

export default Album;