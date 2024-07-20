import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLogin } from "../schema/adminSchema";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "../api/axios";

const AdminLogin = () => {
  const { setAdmin, setAdminToken } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminLogin),
  });

  const nav = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/admin/login", data, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setAdmin(res.data.admin);
      setAdminToken(res.data.accessToken);

      nav("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center gap-2 w-full h-screen">
      <div className="filter blur-[80px] opacity-20 bg-red-500  rounded-full w-[700px] h-[700px] absolute top-10 left-36"></div>
      <div className="filter blur-[80px] opacity-20 bg-violet-500  rounded-full w-[700px] h-[700px] absolute bottom-10"></div>
      <h1 className="text-4xl font-bold text-center ">Welcome to KAINAKAP</h1>
      <p className="text-lg mb-4">Login to your admin account</p>
      <div className="card shadow-2xl bg-base-100 w-[500px] p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body gap-4">
          <label className="form-control w-full">
            <input
              type="email"
              placeholder="Email"
              className={`rounded-none input input-bordered  w-full h-[60px] ${
                errors.email && "input-error"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">{errors.email.message}</span>
              </div>
            )}
          </label>
          <label className="form-control w-full">
            <input
              type="password"
              placeholder="Password"
              className={`rounded-none input input-bordered  w-full h-[60px] ${
                errors.password && "input-error"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">{errors.password.message}</span>
              </div>
            )}
          </label>
          <span className="w-full flex items-center justify-between">
            <div className="form-control">
              <label className="cursor-pointer label gap-2">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-warning" />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <Link to={"/"} className="text-sm link">
              Forgot password?
            </Link>
          </span>

          <div className="form-control gap-2 mt-6 flex items-center justify-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn bg-orange-400 text-white rounded-full w-max px-16">
              {isSubmitting ? <Loader2 className="w-10 h-10 animate-spin" /> : "Login"}
            </button>
            <p className="label flex items-center gap-2 text-sm">
              Don't have an account ?{" "}
              <Link to="/auth/admin/signup" className="text-primary font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
