import { useContext } from "react";
import TemporaryDrawer from "./Drawer";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
export const Header = () => {
  const links = [
    { label: "Daily Task", link: "/home" },
    { label: "Goal", link: "/goals" },
    // Add more links as needed
  ];
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className=" sticky top-0 w-full  justify-center p-1   border-y-2 border-opacity-30 border-white    items-center z-50 bg-black">
      <nav>
        <ul className=" flex justify-between items-center ">
          <div className="flex flex-row items-center ">
            <div className=" sm:hidden">
              <TemporaryDrawer />
            </div>
            <div className=" relative">
              <button
                className=" text-3xl font-serif font-bold text-teal-600 p-3 px-3  absolute z-50"
                onClick={() => navigate("/home")}
              >
                Wayto
              </button>
              <button
                className="text-3xl font-serif font-bold text-teal-600 p-3 px-3 blur-lg border-x-2 border-teal-600"
                disabled
              >
                Wayto
              </button>
            </div>
          </div>
          <div className=" justify-between items-center hidden sm:flex mr-10">
            {links.map((item, index) => (
              <li key={index} className="p-3 font-mono text-lg">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "p-4 px-6   rounded-lg  bg-gray-900 border-b-2 bg-opacity-70"
                      : "p-4 px-6  "
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </div>
          {state.token ? (
            <li className="font-mono text-lg">
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive
                  ? "p-4 px-6  rounded-lg  bg-gray-900 border-b-2 bg-opacity-70 "
                  : "p-4 px-6 text-gray-400 font-extrabold "
              }
            >
              User
            </NavLink>
          </li>
          ) : (
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
          )}
        </ul>
      </nav>
    </header>
  );
};
