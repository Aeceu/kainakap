import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/admin/useRefreshToken";
import { UserContext } from "../context/UserContext";

const AdminPersistsLogin = () => {
  const { admin, adminToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
        navigate("/auth/admin/login");
      } finally {
        setLoading(false);
      }
    };

    !admin || !adminToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex p-4 justify-center">
          <h1>Loading ....</h1>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default AdminPersistsLogin;
