import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "../api/axios";

const UserVerify = () => {
  const { setUser, setToken, userId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    console.log({ userId, otp });
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "/user/verify",
        { userId, otp },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setUser(res.data.user);
      setToken(res.data.accessToken);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form onSubmit={handleVerify} className="w-1/2 flex flex-col gap-4">
        <h1 className="w-full "></h1>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Type the code receive from email</span>
          </div>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="input input-bordered w-full rounded-none h-[60px]"
          />
        </label>
        <button
          disabled={loading}
          type="submit"
          className="btn bg-black text-2xl text-white rounded-none w-full h-[60px]">
          {loading ? <Loader2 className="animate-spin w-10 h-10" /> : "Verify"}
        </button>
      </form>
    </div>
  );
};
export default UserVerify;
