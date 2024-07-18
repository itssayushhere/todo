import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const links = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    // Add more links as needed
  ];
  const navigate = useNavigate();
  return (
    <header className="max-[480px]:hidden">
      <div className="fixed top-5 flex items-center w-full justify-between px-5">
        <div>
          <button
            className="p-5 bg-white bg-opacity-10 rounded-full border border-black"
            onClick={() => navigate("/")}
          >
            Do Your Work
          </button>
        </div>
        <nav className="flex justify-between items-center w-full ml-10">
          <div className="bg-black rounded-3xl overflow-hidden">
            <ul className="flex items-center justify-evenly p-1 gap-1">
              {links.map((item, index) => (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium bg-gray-900 rounded-3xl border border-gray-600 transition ease-in-out duration-500"
                      : ""
                  }
                  key={index}
                >
                  <li
                    key={index}
                    className="p-5 rounded-3xl hover:bg-gray-900 transition duration-500 ease-in-out"
                  >
                    {item.label}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="bg-black rounded-3xl overflow-hidden ml-5">
            <ul className="flex items-center justify-evenly p-1 gap-1">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium bg-gray-900 rounded-3xl border border-gray-600 transition ease-in-out duration-500"
                    : ""
                }
              >
                <li className="p-5 rounded-3xl hover:bg-gray-900 transition duration-500 ease-in-out">
                  Login
                </li>
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};
