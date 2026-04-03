import { useNavigate, useParams } from "react-router-dom";
import { assest } from "../assets/asset";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  resendVerifyToken,
  verifyUserEmail,
} from "../redux/features/user/userThunks";

const EmailVerifiedSuccessfully = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const { loading, error, email } = useSelector((state) => state?.user);

  useEffect(() => {
    if (token) {
      setIsVerifying(true);
      dispatch(verifyUserEmail(token))
        .unwrap()
        .then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch(() => {})
        .finally(() => {
          setIsVerifying(false);
        });
    }
  }, [dispatch, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white shadow-2xl rounded-xl max-w-lg w-full p-10 text-center">
        {isVerifying || loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">
              Processing... Please wait
            </p>
          </div>
        ) : (
          <>
            {error ? (
              <div className="flex justify-center mb-6 animate-bounce">
                <img src={assest.errorIcon} alt="icon" />
              </div>
            ) : (
              <div className="flex justify-center mb-6 animate-bounce">
                <img src={assest.confirmIcon} alt="icon" />
              </div>
            )}

            {error ? (
              <h1 className="text-3xl font-extrabold text-red-500 mb-3">
                Email Verification Failed!
              </h1>
            ) : (
              <h1 className="text-3xl font-extrabold text-green-500 mb-3">
                Email Verified Successfully!
              </h1>
            )}

            {error ? (
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your email address can't verified.
              </p>
            ) : (
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your email address has been verified.
              </p>
            )}

            {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                onClick={() => {
                  dispatch(resendVerifyToken({ email: email }));
                  navigate("/verify_email/resend");
                }}
              >
                Resend Token
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 border border-gray-300 bg-primary hover:bg-dull text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerifiedSuccessfully;
