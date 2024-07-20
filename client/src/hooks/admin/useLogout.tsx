import { useNavigate } from "react-router-dom";
import axios from "../../redux/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { handleLogout } from "../../redux/slices/adminSlice";

export const useAdminLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logout = async () => {
    dispatch(handleLogout());
    try {
      const res = await axios.get("/admin/logout", {
        withCredentials: true,
      });
      console.log(res.data);
      alert(res.data);
      navigate("/auth/admin/login");
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
