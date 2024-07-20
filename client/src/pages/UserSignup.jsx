import { useContext, useState } from "react";
import Personal from "../components/signupsteps/Personal";
import Address from "../components/signupsteps/Address";
import Emergency from "../components/signupsteps/Emergency";
import Education from "../components/signupsteps/Education";
import Employment from "../components/signupsteps/Employment";
import Medical from "../components/signupsteps/Medical";
import Verification from "../components/signupsteps/Verification";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { UserContext } from "../context/UserContext";

const UserSignup = () => {
  const { newUser } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(6);

  return (
    <div className="w-full h-screen overflow-hidden  flex flex-col items-center bg-orange-50">
      <h1
        onClick={() => console.log(newUser)}
        className="font-bold text-4xl bg-black text-white w-full border-b p-8">
        User Registration Form
      </h1>
      <Link
        to={"/auth/user/login"}
        className="absolute left-0 top-[108px] flex items-center gap-1 shadow-md poppins-semibold text-white font-bold bg-[#4A00FF] p-2 rounded-tr-md rounded-br-md hover:scale-110 duration-300 transition-all">
        <ChevronLeft className="w-5 h-5 " />
        login
      </Link>
      <div className="relative w-3/4 h-full overflow-y-auto bg-white flex flex-col items-center p-8 shadow-md">
        <ul className="w-max shrink-0 steps steps-vertical lg:steps-horizontal gap-4">
          <li
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(0);
              }
            }}
            className={`hover:step-primary  cursor-pointer step ${
              currentStep >= 0 && "step-primary"
            }`}>
            Personal{" "}
          </li>
          <li
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(1);
              }
            }}
            className={`hover:step-primary  cursor-pointer step ${
              currentStep >= 1 && "step-primary"
            }`}>
            Address{" "}
          </li>
          <li
            onClick={() => {
              if (currentStep > 2) {
                setCurrentStep(2);
              }
            }}
            className={`hover:step-primary  cursor-pointer step ${
              currentStep >= 2 && "step-primary"
            }`}>
            Emergency
          </li>
          <li
            onClick={() => {
              if (currentStep > 3) {
                setCurrentStep(3);
              }
            }}
            className={`hover:step-primary  cursor-pointer step ${
              currentStep >= 3 && "step-primary"
            }`}>
            Education
          </li>
          <li
            onClick={() => {
              if (currentStep > 4) {
                setCurrentStep(4);
              }
            }}
            className={`hover:step-primary  cursor-pointer step ${
              currentStep >= 4 && "step-primary"
            }`}>
            Employment
          </li>
          <li
            onClick={() => {
              if (currentStep > 5) {
                setCurrentStep(5);
              }
            }}
            className={`hover:step-primary  cursor-pointer step ${
              currentStep >= 5 && "step-primary"
            }`}>
            Medical{" "}
          </li>
          <li
            onClick={() => {
              if (currentStep > 6) {
                setCurrentStep(6);
              }
            }}
            className={`hover:step-primary  cursor-pointer step ${
              currentStep >= 6 && "step-primary"
            }`}>
            Verification
          </li>
        </ul>
        {currentStep === 0 && <Personal setCurrentStep={setCurrentStep} />}
        {currentStep === 1 && <Address setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && <Emergency setCurrentStep={setCurrentStep} />}
        {currentStep === 3 && <Education setCurrentStep={setCurrentStep} />}
        {currentStep === 4 && <Employment setCurrentStep={setCurrentStep} />}
        {currentStep === 5 && <Medical setCurrentStep={setCurrentStep} />}
        {currentStep === 6 && <Verification setCurrentStep={setCurrentStep} />}
        {/* {currentStep === 7 && <DoneRegister setCurrentStep={setCurrentStep} />} */}
      </div>
    </div>
  );
};
export default UserSignup;
