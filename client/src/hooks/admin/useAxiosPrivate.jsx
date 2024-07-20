import { useContext, useEffect } from "react";
import { axiosPrivate } from "../../redux/api";
import useRefreshToken from "./useRefreshToken";
import { UserContext } from "../../context/UserContext";

const useAxiosPrivate = () => {
  const { adminToken } = useContext(UserContext);
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${adminToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err.response.status === 403 && !prevRequest?.send) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseInterceptors);
    };
  }, [refresh, token]);
};

export default useAxiosPrivate;
