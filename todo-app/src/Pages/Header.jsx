import { NavLink } from "react-router-dom";

export const Header = () => {
  const links = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    // Add more links as needed
  ];

  return (
    <div className="">
      <div className="fixed top-5 flex items-center w-full justify-center">
        <nav className="bg-black rounded-3xl overflow-hidden">
          <ul className="flex items-center justify-evenly rounded-3xl p-1 gap-1">
            {links.map((item, index) => (
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? " font-medium bg-gray-900 rounded-3xl border  border-gray-600 transform ease-linear duration-500"
                    : ""
                }
                key={index}
              >
                <li
                  key={index}
                  className="p-4 rounded-3xl hover:bg-gray-900 px-14  transition duration-500 ease-in-out"
                >
                  {item.label}
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
