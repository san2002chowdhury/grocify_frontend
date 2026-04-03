import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetError } from "../redux/features/user/userSlice";
import { useEffect } from "react";
import { verifyUserOtp } from "../redux/features/user/userThunks";
import { useRef } from "react";
import { useState } from "react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, email } = useSelector((state) => state?.user);
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/forgot_password");
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      setLocalError("Please enter 4 digit OTP");
      return;
    }

    setLocalError("");

    dispatch(verifyUserOtp({ email, otp: finalOtp }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/reset_password");
        }, 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <button
        className="mb-14 bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
      >
        Home Page
      </button>

      <div className="flex items-center justify-center w-full">
        <form
          className="bg-white text-gray-500 max-w-[380px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[10px_10px_10px_10px] shadow-black/10 space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Verify OTP
          </h2>

          <p className="text-center text-sm text-gray-500 mb-4">
            Enter the 4 digit OTP sent to your email
          </p>

          <p className="text-red-500 text-center text-sm min-h-[20px]">
            {error || localError || ""}
          </p>

          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-xl border border-gray-400/20 rounded-md outline-none focus:border-primary bg-indigo-500/5"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded text-white font-medium transition-all
            ${
              loading
                ? "bg-dull cursor-not-allowed"
                : "bg-primary hover:bg-dull active:scale-95"
            }
          `}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-center mt-4 font-bold">
            Didn’t receive OTP?{" "}
            <Link
              to="/forgot_password"
              onClick={() => dispatch(resetError())}
              className="text-blue-500 underline hover:text-blue-700 no-underline"
            >
              Resend
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
