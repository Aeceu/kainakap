import { useAdminLogout } from "../hooks/admin/useLogout";

const AdminNavbar = () => {
  const logout = useAdminLogout();
  return (
    <div className="navbar bg-base-100 h-[100px] px-16 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold">KAINAKAP</a>
      </div>
      <div className="flex-none">
        <button onClick={logout} className="btn btn-accent text-white shadow-md ">
          Log out
        </button>
      </div>
    </div>
  );
};
export default AdminNavbar;
