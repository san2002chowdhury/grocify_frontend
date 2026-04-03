import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL_BASE } from "../constants/api";

const Categories = () => {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state?.category);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-8">
        {categories?.map((item) => {
          return (
            <div
              key={item?._id}
              className="group cursor-pointer py-6 px-3 rounded-xl flex flex-col items-center justify-center text-center min-h-[200px] shadow-sm hover:shadow-md transition"
              style={{ backgroundColor: "#EEF7FF" }}
              onClick={() => {
                navigate(`/products/${item?._id}`, {
                  state: { category: item?.name },
                });
                
                window.scrollTo(0, 0);
              }}
            >
              <img
                className="w-28 h-28 object-contain group-hover:scale-110 transition duration-300"
                src={`${API_URL_BASE}${item?.image}`}
                alt={item?.name}
              />

              <p className="text-sm font-medium mt-4 truncate w-full">
                {item?.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
