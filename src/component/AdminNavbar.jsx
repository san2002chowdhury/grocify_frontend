import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assest } from "../assets/asset";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/user/userThunks";
import { resetState } from "../redux/features/order/orderSlice";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0  w-full h-16 bg-white border-b border-gray-300 flex items-center justify-between py-4 px-6 mt-8 md:px-14 lg:px-24 z-50">
      <Link to="/admin">
        <img
          className="h-[80px] mt-[-26px]"
          src={assest.logo}
          alt="Grocfy Logo"
        />
      </Link>

      <div className="flex items-center gap-5 text-gray-600">
        <p className="text-sm px-6 py-3 bg-gray-200 rounded-2xl font-bold">
          Hi! Admin
        </p>
        <button
          className="border rounded-full text-sm font-bold text-white px-6 py-3 bg-primary hover:bg-dull"
          onClick={() => {
            dispatch(logoutUser())
              .unwrap()
              .then(() => {
                dispatch(resetState());
                navigate("/");
              })
              .catch(() => {});
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
