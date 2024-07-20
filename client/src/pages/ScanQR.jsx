import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bounce from "../components/animation/bounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginViaQR } from "../redux/actions/userAction";
import { Loader2 } from "lucide-react";

const ScanQR: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [scanResult, setScanResult] = useState<string | null>(null);

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

    const success = (decodedText: string) => {
      setScanResult(decodedText);
      scanner.clear();
    };

    const error = (err: unknown) => {
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
    if (scanResult) dispatch(loginViaQR(scanResult.split("/user/")[1]));
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
