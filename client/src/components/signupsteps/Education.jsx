import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { stepFourSchema } from "../../schema/userSignupSchema";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const Education = ({ setCurrentStep }) => {
  const { newUser, setNewUser } = useContext(UserContext);
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      elementary: newUser.elementary,
      attain: newUser.attain,
      highschool: newUser.highschool,
      attain1: newUser.attain1,
      senior: newUser.senior,
      attain2: newUser.attain2,
      college: newUser.college,
      attain3: newUser.attain3,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setNewUser({ ...newUser, ...data });
    toast.success("Education information done!");
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full  grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b flex items-center gap-2">
        Educational Attainment <span className="text-sm text-red-500 font-normal">*optional</span>
      </h1>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of elementary school</span>
        </div>
        <input
          type="text"
          placeholder="type your elementary here..."
          className="input input-bordered w-full "
          {...register("elementary")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
      </label>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of highschool school</span>
        </div>
        <input
          type="text"
          placeholder="type your highschool here..."
          className="input input-bordered w-full "
          {...register("highschool")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain1")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
      </label>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of senior highschool school</span>
        </div>
        <input
          type="text"
          placeholder="type your senior highschool here..."
          className="input input-bordered w-full "
          {...register("senior")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain2")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
      </label>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of college school</span>
        </div>
        <input
          type="text"
          placeholder="type your college here..."
          className="input input-bordered w-full "
          {...register("college")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain3")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
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
export default Education;
