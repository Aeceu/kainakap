import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      data-theme="light"
      className="poppins-regular flex items-center justify-center w-full h-screen">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
