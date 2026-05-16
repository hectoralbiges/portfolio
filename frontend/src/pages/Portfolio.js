import { useState } from "react";
import { Link } from "react-router-dom";
import albums from "../data/albums";
import "./Portfolio.css";

function Portfolio() {
  const [hovered, setHovered] = useState(null);

  const currentAlbum = albums.find(a => a.id === hovered);

  const projets = albums.filter(a => a.type === "projet");
  const voyages = albums.filter(a => a.type === "voyage");

  const renderList = (list) =>
    list.map((album) => (
      <div
        key={album.id}
        className="album-item"
        onMouseEnter={() => setHovered(album.id)}
        onMouseLeave={() => setHovered(null)}
      >
        <Link to={`/album/${album.id}`} className="album-title">
          {album.title}
        </Link>
      </div>
    ));

  return (
    <div className="portfolio">

      {/* LEFT */}
      <div className="column left">
        <h2>Projets</h2>
        {renderList(projets)}
      </div>

      {/* RIGHT */}
      <div className="column right">
        <h2>Voyages</h2>
        {renderList(voyages)}
      </div>

      {/* 🔥 PREVIEW GLOBAL CENTRÉE */}
      {currentAlbum && (
        <div className="global-preview">
          {currentAlbum.photos.slice(0, 3).map((img, i) => (
            <img key={i} src={img} alt="" />
          ))}
        </div>
      )}

    </div>
  );
}

export default Portfolio;