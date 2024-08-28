import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Dropdown.propTypes = {
  items: PropTypes.array,
  isShown: PropTypes.bool,
};

export default function Dropdown({ items, isShown }) {
  return (
    <ul id="dropdown" className={isShown ? "hidden" : ""}>
      {items.map((submenu, index) => (
        <li key={index} className="menu-iems">
          <Link to={submenu.url}>{submenu.title}</Link>
        </li>
      ))}
    </ul>
  );
}
