import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const useAdminLogout = () => {
  const { setAdmin, setAdminToken } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await axios.get("/admin/logout", {
        withCredentials: true,
      });
      console.log(res.data);
      alert(res.data);
      setAdmin(null);
      setAdminToken("");
      navigate("/auth/admin/login");
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
