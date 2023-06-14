import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./navbar.css"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            find a vet
            <FontAwesomeIcon className="logo_ic" icon={faPaw} />
          </span>
        </Link>
        {user ? user.username : (
          <div className="navItems">
            {/* <Link to="/login">
              <button className="navButtonRegister">Register</button>
            </Link> */}
            <Link to="/login">
              <button className="navButtonLogin">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar