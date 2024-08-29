import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function Navbar() {
  const navItems = [
    {
      title: "Appointments",
      subMenu: [
        {
          title: "Search",
          url: "/Appointments/Search",
        },
        {
          title: "Calendar",
          url: "/Appointments",
        },
      ],
    },
    { title: "Employees", url: "/Employees" },
    { title: "Services", url: "/Services" },
  ];

  return (
    <>
      <nav>
        <div className="top-0 flex h-16 justify-between items-center mx-auto border-b bg-white">
          <div className="font-bold px-4 text-xl h-full flex items-center">
            <Link to="/" className="h-full flex items-center">
              Nail Art & Spa LLC.
            </Link>
          </div>
          <ul className="flex h-full items-center justify-center cursor-pointer">
            {navItems.map((link, index) => (
              <li key={index} className="text-sm flex h-full items-center">
                {link.subMenu ? (
                  <Dropdown items={link.subMenu} title={link.title} />
                ) : (
                  <Link
                    to={link.url}
                    className="flex h-full items-center hover:bg-neutral-200 px-10"
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
