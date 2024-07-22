import Bounce from "../animation/bounce";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "../../api/axios";

const DoneRegister = ({ setCurrentStep }) => {
  const {
    setNewUser,
    setFiles,
    newUser,
    files,
    registrationStatus,
    setRegistrationStatus,
    idData,
    setUserId,
  } = useContext(UserContext);

  useEffect(() => {
    const handleRegister = async () => {
      try {
        setRegistrationStatus("pending");
        const res = await axios.post("/user/signup", {
          newUser,
          files,
          idData,
        });
        console.log(res.data);
        setRegistrationStatus("completed");
      } catch (error) {
        setRegistrationStatus("failed");
        console.log(error);
      }
    };
    handleRegister();
  }, []);

  const handleReset = () => {
    setNewUser({
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      age: "",
      birthdate: null,
      birthplace: "",
      gender: "",
      religion: "",
      citizenship: "",
      civil: "",
      email: "",
      phone: "",
      landline: "",
      password: "",

      region: "",
      province: undefined,
      city: undefined,
      baranggay: "",
      houseno: "",
      street: "",
      zipcode: "",

      emergencyPerson: {
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        age: "",
        gender: "",
        relationship: "",
        religion: "",
        email: "",
        phone: "",
        landline: "",
        region: "",
        province: undefined,
        city: undefined,
        baranggay: "",
        houseno: "",
        street: "",
        zipcode: "",
      },

      elementary: undefined,
      attain: undefined,
      highschool: undefined,
      attain1: undefined,
      senior: undefined,
      attain2: undefined,
      college: undefined,
      attain3: undefined,

      employment: undefined,
      occupation: undefined,
      yearEmploy: undefined,
      skill1: undefined,
      skill2: undefined,
      yearUnemploy: undefined,
      skill3: undefined,
      skill4: undefined,

      blood: undefined,
      height: "",
      weight: "",
      visibility: undefined,
      disability: undefined,
      made_disabled: undefined,
      status: undefined,
      device: undefined,
      specificDevice: undefined,
      medicine: undefined,
      specificMedicine: "",
      others: "",
    });
    setFiles({
      valid_id: "",
      profilePhoto: "",
      resume: "",
      pwd_id: "",
      baranggay_residence_certificate: "",
      medical_certificate: "",
      proof_of_disability: "",
    });
    setUserId("");
    setCurrentStep(0);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      {registrationStatus === "pending" ? (
        <span className="w-20 h-20 loading loading-spinner text-success"></span>
      ) : registrationStatus === "failed" ? (
        <>
          <Bounce>
            <img src="/cross.svg" alt="done" className="w-20 h-20" />
          </Bounce>
          <Bounce delay={0.1}>
            <h1 className="text-3xl label font-bold text-red-500">Register Failed!</h1>
          </Bounce>
          <Bounce delay={0.2}>
            <button onClick={handleReset} className="btn shadow-md btn-error text-white">
              Register again
            </button>
          </Bounce>
        </>
      ) : (
        <>
          <Bounce>
            <img src="/done.svg" alt="done" className="w-20 h-20" />
          </Bounce>
          <Bounce delay={0.1}>
            <h1 className="text-3xl label font-bold text-green-500">Registered Successfully!</h1>
          </Bounce>
          <Bounce delay={0.2}>
            <Link to={"/auth/user/login"} className="btn shadow-md btn-success text-white">
              Back to login
            </Link>
          </Bounce>
        </>
      )}
    </div>
  );
};

export default DoneRegister;
