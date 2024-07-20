import Bounce from "../animation/bounce";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "../../api/axios";

const DoneRegister = ({ setCurrentStep }) => {
  const { newUser, files, registrationStatus, setRegistrationStatus, idData } =
    useContext(UserContext);

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
      } catch (error) {
        setRegistrationStatus("failed");
        console.log(error);
      } finally {
        setRegistrationStatus("completed");
      }
    };
    handleRegister();
  }, []);

  const handleReset = () => {
    dispatch(resetNewUser());
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
