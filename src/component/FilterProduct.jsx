import React from "react";

const FilterProduct = ({ sortOption, setSortOption }) => {
  return (
    <div className="w-full flex justify-end mt-2">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Sort By</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default FilterProduct;

{
  /* const FilterProduct = ({ sortOption, setSortOption }) => { */
}
