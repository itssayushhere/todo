import { useLocation } from "react-router-dom";
import { Header } from "../Components/Header/Header.jsx";
import { Routers } from "../Router/Routers.jsx";
const Layout = () => {
  const location = useLocation()
  const hideHeader = location.pathname === '/';
  return (
    <>
    {!hideHeader &&
    <>
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
