import { BellRing, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema } from "../../schema/userSignupSchema";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Personal = ({ setCurrentStep }) => {
  const { newUser, setNewUser } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      firstName: newUser.firstName,
      middleName: newUser.middleName,
      lastName: newUser.lastName,
      suffix: newUser.suffix,
      age: newUser.age,
      birthdate: newUser.birthdatell,
      birthplace: newUser.birthplace,
      gender: newUser.gender,
      religion: newUser.religion,
      citizenship: newUser.citizenship,
      civil: newUser.civil,
      email: newUser.email,
      phone: newUser.phone,
      landline: newUser.landline,
      password: newUser.password,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setNewUser({ ...newUser, ...data });
    toast.success("Personal Information Done!");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b">Personal Information</h1>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Lastname</span>
        </div>
        <input
          type="text"
          placeholder="type your lastname here..."
          className="input input-bordered w-full max-w-xs"
          {...register("lastName")}
        />
        {errors.lastName && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.lastName.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Firstname</span>
        </div>
        <input
          type="text"
          placeholder="type your firstname here..."
          className="input input-bordered w-full max-w-xs"
          {...register("firstName")}
        />
        {errors.firstName && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.firstName.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Middlename</span>
        </div>
        <input
          type="text"
          placeholder="type your middlename here..."
          className="input input-bordered w-full max-w-xs"
          {...register("middleName")}
        />
        {errors.middleName && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.middleName.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Suffix</span>
        </div>
        <input
          type="text"
          placeholder="type your suffix here..."
          className="input input-bordered w-full max-w-xs"
          {...register("suffix")}
        />
        {errors.suffix && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.suffix.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Age</span>
        </div>
        <input
          type="number"
          placeholder="type your age here..."
          className="input input-bordered w-full max-w-xs"
          {...register("age")}
        />
        {errors.age && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.age.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Birthdate</span>
        </div>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          {...register("birthdate")}
        />
        {errors.birthdate && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.birthdate.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Place of birth</span>
        </div>
        <input
          type="text"
          placeholder="type your birth place here..."
          className="input input-bordered w-full max-w-xs"
          {...register("birthplace")}
        />
        {errors.birthplace && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.birthplace.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <select className="select select-bordered" {...register("gender")}>
          <option value={""}>Pick one</option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>
        {errors.gender && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.gender.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Religion</span>
        </div>
        <select className="select select-bordered" {...register("religion")}>
          <option value={""}>Pick one</option>
          <option>Roman Catholic</option>
          <option>Catholic</option>
          <option>Iglesia ni Cristo</option>
          <option>Born again</option>
          <option>Dating Daan</option>
          <option>Baptist</option>
          <option>Islam</option>
        </select>
        {errors.religion && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.religion.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Citizenship</span>
        </div>
        <input
          type="text"
          placeholder="type your citizenship here..."
          className="input input-bordered w-full max-w-xs"
          {...register("citizenship")}
        />
        {errors.citizenship && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.citizenship.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Civil Status</span>
        </div>
        <select className="select select-bordered" {...register("civil")}>
          <option value={""}>Pick one</option>
          <option>Single</option>
          <option>Married</option>
          <option>Legally Separated</option>
          <option>Widowed</option>
          <option>Solo Parent</option>
        </select>
        {errors.civil && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.civil.message}</span>
          </div>
        )}
      </label>

      <h1 className="w-full col-span-4 text-3xl font-bold mt-4 border-b">Contact Information</h1>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="type your email here..."
          className="input input-bordered w-full max-w-xs"
          {...register("email")}
        />
        {errors.email && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.email.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          placeholder="type your password here..."
          className="input input-bordered w-full max-w-xs"
          {...register("password")}
        />
        {errors.password && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.password.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Retype Password</span>
        </div>
        <input
          type="password"
          placeholder="re-type your password here..."
          className="input input-bordered w-full max-w-xs"
          {...register("repassword")}
        />
        {errors.repassword && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.repassword.message}</span>
          </div>
        )}
      </label>

      <span className="flex items-end gap-2 justify-center text-red-500">
        <BellRing className="w-8 h-8 mb-2" />
        <label className="text-xs">
          Kindly type 'NA' in boxes where there are no possible answer to the information being
          requested.
        </label>
      </span>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Mobile No.</span>
        </div>
        <input
          type="number"
          placeholder="type your phone number here..."
          className="input input-bordered w-full max-w-xs"
          {...register("phone")}
        />
        {errors.phone && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.phone.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Landline No.</span>
        </div>
        <input
          type="number"
          placeholder="type your landline number here..."
          className="input input-bordered w-full max-w-xs"
          {...register("landline")}
        />
        {errors.landline && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.landline.message}</span>
          </div>
        )}
      </label>

      <span className="mt-8 col-span-4 flex items-center justify-end w-full">
        <button type="submit" className="btn gap-2 bg-yellow-100 w-max ">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </span>
    </form>
  );
};
export default Personal;
