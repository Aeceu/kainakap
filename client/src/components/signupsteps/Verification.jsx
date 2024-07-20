import { Bell, ChevronRight } from "lucide-react";
import { useState } from "react";
import { handleFile } from "../../utils/HandleFile";
import axios from "../../api/axios";

const Verification = ({ setCurrentStep }) => {
  const [id, setID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const handleID = async (e) => {
    await handleFile(e).then(async (res) => {
      try {
        setID(res);
        const result = await axios.post("/id/extract", {
          file: res,
        });
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full h-full grid grid-cols-2 place-content-start  gap-4 p-4">
      <div className="relative col-span-2 w-full flex  items-center justify-between p-4">
        <div className=" flex flex-col items-center gap-4 w-1/4 text-xs text-red-500 tracking-widest  p-4 bg-red-100 border border-red-500 rounded-lg shadow-lg">
          <h1 className="flex items-center gap-2 font-extrabold">
            <Bell className="w-4 h-4 shrink-0 text-red-500" />
            Important Application Guidelines:
          </h1>
          <p className="text-xs">
            Please ensure the following requirements are met to proceed with your application:
          </p>
          <ul className="w-full flex flex-col gap-2 list-disc pl-5">
            <li>Upload clear images</li>
            <li>Ensure files and images are valid</li>
            <li>Text in images should be legible</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-4xl mb-2">Upload your valid ID</h1>
          <div className="w-[500px] h-[250px] overflow-hiddend flex items-center justify-center border rounded-xl shadow-md">
            <img
              src={id ? id : "/id.svg"}
              alt="id"
              className=" w-full h-full  rounded-xl shadow-md"
            />
          </div>
          <input
            onChange={handleID}
            accept="image/png, image/gif, image/jpeg"
            type="file"
            className="mt-2 file-input file-input-md file-input-bordered file-input-primary w-3/4"
          />
        </div>

        <div className=" flex flex-col items-center gap-4 w-1/4 text-xs text-emerald-500 tracking-widest  p-4 bg-emerald-100 border border-emerald-500 rounded-lg shadow-lg">
          <h1 className="flex items-center gap-2 font-extrabold  ">
            <Bell className="w-4 h-4 shrink-0 text-emerald-500" />
            Important Application Guidelines:
          </h1>
          <p className="text-xs">Please ensure the uploaded id are in the following:</p>
          <ul className="w-full flex flex-col gap-2 list-disc pl-5">
            <li>PhilHealth ID</li>
            <li>National ID</li>
            <li>Driver's License</li>
          </ul>
        </div>
      </div>

      <span className=" flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b ">Profile Photo</h1>
        <input
          accept="image/png, image/gif, image/jpeg"
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className=" flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b ">Resume</h1>
        <input
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className=" flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b ">PWD ID</h1>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className=" flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b ">Baranggay Residence Certificate</h1>
        <input
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className=" flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b ">Medical Certificate</h1>
        <input
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className=" flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b ">Proof of Disability</h1>
        <input
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className=" col-span-2 flex items-center justify-end w-full">
        <button type="submit" className="btn gap-2 bg-yellow-100 w-max ">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </span>
    </form>
  );
};
export default Verification;
