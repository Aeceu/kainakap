import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
const AdminLayout = () => {
  return (
    <div data-theme="light" className="poppins-regular flex flex-col w-full  h-screen">
      <AdminNavbar />
      <Outlet />
    </div>
  );
};
export default AdminLayout;
