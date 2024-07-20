import { useDispatch, useSelector } from "react-redux";
import Bounce from "../animation/bounce";
import { AppDispatch, RootState } from "../../redux/store";
import { registerUser } from "../../redux/actions/userAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { resetNewUser } from "../../redux/slices/userSlice";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const DoneRegister: React.FC<Props> = ({ setCurrentStep }) => {
  const state = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleRegister = async () => {
      if (state.newUser && state.registrationStatus === "pending") {
        await dispatch(registerUser(state.newUser));
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
      {state.loading ? (
        <span className="w-20 h-20 loading loading-spinner text-success"></span>
      ) : state.error ? (
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
