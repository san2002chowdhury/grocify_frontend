import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
      <h1
        className="text-7xl md:text-8xl font-extrabold"
        style={{ color: "#71AC11" }}
      >
        404
      </h1>

      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-3 text-gray-600 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 px-8 py-3 rounded-lg text-white font-medium transition duration-300"
        style={{ backgroundColor: "#71AC11" }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#5E8F0E")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#71AC11")}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
