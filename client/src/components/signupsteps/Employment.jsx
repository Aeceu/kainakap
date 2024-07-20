import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { stepFiveSchema } from "../../schema/userSignupSchema";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Employment = ({ setCurrentStep }) => {
  const { newUser, setNewUser } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepFiveSchema),
    defaultValues: {
      employment: newUser.employment,
      occupation: newUser.occupation,
      yearEmploy: newUser.yearEmploy,
      skill1: newUser.skill1,
      skill2: newUser.skill2,
      yearUnemploy: newUser.yearUnemploy,
      skill3: newUser.skill3,
      skill4: newUser.skill4,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setNewUser({ ...newUser, ...data });
    toast.success("Employment Information done!");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full  grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b flex items-center gap-2">
        Employment Attainment <span className="text-sm text-red-500 font-normal">*optional</span>
      </h1>

      <label className="form-control w-full max-w-xs col-span-4">
        <div className="label">
          <span className="label-text">Employment type</span>
        </div>
        <select className="select select-bordered" {...register("employment")}>
          <option value={""}>Select your employment type</option>
          <option>Student</option>
          <option>Employed</option>
          <option>Unemployed</option>
        </select>{" "}
        {errors.employment && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.employment.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Occupation</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your occupation here..."
          className="input input-bordered w-full max-w-xs"
          {...register("occupation")}
        />
        {errors.occupation && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.occupation.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Months/Years of being employed</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your months/years here..."
          className="input input-bordered w-full max-w-xs"
          {...register("yearEmploy")}
        />
        {errors.yearEmploy && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.yearEmploy.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 1. Skills while being employed</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill1")}
        />
        {errors.skill1 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill1.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 2. Skills while being employed</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill2")}
        />
        {errors.skill2 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill2.message}</span>
          </div>
        )}
      </label>

      <label className="col-start-2 form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Months/Years of being unemployed</span>
        </div>
        <input
          disabled={watch().employment === "Unemployed" ? false : true}
          type="text"
          placeholder="type your months/years here..."
          className="input input-bordered w-full max-w-xs"
          {...register("yearUnemploy")}
        />
        {errors.yearUnemploy && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.yearUnemploy.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 1. Skills while being unemployed</span>
        </div>
        <input
          disabled={watch().employment === "Unemployed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill3")}
        />
        {errors.skill3 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill3.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 2. Skills while being unemployed</span>
        </div>
        <input
          disabled={watch().employment === "Unemployed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill4")}
        />
        {errors.skill4 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill4.message}</span>
          </div>
        )}
      </label>

      <span className="mt-8 col-span-4 flex items-center justify-end gap-4 w-full">
        <button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className="btn gap-1 bg-rose-400 w-max text-white">
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button type="submit" className="btn gap-2 bg-yellow-100 w-max ">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </span>
    </form>
  );
};
export default Employment;
