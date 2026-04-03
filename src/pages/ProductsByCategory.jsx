import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import Pagination from "../component/Pagination";
import FilterProduct from "../component/FilterProduct";
import { useState } from "react";
import { getAllProductsByCategory } from "../redux/features/product/productThunk";

const ProductsByCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { category } = useParams();
  const searchedCategory = location?.state?.category || "";
  const { products, currentPage, totalPage } = useSelector(
    (state) => state?.product,
  );
  const cart = useSelector((state) => state?.cart?.cart);

  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(
      getAllProductsByCategory({
        id: category,
        page: 1,
        sort: "",
      }),
    );
  }, [dispatch]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">{searchedCategory}</p>
        <div className="w-20 h-0.5 bg-primary rounded-full"></div>
      </div>
      <FilterProduct sortOption={sortOption} setSortOption={setSortOption} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products.map((product) => (
          <ProductCard product={product} key={product?._id} cart={cart.items} />
        ))}
      </div>
      <div className="mt-10 w-full flex justify-center">
        <Pagination totalPage={totalPage} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default ProductsByCategory;
