import { Html5QrcodeScanner } from "html5-qrcode";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bounce from "../components/animation/bounce";
import { Loader2 } from "lucide-react";
import axios from "../api/axios";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const ScanQR = () => {
  const { setUser, setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 500,
          height: 500,
        },
        disableFlip: true,
        fps: 10,
      },
      false
    );

    const success = (decodedText) => {
      setScanResult(decodedText);
      scanner.clear();
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear qr code scanner.", error);
      });
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/user/login/qrcode/${scanResult.split("/user/")[1]}`, {
            withCredentials: true,
          });
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
      fetchUser();
    }
  }, [scanResult]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div id="reader" style={{ width: "500px" }}></div>
      {scanResult && (
        <div className="flex flex-col items-center justify-center gap-1">
          {loading ? (
            <Loader2 className="animate-spin w-10 h-10" />
          ) : (
            <>
              <Bounce>
                <img src="/done.svg" alt="done" className="w-20 h-20" />
              </Bounce>
              <Bounce delay={0.1}>
                <h1 className="text-3xl label font-bold text-green-500">Verified Successfully!</h1>
              </Bounce>
              <Bounce delay={0.2}>
                <Link to={"/"} className="btn shadow-md btn-success text-white">
                  Go to Home page
                </Link>
              </Bounce>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanQR;
