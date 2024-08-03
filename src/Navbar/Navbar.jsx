import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div id="navbar-container">
        <nav id="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Calendar">Appointments</Link>
            </li>
            <li>
              <Link to="/Employees">Employees</Link>
            </li>
            <li>
              <Link to="/Services">Services</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
