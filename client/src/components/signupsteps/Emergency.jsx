import { BellRing, ChevronLeft, ChevronRight } from "lucide-react";
import { stepThreeSchema } from "../../schema/userSignupSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WatchAddress from "../../hooks/watchAddress";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const Emergency = ({ setCurrentStep }) => {
  const { newUser, setNewUser } = useContext(UserContext);

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [baranggays, setBarangays] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBaranggay, setSelectedBaranggay] = useState("");
  const [zipCode, setZipCode] = useState("");

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepThreeSchema),
    defaultValue: {
      firstName: newUser.firstName,
      middleName: newUser.middleName,
      lastName: newUser.lastName,
      suffix: newUser.suffix,
      age: newUser.age,
      gender: newUser.gender,
      relationship: newUser.relationship,
      religion: newUser.religion,
      email: newUser.email,
      phone: newUser.phone,
      landline: newUser.landline,
      region: newUser.region,
      province: newUser.provinced,
      city: newUser.cityd,
      baranggay: newUser.baranggay,
      houseno: newUser.houseno,
      street: newUser.street,
      zipcode: newUser.zipcode,
    },
  });

  const onSubmit = (data) => {
    data.region = selectedRegion;
    data.province = selectedProvince;
    data.city = selectedCity;
    data.baranggay = selectedBaranggay;
    console.log(data);
    setNewUser({ ...newUser, emergencyPerson: data });
    toast.success("Emergency information done!");
    setCurrentStep((prev) => prev + 1);
  };

  const watchRegion = watch("region");
  const watchProvince = watch("province");
  const watchCity = watch("city");

  WatchAddress({
    watchCity,
    watchProvince,
    watchRegion,
    selectedBaranggay,
    selectedCity,
    zipCode,
    setZipCode,
    setBarangays,
    setCities,
    setProvinces,
    setRegions,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b">
        Person to contact incase of Emergency
      </h1>

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
          <span className="label-text">Relationship</span>
        </div>
        <select className="select select-bordered" {...register("relationship")}>
          <option value={""}>Pick one</option>
          <option>Mother</option>
          <option>Father</option>
          <option>Brother</option>
          <option>Sister</option>
          <option>Guardian</option>
          <option>Wife</option>
          <option>Husband</option>
          <option>Son</option>
          <option>Daugher</option>
          <option>Grand Children</option>
          <option>Friend</option>
          <option>Other Relative</option>
        </select>
        {errors.relationship && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.relationship.message}</span>
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

      <span className="flex items-end gap-2 justify-center text-red-500">
        <BellRing className="w-8 h-8 mb-2" />
        <label className="text-xs">
          Kindly type 'NA' in boxes where there are no possible answer to the information being
          requested.
        </label>
      </span>

      <h1 className="w-full col-span-4 text-3xl font-bold mt-4 border-b">
        Home/Permanent Address Information
      </h1>

      <Controller
        name="region"
        control={control}
        render={({ field }) => (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Region</span>
            </div>
            <select
              className="select select-bordered"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setSelectedRegion(e.target[e.target.selectedIndex].innerText);
                setProvinces([]);
                setCities([]);
                setBarangays([]);
              }}>
              <option value="">Select a region</option>
              {regions.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.region && (
              <div className="label">
                <span className="text-xs label-text text-red-500">{errors.region.message}</span>
              </div>
            )}
          </label>
        )}
      />

      <Controller
        name="province"
        control={control}
        render={({ field }) => (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Province</span>
            </div>
            <select
              className="select select-bordered"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setSelectedProvince(e.target[e.target.selectedIndex].innerText);
                setCities([]);
                setBarangays([]);
              }}
              disabled={provinces.length <= 0}>
              <option value="">Select a province</option>
              {provinces.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.province && (
              <div className="label">
                <span className="text-xs label-text text-red-500">{errors.province.message}</span>
              </div>
            )}
          </label>
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">City/Municipality</span>
            </div>
            <select
              className="select select-bordered"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setSelectedCity(e.target[e.target.selectedIndex].innerText);
                setBarangays([]);
              }}
              disabled={cities.length <= 0}>
              <option value="">Select a city/municipality</option>
              {cities.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <div className="label">
                <span className="text-xs label-text text-red-500">{errors.city.message}</span>
              </div>
            )}
          </label>
        )}
      />

      <Controller
        name="baranggay"
        control={control}
        render={({ field }) => (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Barangay</span>
            </div>
            <select
              className="select select-bordered"
              {...field}
              disabled={baranggays.length <= 0}
              onChange={(e) => {
                field.onChange(e);
                setSelectedBaranggay(e.target[e.target.selectedIndex].innerText);
              }}>
              <option value="">Select a baranggay</option>
              {baranggays.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.baranggay && (
              <div className="label">
                <span className="text-xs label-text text-red-500">{errors.baranggay.message}</span>
              </div>
            )}
          </label>
        )}
      />

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Street</span>
        </div>
        <input
          type="text"
          disabled={!watch().baranggay}
          placeholder="type your street here..."
          className="input input-bordered w-full max-w-xs"
          {...register("street")}
        />
        {errors.street && (
          <div className="label">
            <span className="text-xs label-text text-red-500">{errors.street.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">House no.,apt,courtside</span>
        </div>
        <input
          type="text"
          disabled={!watch().baranggay}
          placeholder="type your house no., apartment, etc here..."
          className="input input-bordered w-full max-w-xs"
          {...register("houseno")}
        />
        {errors.houseno && (
          <div className="label">
            <span className="text-xs label-text text-red-500">{errors.houseno.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">zipcode</span>
        </div>
        <input
          type="text"
          disabled={!watch().baranggay}
          placeholder="type your zipcode here..."
          className="input input-bordered w-full max-w-xs"
          defaultValue={zipCode}
          {...register("zipcode")}
        />
        {errors.zipcode && (
          <div className="label">
            <span className="text-xs label-text text-red-500">{errors.zipcode.message}</span>
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
export default Emergency;
