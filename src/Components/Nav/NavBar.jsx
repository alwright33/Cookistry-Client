import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/recipes">
            Recipes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/saved-recipes">
            Saved Recipes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/new-recipe">
            Share a Recipe
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link logout-button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
