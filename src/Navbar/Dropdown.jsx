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
    <>
      <div
        className="relative text-left h-full hover:bg-neutral-200 px-10"
        ref={dropdownRef}
      >
        <button
          className="h-full"
          onClick={() => {
            setIsShown(!isShown);
          }}
        >
          {title}
        </button>
        <div
          className={`absolute right-0 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            isShown ? "" : "hidden"
          }`}
        >
          <ul id="dropdown">
            {items.map((submenu, index) => (
              <li key={index} className="p-2 hover:bg-neutral-200">
                <Link
                  to={submenu.url}
                  onClick={() => setIsShown(false)}
                  className="block"
                >
                  {submenu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
