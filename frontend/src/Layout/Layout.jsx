import { Header } from "../Pages/Header.jsx";
import { Routers } from "../Router/Routers.jsx";
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
    </>
  );
};

export default Layout;
