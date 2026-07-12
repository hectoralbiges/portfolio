  import { useParams, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";

  import "./Album.css";

  function Album() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);

    const [orientations, setOrientations] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
      fetch(`${API_URL}/albums`)
        .then(res => res.json())
        .then(data => {
          const found = data.find(a => a.slug === id);
          setAlbum(found);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [API_URL, id]);

    useEffect(() => {
      if (!album?.photos) return;
      const load = async () => {
        const result = {};
        
        for (let img of album.photos) {
          const image = new Image();
          image.src = img;

          await new Promise((res) => {
            image.onload = () => {
              result[img] =
                image.width > image.height ? "landscape" : "portrait";
              res();
            };
          });
        }

        setOrientations(result);
      };

      if (album) load();
    }, [album]);
    const openLightbox = (index) => {
      setCurrentIndex(index);
      setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const prevImage = (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((i) => (i - 1 + (album?.photos?.length || 0)) % (album?.photos?.length || 1));
    };

    const nextImage = (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((i) => (i + 1) % (album?.photos?.length || 1));
    };

    // keyboard navigation for lightbox (hook must run unconditionally)
    useEffect(() => {
      if (!lightboxOpen) return;
      const onKey = (ev) => {
        if (ev.key === "Escape") closeLightbox();
        if (ev.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + (album?.photos?.length || 0)) % (album?.photos?.length || 1));
        if (ev.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % (album?.photos?.length || 1));
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [lightboxOpen, album]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!album) return <div>Album not found</div>;

    return (
      <div className="page">

      <div className="album-page">

        <div className="back-btn" onClick={() => navigate(-1)}>
          ← back
        </div>

        <div className="album-title-page">
          {album.title}
        </div>

      <div className="album-grid">
        {album.photos.map((img, i) => (
          <div key={i} className={`img-wrapper ${orientations[img] || ""}`}>

          <img
            src={img}
            className={orientations[img] === "landscape" ? "landscape" : "portrait"}
            alt=""
            onClick={() => openLightbox(i)}
            style={{ cursor: "pointer" }}
          />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(e); }}>&lsaquo;</button>
          <img src={album.photos[currentIndex]} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); nextImage(e); }}>&rsaquo;</button>
        </div>
      )}

      </div>
      </div>
    );
}

  export default Album;