import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assest } from "../assets/asset";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/features/user/userThunks";
import { resetError } from "../redux/features/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { loading, error, token } = useSelector((state) => state?.user);

  console.log(loading);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (loginData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    dispatch(loginUser(loginData))
      .unwrap()
      .then((result) => {
        if (result.user.role === "admin") {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch(() => {});
    setLoginData({
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
          className="bg-white text-gray-500 max-w-[380px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
            Login
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
                value={loginData.email}
                onChange={handleChange}
                required
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
                value={loginData.password}
                onChange={handleChange}
                required
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
            {loading ? "Please wait..." : "Login"}
          </button>

          <p className="text-center mt-4 font-bold">
            New here? Sign up and start saving.{" "}
            <Link
              to="/signup"
              onClick={() => dispatch(resetError())}
              className="text-blue-500 underline hover:text-blue-700 no-underline"
            >
              Sign up
            </Link>
          </p>
          <p className="text-center mt-4 font-bold">
            Oops, can’t remember your password?{" "}
            <Link
              to="/forgot_password"
              onClick={() => dispatch(resetError())}
              className="text-blue-500 underline hover:text-blue-700 no-underline"
            >
              Click here
            </Link>
          </p>
          <p className="text-center mt-4 font-bold">
            Didn’t do your email verification?{" "}
            <Link
              to={`/verify_email/${token}`}
              className="text-blue-500 underline hover:text-blue-700 no-underline"
            >
              Click here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
