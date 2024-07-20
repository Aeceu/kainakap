import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div data-theme="light" className="poppins-regular flex flex-col w-full ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
