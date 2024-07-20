import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useState } from "react";
import { handleFile } from "../../utils/HandleFile";
import axios from "../../api/axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const Verification = ({ setCurrentStep }) => {
  const { files, setFiles, setidData } = useContext(UserContext);
  const [isValidID, setIsValidID] = useState(false);
  const [id, setID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id && isValidID) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast.error("Please upload and validate your ID before proceeding.");
      setValidationMessage("Please upload and validate your ID before proceeding.");
    }
  };

  const handleFileChange = async (e, fileType) => {
    await handleFile(e).then(async (res) => {
      try {
        setFiles((prevFiles) => ({ ...prevFiles, [fileType]: res }));
        if (fileType === "valid_id") {
          setFailed(false);
          setLoading(true);
          setValidationMessage("");
          setID(res);
          const idResult = await axios.post("/id/extract", {
            file: res,
          });
          if (idResult.status === 200) {
            setLoading(false);
            setIsValidID(true);
            setidData(idResult.data.resultData);
            setValidationMessage(idResult.data.message);
          } else {
            setFailed(true);
            setID(null);
            setIsValidID(false);
            setLoading(false);
            setValidationMessage("Failed to verify ID. Please try again.");
          }
        }
      } catch (error) {
        console.log(error);
        setValidationMessage(error.response.data.message);
        setFailed(true);
      } finally {
        setLoading(false);
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
            <li>Ensure images are valid</li>
            <li>Text in images should be legible</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className={`font-extrabold text-4xl mb-2 ${loading && "text-red-500 animate-pulse"}`}>
            {loading ? "Validating...." : "Upload your valid ID"}
          </h1>
          <div
            className={`${
              failed && "animate-shake border-red-500"
            } w-[500px] h-[250px] overflow-hidden flex items-center justify-center border rounded-xl shadow-md`}>
            <img
              src={id ? id : "/id.svg"}
              alt="id"
              className="w-full h-full rounded-xl shadow-md"
            />
          </div>
          <input
            onChange={(e) => handleFileChange(e, "valid_id")}
            accept="image/png, image/jpg, image/jpeg"
            type="file"
            className="mt-2 file-input file-input-md file-input-bordered file-input-primary w-3/4"
          />

          {validationMessage && (
            <p className="text-xs text-red-500 font-bold my-2">{validationMessage}</p>
          )}
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

      <span className="flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b">Profile Photo</h1>
        <input
          onChange={(e) => handleFileChange(e, "profilePhoto")}
          accept="image/png, image/jpg, image/jpeg"
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className="flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b">Resume</h1>
        <input
          onChange={(e) => handleFileChange(e, "resume")}
          accept="image/png, image/jpg, image/jpeg"
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className="flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b">PWD ID</h1>
        <input
          onChange={(e) => handleFileChange(e, "pwd_id")}
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className="flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b">Baranggay Residence Certificate</h1>
        <input
          onChange={(e) => handleFileChange(e, "baranggay_residence_certificate")}
          accept="image/png, image/jpg, image/jpeg"
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className="flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b">Medical Certificate</h1>
        <input
          onChange={(e) => handleFileChange(e, "medical_certificate")}
          accept="image/png, image/jpg, image/jpeg"
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className="flex flex-col gap-4">
        <h1 className="font-extrabold text-xl border-b">Proof of Disability</h1>
        <input
          onChange={(e) => handleFileChange(e, "proof_of_disability")}
          accept="image/png, image/jpg, image/jpeg"
          type="file"
          className="file-input file-input-md file-input-bordered file-input-primary w-3/4"
        />
      </span>

      <span className="mt-8 col-span-2 flex items-center justify-end gap-4 w-full">
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
export default Verification;
