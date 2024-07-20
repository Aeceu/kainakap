import axios from "../../redux/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setAdmin, setToken } from "../../redux/slices/adminSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const refresh = async () => {
    const res = await axios.get("/admin/refresh", {
      withCredentials: true,
    });

    dispatch(setAdmin(res.data.admin));
    dispatch(setToken(res.data.accessToken));
    return res.data;
  };
  return refresh;
};
export default useRefreshToken;
