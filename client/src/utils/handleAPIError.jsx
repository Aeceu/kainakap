import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const HandleApiError = (error) => {
  if (error instanceof AxiosError) {
    const axiosErr = error;
    if (typeof axiosErr.response?.data === "string") {
      toast.error(axiosErr.response?.data);
      return axiosErr.response?.data;
    }
    return { message: "Unexpected Error!", user: null };
  }
  return { message: "Unexpected Error!", user: null };
};

export const HandleApiSuccess = (error) => {
  if (error instanceof AxiosError) {
    const axiosErr = error;
    if (typeof axiosErr.response?.data === "string") {
      return axiosErr.response?.data;
    }
  }
};
