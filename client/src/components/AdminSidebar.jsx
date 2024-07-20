const AdminSidebar = () => {
  return (
    <div className="drawer w-[100px]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content h-full w-[70px] bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300 flex justify-center p-4">
        <label htmlFor="my-drawer" className="drawer-button btn btn-circle">
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AdminSidebar;
