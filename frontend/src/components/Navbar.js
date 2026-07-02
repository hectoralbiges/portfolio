import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  // Portfolio actif + Album aussi
  const isPhotographyActive =
    location.pathname === "/portfolio" ||
    location.pathname.startsWith("/album");

  return (
    <div className="navbar">
      <div className="nav-grid">
        <NavLink
          to="/portfolio"
          className={() =>
            isPhotographyActive ? "nav-photo active" : "nav-photo"
          }
        >
          Photography
        </NavLink>

        <NavLink
          to="/music"
          className={({ isActive }) =>
            isActive ? "nav-music active" : "nav-music"
          }
        >
          Music
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;