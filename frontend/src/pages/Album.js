  import { useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  import "./Album.css";

  function Album() {
    const { id } = useParams();
    
    const [album, setAlbum] = useState(null);
    const [orientations, setOrientations] = useState({});
    const API_URL = process.env.REACT_APP_API_URL;


    const getOrientation = (img) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = img;

        image.onload = () => {
          resolve(image.width > image.height ? "landscape" : "portrait");
        };
      });
    };

    useEffect(() => {
      fetch(`${API_URL}/albums`)
        .then(res => res.json())
        .then(data => {
          const found = data.find(a => a.slug === id);
          setAlbum(found);
        });
    }, [id]);

    useEffect(() => {
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

    if (!album) return <div>Loading...</div>;

    return (
      <div className="page">

      <div className="album-page">

        <h1 className="album-title-page">
          {album.title}
        </h1>

      <div className="album-grid">
        {album.photos.map((img, i) => (
          <div className={`img-wrapper ${orientations[img]}`}>

          <img
            key={i}
            src={img}
            className={orientations[img] === "landscape" ? "landscape" : "portrait"}
            alt=""
          />
          </div>
        ))}
      </div>

      </div>
      </div>
    );
}

  export default Album;