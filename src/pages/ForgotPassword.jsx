import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assest } from "../assets/asset";
import { useDispatch, useSelector } from "react-redux";
// import { forgotPassword } from "../redux/features/user/userThunks";
import { resetError } from "../redux/features/user/userSlice";
import { forgotPassword } from "../redux/features/user/userThunks";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const { loading, error } = useSelector((state) => state?.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/verify_otp");
        }, 1500);
      })
      .catch(() => {});
    setEmail("");
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
          className="bg-white text-gray-500 max-w-[380px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
            Forgot Password
          </h2>

          <p className="text-red-500 text-center text-sm min-h-[20px]">
            {error || ""}
          </p>

          <div>
            <div className="flex items-center border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <img src={assest.loginSvgIcon} alt="icon" />
              <input
                className="w-full outline-none bg-transparent py-2.5"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.email || ""}
            </p>
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
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <p className="text-center mt-4 font-bold">
            Remember your password?{" "}
            <Link
              to="/login"
              onClick={() => dispatch(resetError())}
              className="text-blue-500 underline hover:text-blue-700 no-underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
