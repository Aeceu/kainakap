import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BellRing, ChevronRight } from "lucide-react";
import { stepSixSchema } from "../../schema/userSignupSchema";
import { disabilityTypeNotVisible, disabilityTypeVisible } from "../../data/disabilityType";
import { assistiveDevices } from "../../data/assistiveDevices";
import { medications } from "../../data/medications";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Medical = ({ setCurrentStep }) => {
  const { newUser, setNewUser } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepSixSchema),
    defaultValues: {
      blood: newUser.blood,
      height: newUser.height,
      weight: newUser.weight,
      visibility: newUser.visibility,
      disability: newUser.disability,
      made_disabled: newUser.made_disabled,
      status: newUser.status,
      device: newUser.device,
      specificDevice: newUser.specificDevice,
      medicine: newUser.medicine,
      specificMedicine: newUser.specificMedicine,
      others: newUser.others,
    },
  });

  const onSubmit = (data) => {
    console.log(state.newUser);
    setNewUser({ ...newUser, ...data });
    toast.success("Medical Information done!");
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b flex items-center gap-2">
        Medical Information
      </h1>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Blood type</span>
        </div>
        <select className="select select-bordered" {...register("blood")}>
          <option disabled selected>
            Select your blood type
          </option>
          <option>A+</option>
          <option>B+</option>
          <option>O+</option>
          <option>AB+</option>
          <option>A-</option>
          <option>B-</option>
          <option>O-</option>
          <option>AB-</option>
        </select>{" "}
        {errors.blood && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.blood.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Height in CM</span>
        </div>
        <input
          type="text"
          placeholder="type your height here..."
          className="input input-bordered w-full max-w-xs"
          {...register("height")}
        />
        {errors.height && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.height.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Weight in kg</span>
        </div>
        <input
          type="text"
          placeholder="type your weight here..."
          className="input input-bordered w-full max-w-xs"
          {...register("weight")}
        />
        {errors.weight && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.weight.message}</span>
          </div>
        )}
      </label>

      <span className="flex items-end gap-2 justify-center text-red-500">
        <BellRing className="w-8 h-8 mb-2" />
        <label className="text-xs mb-2">
          Kindly type '0' in boxes where there are no possible answer to the information being
          requested.
        </label>
      </span>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Disability Visibility</span>
        </div>
        <select className="select select-bordered" {...register("visibility")}>
          <option disabled selected>
            Select your disability ability
          </option>
          <option>Visible</option>
          <option>Not Visible</option>
        </select>
        {errors.visibility && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.visibility.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Disability Type</span>
        </div>
        <select
          disabled={
            watch().visibility === "Not Visible" || watch().visibility === "Visible" ? false : true
          }
          className="select select-bordered"
          {...register("disability")}>
          <option disabled selected>
            Select your disability type
          </option>
          {watch().visibility === "Visible" &&
            disabilityTypeVisible.map((item, i) => <option key={i}>{item.value}</option>)}
          {watch().visibility === "Not Visible" &&
            disabilityTypeNotVisible.map((item, i) => <option key={i}>{item.value}</option>)}
        </select>
        {errors.disability && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.disability.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">What made you disabled?</span>
        </div>
        <select className="select select-bordered" {...register("made_disabled")}>
          <option disabled selected>
            Select your what made you disabled
          </option>
          <option>Inborn</option>
          <option>Sickness</option>
          <option>Accident</option>
        </select>
        {errors.made_disabled && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.made_disabled.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Health Status</span>
        </div>
        <select className="select select-bordered" {...register("status")}>
          <option disabled selected>
            Select your health status
          </option>
          <option>Good Condition</option>
          <option>Required Assistance</option>
          <option>Confine to bed</option>
        </select>
        {errors.status && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.status.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Assistive Devices</span>
        </div>
        <select className="select select-bordered" {...register("device")}>
          <option disabled selected>
            Select your assistive devices
          </option>
          <option disabled className="text-lg font-bold">
            NO/SPECIFIC DEVICES
          </option>
          {assistiveDevices[0].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
          <option disabled className="text-lg font-bold">
            MOBILITY DEVICES
          </option>
          {assistiveDevices[1].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
          <option disabled className="text-lg font-bold">
            COGNITIVE DEVICES
          </option>
          {assistiveDevices[2].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
          <option disabled className="text-lg font-bold">
            COMMUNICATION DEVICES
          </option>
          {assistiveDevices[3].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
          <option disabled className="text-lg font-bold">
            HEARING DEVICES
          </option>
          {assistiveDevices[4].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
          <option disabled className="text-lg font-bold">
            VISION DEVICES
          </option>
          {assistiveDevices[5].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
        </select>
        {errors.device && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.device.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Specific device used</span>
        </div>
        <input
          disabled={watch().device === "Specify device used" ? false : true}
          type="text"
          placeholder="type your specific device used here..."
          className="input input-bordered w-full max-w-xs"
          {...register("specificDevice")}
        />
        {errors.specificDevice && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">
              {errors.specificDevice.message}
            </span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Current Medicine used</span>
        </div>
        <select className="select select-bordered" {...register("medicine")}>
          {medications[0].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
          <option className="font-bold text-lg">MEDICATION</option>
          {medications[1].options.map((item, i) => (
            <option key={i}>{item.value}</option>
          ))}
        </select>
        {errors.medicine && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.medicine.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Specific medicine used</span>
        </div>
        <input
          disabled={watch().medicine === "Specify Medicine Used" ? false : true}
          type="text"
          placeholder="type your specific medicine used here..."
          className="input input-bordered w-full max-w-xs"
          {...register("specificMedicine")}
        />
        {errors.specificMedicine && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">
              {errors.specificMedicine.message}
            </span>
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

export default Medical;
