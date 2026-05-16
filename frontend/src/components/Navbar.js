import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-grid">
        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            isActive ? "nav-photo active" : "nav-photo"
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