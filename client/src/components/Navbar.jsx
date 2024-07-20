import { useUserLogout } from "../hooks/user/useLogout";

const Navbar = () => {
  const logout = useUserLogout();
  return (
    <div className="navbar bg-base-100 h-[100px] px-16 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold">KAINAKAP</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <button onClick={logout} className="btn btn-accent text-white shadow-md ">
          Log out
        </button>
      </div>
    </div>
  );
};
export default Navbar;
