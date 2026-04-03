import React from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const RelatedProduct = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex flex-col items-center w-max">
        <p className="text-3xl font-medium">Related Products</p>
        <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {products.map((product) => (
            <ProductCard product={product} key={product?._id} />
          ))}
        </div>
        <button
          onClick={() => {
            navigate(`/products/${products[0]?.category?._id}`, {
              state: { category: products[0]?.category?.name },
            });
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/20 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default RelatedProduct;
