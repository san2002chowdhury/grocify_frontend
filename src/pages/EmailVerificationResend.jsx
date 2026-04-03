import React from "react";
import { assest } from "../assets/asset";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmailVerificationResend = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state?.user);

  const handleOpenMail = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <img src={assest.mailIcon} alt="icon" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Verification Email Sent 📩
        </h2>
        <p className="text-gray-500 text-sm">
          We’ve sent a verification link to your email address. Please check
          your inbox and verify your account.
        </p>

        {loading ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-400">Please wait...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <p className="text-sm text-green-500">Email send Successfully!</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 bg-primary hover:bg-dull text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>

          <button
            onClick={handleOpenMail}
            className="flex-1 border border-gray-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            Open Gmail
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationResend;
