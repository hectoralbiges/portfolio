import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
        Home
      </NavLink>

      <NavLink to="/portfolio" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
        Portfolio
      </NavLink>
    </nav>
  );
}

export default Navbar;