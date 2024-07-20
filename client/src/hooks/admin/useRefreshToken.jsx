import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../../api/axios";

const useRefreshToken = () => {
  const { setAdmin, setAdminToken } = useContext(UserContext);
  const refresh = async () => {
    const res = await axios.get("/admin/refresh", {
      withCredentials: true,
    });

    setAdmin(res.data.admin);
    setAdminToken(res.data.accessToken);
    return res.data;
  };
  return refresh;
};
export default useRefreshToken;
