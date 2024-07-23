import { NavLink, useNavigate } from "react-router-dom";
export const Header = () => {
  const links = [
    { label: "Home", link: "/home" },
    { label: "About", link: "/about" },
    // Add more links as needed
  ];
  const navigate = useNavigate();
  return (
    <header className=" sticky top-0 w-full  justify-center p-1   border-y-2 border-opacity-30 border-white    items-center z-50   bg-black">
      <nav>
        <ul className=" flex justify-between items-center ">
          <div className=" relative">
          <button
            className=" text-3xl font-serif font-bold text-teal-600 p-3 px-6  absolute z-50"
            onClick={() => navigate("/home")}
            >
            Wayto
          </button>
          <button
            className="text-3xl font-serif font-bold text-teal-600 p-3 px-6 blur-lg border-x-2 border-teal-600"
           disabled >
            Wayto
          </button>
            </div>
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
                  ? "p-4 px-6  rounded-lg  bg-gray-900 border-b-2 bg-opacity-70 "
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
