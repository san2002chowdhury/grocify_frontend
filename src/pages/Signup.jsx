import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assest } from "../assets/asset";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/user/userThunks";
import { resetError } from "../redux/features/user/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state?.user);

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!signupData.userName.trim()) {
      newErrors.userName = "Username is required!";
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!signupData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    dispatch(registerUser(signupData))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch(() => {});

    setSignupData({
      userName: "",
      email: "",
      password: "",
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
          onSubmit={handleSubmit}
          className="bg-white text-gray-500 max-w-[380px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign Up
          </h2>

          <p className="text-red-500 text-center text-sm min-h-[20px]">
            {error || ""}
          </p>

          <div>
            <div className="flex items-center border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <img src={assest.loginSvgIcon1} alt="icon" />
              <input
                className="w-full outline-none bg-transparent py-2.5"
                type="text"
                placeholder="Username"
                name="userName"
                value={signupData.userName}
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.userName || ""}
            </p>
          </div>

          <div>
            <div className="flex items-center border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <img src={assest.loginSvgIcon} alt="icon" />
              <input
                className="w-full outline-none bg-transparent py-2.5"
                type="email"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.email || ""}
            </p>
          </div>

          <div>
            <div className="flex items-center border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <img src={assest.loginSvgIcon} alt="icon" />
              <input
                className="w-full outline-none bg-transparent py-2.5"
                type="password"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.password || ""}
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
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center font-bold">
            Already have an account?{" "}
            <Link
              to="/login"
              onClick={() => dispatch(resetError())}
              className="text-blue-500 no-underline hover:text-blue-700"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
