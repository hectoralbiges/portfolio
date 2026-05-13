import albums from "../data/albums";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
  <div className="portfolio-grid">
      {albums.map((album) => (
        <Link key={album.id} to={`/portfolio/${album.id}`}>
          <div className="album-card">
            <div className="album-image">
              <img src={album.cover} alt={album.title} />
            </div>

            <div className="album-title">
              <h3>{album.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Portfolio;