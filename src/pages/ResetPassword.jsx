import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetUserPassword } from "../redux/features/user/userThunks";
import { useState } from "react";
import { useEffect } from "react";
import { assest } from "../assets/asset";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, email } = useSelector((state) => state?.user);

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!email) {
      navigate("/forgot_password");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!passwordData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (passwordData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }

    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required!";
    } else if (passwordData.password !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    dispatch(
      resetUserPassword({
        email,
        password: passwordData.password,
      }),
    )
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch(() => {});
    setPasswordData({
      password: "",
      confirmPassword: "",
    });
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
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Password
          </h2>

          <p className="text-red-500 text-center text-sm min-h-[20px]">
            {error || ""}
          </p>

          <div>
            <div className="flex items-center border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <img src={assest.loginSvgIcon} alt="icon" />
              <input
                className="w-full outline-none bg-transparent py-2.5"
                type="password"
                placeholder="New Password"
                name="password"
                value={passwordData.password}
                onChange={handleChange}
                required
              />
            </div>
            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.password || ""}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <img src={assest.loginSvgIcon} alt="icon" />
              <input
                className="w-full outline-none bg-transparent py-2.5"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.confirmPassword || ""}
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
            {loading ? "Updating..." : "Reset Password"}
          </button>

          <p className="text-center mt-4 font-bold">
            Back to{" "}
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

export default ResetPassword;
