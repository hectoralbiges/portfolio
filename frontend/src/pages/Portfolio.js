import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {

  const API_URL = process.env.REACT_APP_API_URL;

  const [hovered, setHovered] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const currentAlbum = albums.find(a => a.id === hovered);

  useEffect(() => {

    if (!API_URL) {
      setError("API URL not defined");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/albums`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Network error");
        }
        return res.json();
      })
      .then(data => {
        setAlbums(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les albums");
        setLoading(false);
      });

  }, [API_URL]);

  const projets = albums.filter(a => a.type === "projet");
  const voyages = albums.filter(a => a.type === "voyage");

  const renderList = (list) =>
    list.map((album) => (
      <div key={album.id} className="album-item">
        <Link
          to={`/album/${album.slug}`}
          className="album-title"
          onMouseEnter={() => setHovered(album.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {album.title}
        </Link>
      </div>
    ));

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  // 🔥 ERROR STATE
  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return (
    <div className="portfolio">

      {/* LEFT */}
      <div className="column left">
        <div className="category-title">Projets</div>
        {renderList(projets)}
      </div>

      {/* RIGHT */}
      <div className="column right">
        <div className="category-title">Voyages</div>
        {renderList(voyages)}
      </div>

      {/* PREVIEW */}
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