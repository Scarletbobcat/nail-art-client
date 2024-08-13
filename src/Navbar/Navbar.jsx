import { Link } from "react-router-dom";

function Navbar() {
  const navItems = [
    {title: "Appointments", url: "/Appointments"},
    {title: "Employees", url: "/Employees"},
    {title: "Services", url: "/Services"},
  ]

  return (
    <>
      <nav>
          <div className="top-0 flex justify-between mx-auto p-3 items-center border-b">
              <div className="font-bold text-xl">
                <Link to="/">Nail Art</Link>
              </div>
              <ul className="flex gap-8 md:gap-16 items-center justify-center text-center cursor-pointer">
                  {navItems.map((link, index) => (
                    <li key={index} className="text-sm py-2"><Link to={link.url}>{link.title}</Link></li>
                  ))}
              </ul>
          </div>
      </nav>
    </>
  );
}

export default Navbar;