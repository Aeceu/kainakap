import { useUserLogout } from "../hooks/user/useLogout";

const Navbar = () => {
  const logout = useUserLogout();
  return (
    <div className="navbar bg-base-100 h-[100px] px-16 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-4xl font-bold">KAINAKAP</a>
      </div>
      <button onClick={logout} className="btn btn-accent text-white shadow-md ">
        Log out
      </button>
    </div>
  );
};
export default Navbar;
