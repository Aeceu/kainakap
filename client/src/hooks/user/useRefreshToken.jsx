import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../../api/axios";

const useRefreshToken = () => {
  const { setUser, setToken } = useContext(UserContext);
  const refresh = async () => {
    const res = await axios.get("/user/refresh", {
      withCredentials: true,
    });
    setUser(res.data.user);
    setToken(res.data.accessToken);
    return res.data;
  };
  return refresh;
};
export default useRefreshToken;
