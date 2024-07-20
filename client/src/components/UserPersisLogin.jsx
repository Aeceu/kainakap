import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/user/useRefreshToken";
import { UserContext } from "../context/UserContext";

const UserPersistsLogin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { user, token } = useContext(UserContext);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
        navigate("/auth/user/login");
      } finally {
        setLoading(false);
      }
    };

    !user || !token ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div
          data-theme="light"
          className="poppins-regular flex items-center justify-center w-full h-screen animate-pulse">
          <h1>Loading ....</h1>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default UserPersistsLogin;
