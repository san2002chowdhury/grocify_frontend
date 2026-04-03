import React from "react";
import { assest } from "../assets/asset";

const Pagination = ({ totalPage = 1, currentPage = 1, setPage }) => {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="w-full flex justify-center mt-16">
      <div className="flex flex-wrap items-center justify-center gap-4 text-gray-500">
        <button
          type="button"
          aria-label="previous"
          className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 hover:text-primary transition"
          disabled={currentPage === 1}
          onClick={() => {
            setPage(currentPage - 1);
            scrollTo(0, 0);
          }}
        >
          <img
            src={assest.leftArrowIcon}
            alt="previous"
            className="w-4 md:w-5"
          />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={`flex items-center justify-center 
            w-9 h-9 md:w-11 md:h-11 
            rounded-md active:scale-95 transition-all
            ${page === currentPage ? "bg-primary text-white" : "hover:bg-primary/30"}`}
              onClick={() => {
                setPage(page);
                scrollTo(0, 0);
              }}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="next"
          className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 hover:text-primary transition"
          disabled={currentPage === totalPage}
          onClick={() => {
            setPage(currentPage + 1);
            scrollTo(0, 0);
          }}
        >
          <span className="hidden sm:inline">Next</span>
          <img src={assest.rightArrowIcon} alt="next" className="w-4 md:w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
