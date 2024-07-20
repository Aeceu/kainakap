import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { adminSignup } from "../schema/adminSchema";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axios from "../api/axios";

const AdminSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminSignup),
  });
  const nav = useNavigate();
  const onSubmit = async (data) => {
    try {
      const { repassword, ...adminData } = data;
      const res = await axios.post("/admin/signup", { newAdmin: adminData });
      console.log(res.data);
      toast.success(res.data.message);
      nav("/auth/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-2 w-full h-screen">
      <div className="filter blur-[80px] opacity-20 bg-red-500  rounded-full w-[700px] h-[700px] absolute top-10 left-36"></div>
      <div className="filter blur-[80px] opacity-20 bg-violet-500  rounded-full w-[700px] h-[700px] absolute bottom-10"></div>
      <h1 className="text-4xl font-bold text-center ">Welcome to KAINAKAP</h1>
      <p className="text-lg mb-4">Create your admin account</p>
      <div className="card shadow-2xl bg-base-100 w-[700px] p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body gap-4 grid grid-cols-4">
          <label className="col-span-2 form-control w-full">
            <input
              type="text"
              placeholder="First name"
              className={`rounded-none input input-bordered  w-full h-[60px] ${
                errors.email && "input-error"
              }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">{errors.firstName.message}</span>
              </div>
            )}
          </label>
          <label className="col-span-2 form-control w-full">
            <input
              type="text"
              placeholder="Last name"
              className={`rounded-none input input-bordered  w-full h-[60px] ${
                errors.email && "input-error"
              }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">{errors.lastName.message}</span>
              </div>
            )}
          </label>
          <label className="col-span-2 form-control w-full">
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
          <label className="col-span-2 form-control w-full">
            <input
              type="text"
              placeholder="user name"
              className={`rounded-none input input-bordered  w-full h-[60px] ${
                errors.email && "input-error"
              }`}
              {...register("userName")}
            />
            {errors.username && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">{errors.username.message}</span>
              </div>
            )}
          </label>
          <label className="col-span-4 form-control w-full">
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
          <label className="col-span-4 form-control w-full">
            <input
              type="password"
              placeholder="re-type password"
              className={`rounded-none input input-bordered  w-full h-[60px] ${
                errors.repassword && "input-error"
              }`}
              {...register("repassword")}
            />
            {errors.repassword && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">
                  {errors.repassword.message}
                </span>
              </div>
            )}
          </label>
          <label className="col-span-4 form-control w-full">
            <input
              type="text"
              placeholder="phone"
              className={`rounded-none input input-bordered  w-full h-[60px] ${
                errors.email && "input-error"
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">{errors.phone.message}</span>
              </div>
            )}
          </label>
          <label className="col-span-4 form-control w-full">
            <select
              className={`select select-bordered w-full h-[60px] rounded-none ${
                errors.role && "select-error"
              }`}
              {...register("role")}>
              <option disabled selected>
                What's your role?
              </option>
              <option>Administrative</option>
              <option>Employee</option>
            </select>
            {errors.role && (
              <div className="label">
                <span className="text-md label-text text-red-500 ">{errors.role.message}</span>
              </div>
            )}
          </label>

          <div className="col-span-4 form-control gap-2 mt-6 flex items-center justify-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn bg-orange-400 text-white rounded-full w-max px-16">
              {isSubmitting ? <Loader2 className="w-10 h-10 animate-spin" /> : "Sign up"}
            </button>
            <p className="label flex items-center gap-2 text-sm">
              Already have an account ?
              <Link to="/auth/admin/login" className="text-primary font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminSignup;
