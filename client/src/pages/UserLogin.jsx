import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../schema/userSignupSchema";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import axios from "../api/axios";
const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSignIn),
  });

  const { setUserId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await axios.post("/user/login", data, {
        withCredentials: true,
      });
      setUserId(res.data.id);
      toast.success(res.data.message);
      navigate("/auth/user/verify");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl">Log in</h1>
      <p className="label text-sm mb-4">Manage your account, qr code and profile information.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 flex flex-col gap-4">
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
        <label className="form-control w-full ">
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
        <div className=" flex flex-col items-end justify-center">
          <p className="mb-4 label flex items-center gap-2 text-sm w-max">
            Don&apos;t have an account ?
            <Link to="/auth/user/signup" className="text-primary font-semibold">
              Sign up
            </Link>
          </p>
          <button
            disabled={loading}
            type="submit"
            className="btn bg-black text-2xl text-white rounded-none w-full h-[60px]">
            {loading ? <Loader2 className="w-10 h-10 animate-spin" /> : "Log in"}
          </button>
          <div className="my-4 w-full flex items-center gap-2">
            <div className="w-full h-[1px] border-b border-black/50" />
            <h1 className="text-sm font-bold">or</h1>
            <div className="w-full h-[1px] border-b border-black/50" />
          </div>
          <Link
            to={"/auth/user/login/qrcode"}
            className="btn bg-[#4A00FF] hover:bg-violet-900 shadow-md text-2xl text-white rounded-none w-full h-[60px]">
            Scan QR Code
          </Link>
        </div>
      </form>
    </div>
  );
};
export default UserLogin;
