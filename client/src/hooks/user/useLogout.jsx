import { useNavigate } from "react-router-dom";
import axios from "../../redux/api";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const useUserLogout = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(UserContext);
  const logout = async () => {
    try {
      const res = await axios.get("/user/logout", {
        withCredentials: true,
      });
      setUser(null);
      setToken(null);
      console.log(res.data);
      navigate("/auth/user/login");
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
