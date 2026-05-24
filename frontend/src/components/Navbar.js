import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  // Portfolio actif + Album aussi
  const isPortfolioActive =
    location.pathname === "/portfolio" ||
    location.pathname.startsWith("/album");

  return (
    <div className="navbar">
      <div className="nav-grid">

        <NavLink
          to="/portfolio"
          className={() =>
            isPortfolioActive ? "nav-photo active" : "nav-photo"
          }
        >
          Photo
        </NavLink>

        <div></div>
        <div></div>

        <NavLink
          to="/music"
          className={({ isActive }) =>
            isActive ? "nav-music active" : "nav-music"
          }
        >
          Musique
        </NavLink>

      </div>
    </div>
  );
}

export default Navbar;