import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import Pagination from "../component/Pagination";
import FilterProduct from "../component/FilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAdvance } from "../redux/features/product/productThunk";
import { useSearchParams } from "react-router-dom";
import { resetProductState } from "../redux/features/product/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [params] = useSearchParams();
  const search = params?.get("search") || "";
  const { products, totalPage, currentPage } = useSelector(
    (state) => state?.product,
  );
  const cart = useSelector((state) => state?.cart?.cart);

  useEffect(() => {
    dispatch(
      getAllProductsAdvance({
        page,
        limit: 20,
        search,
        sort,
      }),
    );
  }, [page, sort, search, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-20 h-0.5 bg-primary rounded-full"></div>
      </div>
      {products.length !== 0 ? (
        <>
          <FilterProduct sortOption={sort} setSortOption={setSort} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
            {products.map((product) => {
              return (
                <ProductCard
                  product={product}
                  key={product?._id}
                  cart={cart.items}
                />
              );
            })}
          </div>
          <div className="mt-10 w-full flex justify-center">
            <Pagination
              totalPage={totalPage}
              currentPage={currentPage}
              setPage={setPage}
            />
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl italic mt-16 mb-10 font-bold">
          No Products Found!
        </h2>
      )}
    </div>
  );
};

export default Products;
