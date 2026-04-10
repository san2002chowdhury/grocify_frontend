import React from "react";
import { assest, features } from "../assets/asset";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img
        src={assest.bottomBanner}
        alt="banner"
        className="w-full hidden md:block"
        loading="lazy"
      />
      <img
        src={assest.bottomBannerSm}
        alt="banner"
        className="w-full md:hidden"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center  pt-16 md:pt-0 md:pr-24">
        <div className="w-[90%] md:w-[45%] lg:w-[35%]">
          <h1 className="text-2xl md:txt-3xl font-semibold text-primary mb-6">
            Why We Are The Best?
          </h1>
          <div className="space-y-[5px] md:space-y-[5px] w-[90%] md:w-[100%] lg:w-[500px] ">
            {features.map((el, index) => (
              <div
                key={index}
                className="flex items-center justify-start gap-3 md:gap-4 lg:gap-8"
              >
                <img
                  src={el.icon}
                  alt="icon"
                  className="w-7 md:w-7 lg:w-11 flex-shrink-0"
                  loading="lazy"
                />

                <div className="text-left">
                  <h3 className="text-sm md:text-base lg:text-lg font-semibold">
                    {el.title}
                  </h3>

                  <p className="text-[11px] md:text-xs lg:text-sm text-gray-500/70 leading-tight">
                    {el.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
