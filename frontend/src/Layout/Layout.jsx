import { useLocation } from "react-router-dom";
import { Header } from "../Pages/Header.jsx";
import { Routers } from "../Router/Routers.jsx";
import Blur from "./Blur.jsx";
const Layout = () => {
  const location = useLocation()
  const hideHeader = location.pathname === '/';
  return (
    <>
    {!hideHeader &&
    <>
     <Blur/>
      <Header />
    </>
      }
      <main>
        <Routers />
      </main>
    </>
  );
};

export default Layout;
