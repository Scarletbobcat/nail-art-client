import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

Dropdown.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
};

export default function Dropdown({ items, title }) {
  const [isShown, setIsShown] = useState(false);
  const dropdownRef = useRef();

  // this is to close the dropdown when click happens outside of it
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsShown(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <div className="relative text-left" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsShown(!isShown);
        }}
      >
        {title}
      </button>
      <div
        className={`absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isShown ? "" : "hidden"
        }`}
      >
        <ul id="dropdown">
          {items.map((submenu, index) => (
            <li key={index} className="p-2">
              <Link to={submenu.url}>{submenu.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
