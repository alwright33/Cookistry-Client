import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
          <Link className="nav-link" to="/login">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
