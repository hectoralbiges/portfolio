import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {

  const API_URL = process.env.REACT_APP_API_URL;

  const [albums, setAlbums] = useState([]);
  const [selected, setSelected] = useState(null);
  const [lineTop, setLineTop] = useState(null);
  const [previewTop, setPreviewTop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const portfolioRef = useRef(null);

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
        const projets = data.filter(a => a.type === "projet");
        if (projets.length > 0) {
          setSelected(projets[0].id);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les albums");
        setLoading(false);
      });

  }, [API_URL]);

  const projets = albums.filter(a => a.type === "projet");
  const voyages = albums.filter(a => a.type === "voyage");
  const selectedAlbum = albums.find(a => a.id === selected);

  useEffect(() => {
    if (!selected || !portfolioRef.current) {
      return;
    }

    const selectedLink = document.querySelector(".album-title.selected");
    if (!selectedLink) {
      return;
    }

    const portfolioRect = portfolioRef.current.getBoundingClientRect();
    const selectedRect = selectedLink.getBoundingClientRect();
    setLineTop(selectedRect.top - portfolioRect.top + selectedRect.height / 2);
  }, [selected, albums]);

  // Keep the preview block at a stable vertical position regardless of the selected label height.
  useEffect(() => {
    function updatePreviewTop() {
      if (!selected) {
        setPreviewTop(null);
        return;
      }

      const viewportHeight = window.innerHeight;
      setPreviewTop(viewportHeight * 0.5);
    }

    updatePreviewTop();
    window.addEventListener('resize', updatePreviewTop);
    window.addEventListener('scroll', updatePreviewTop, { passive: true });
    return () => {
      window.removeEventListener('resize', updatePreviewTop);
      window.removeEventListener('scroll', updatePreviewTop);
    };
  }, [selected, albums]);

  const renderList = (list) =>
    list.map((album) => (
      <div key={album.id} className="album-item">
        <Link
          to={`/album/${album.slug}`}
          className={`album-title ${selected === album.id ? "selected" : ""}`}
          onMouseEnter={() => setSelected(album.id)}
          onClick={() => setSelected(album.id)}
        >
          {album.title}
        </Link>
      </div>
    ));

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="loading">
        loading...
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
    <div className="portfolio" ref={portfolioRef}>

      {/* PROJECTS: full width, left-aligned */}
      <div className="projects-section">
        <div className="category-title">PROJECTS</div>
        {renderList(projets)}
      </div>

      {/* VOYAGES: appears below projects, right-aligned */}
      <div className="voyages-section">
        <div className="category-title">TRAVELS</div>
        {renderList(voyages)}
      </div>

      {selectedAlbum && lineTop !== null && (
        <div
          key={`line-${selected}`}
          className={`selection-line ${selectedAlbum.type}`}
          style={{ top: `${lineTop}px` }}
        />
      )}

      {/* PREVIEW */}
      {selected && (
        <div
          className={`global-preview ${selectedAlbum?.type}`}
          style={previewTop != null ? { top: `${previewTop}px` } : undefined}
        >
          {selectedAlbum?.photos?.slice(0, 3).map((img, i) => (
            <img
              key={`photo-${selected}-${i}`}
              src={img}
              alt={selectedAlbum?.title}
              loading="lazy"
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Portfolio;