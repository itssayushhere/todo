import { NavLink } from "react-router-dom"
const links = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  // Add more links as needed
];
const Blur = () => {
  return (
        <header className="fixed top-0 w-full  justify-center p-3   border-y-2 border-white border-opacity-30  blur bg-black items-center z-50">
      <nav>
        <ul className=" flex justify-between items-center ">
        <li className=" text-xs font-semibold text-teal-900  mt-4 m-3  ml-3  px-8 border-8 rounded-full border-teal-300 blur-xl">Wayto</li>
          <div className=" justify-between items-center hidden sm:flex  ">
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
  )
}

export default Blur