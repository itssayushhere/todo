import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const links = [
    { label: "Home", link: "/home" },
    { label: "Goal", link: "/goals" },
    // Add more links as needed
  ];
  return (
    <div>
      <button onClick={toggleDrawer(true)} className=" opacity-55">
        <MenuIcon />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className=" bg-gray-950 h-full w-full bg-opacity-80">
          <nav className="text-white mt-24 ">
            <ul>
            <div className=" ">
            {links.map((item, index) => (
              <li key={index} className="mb-6 font-mono text-lg w-full ">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "p-3 px-10 bg-gray-950 bg-opacity-70 border-y-2 border-white border-opacity-60"
                      : "p-3 px-10 "
                  }
                  onClick={toggleDrawer(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </div>
            </ul>
          </nav>
        </div>
      </Drawer>
    </div>
  );
}
