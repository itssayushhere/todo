import { NavLink, useNavigate } from "react-router-dom";
export const Header = () => {
  const links = [
    { label: "Home", link: "/home" },
    { label: "About", link: "/about" },
    // Add more links as needed
  ];
  const navigate = useNavigate();
  return (
    <header className=" fixed top-0 w-full  justify-center p-3   border-y-2 border-white border-opacity-10  items-center z-50">
      <nav>
        <ul className=" flex justify-between items-center ">
          <button
            className="text-3xl font-serif font-bold text-teal-600 p-3 px-6"
            onClick={() => navigate("/")}
          >
            Wayto
          </button>
          <div className=" justify-between items-center hidden sm:flex">
            {links.map((item, index) => (
              <li key={index} className="p-3 font-mono text-lg">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "p-4 px-6  rounded-lg  bg-gray-900 border-b-2 bg-opacity-70"
                      : "p-4 px-6 "
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </div>
          <li className="font-mono text-lg">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "p-4 px-6  rounded-lg  bg-gray-900 border-b-2 bg-opacity-70"
                  : "p-4 px-6 "
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};