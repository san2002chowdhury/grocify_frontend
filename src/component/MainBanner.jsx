import React from "react";
import { assest } from "../assets/asset";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={assest.mainBannerBg}
        alt="banner"
        className="w-full hidden md:block"
        loading="lazy"
      />
      <img
        src={assest.mainBannerBgSm}
        alt="banner"
        className="w-full md:hidden"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-[500px] leading-tight lg:leading-15">
          Fresh groceries, delivered in minutes!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-dull transition rounded text-white cursor-pointer"
          >
            Shop now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assest.whiteArrowIcon}
              alt="arrowIcon"
              loading="lazy"
            />
          </Link>

          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-9 py-3  cursor-pointer"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assest.blackArrowIcon}
              alt="arrowIcon"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
