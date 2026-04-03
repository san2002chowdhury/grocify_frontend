import React from "react";
import { assest, currencySign } from "../assets/asset";
import { useNavigate } from "react-router-dom";
import { API_URL_BASE } from "../constants/api";
import ButtonLoader from "./ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../redux/features/cart/cartThunk";
import toast from "react-hot-toast";

const ProductCard = ({ product, cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingId = useSelector((state) => state?.cart?.loadingId);
  const user = useSelector((state) => state?.user?.user);

  const handleClick = (e, product) => {
    e.preventDefault();
    navigate(
      `/product/${product?.category?.path?.toLowerCase()}/${product?._id}`,
    );
    scrollTo(0, 0);
  };

  const handleAdd = (e, id) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login before!");
    } else {
      dispatch(addProductToCart({ productId: id, quantity: 1 }));
    }
  };

  const cartItem = cart?.find((item) => item?.product._id === product?._id);
  return (
    <div
      className="border border-gray-200 rounded-lg px-3 md:px-4 py-3 bg-white w-full transition duration-300 hover:shadow-md"
      key={product?._id}
    >
      <div
        className="group cursor-pointer flex items-center justify-center h-32 overflow-hidden"
        onClick={(e) => handleClick(e, product)}
      >
        <img
          className="group-hover:scale-105 transition duration-300 object-contain h-full"
          src={`${API_URL_BASE}${product?.images[0]}`}
          alt={product?.name}
        />
      </div>

      <div className="mt-2 text-sm">
        <p className="text-gray-500 text-xs">{product?.category?.name}</p>

        <p
          className="text-gray-800 font-medium text-sm md:text-base truncate cursor-pointer
"
          onClick={(e) => handleClick(e, product)}
        >
          {product?.name}
        </p>

        <div className="flex items-center gap-1 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={
                  i < (product?.rating || 4)
                    ? assest.starIcon
                    : assest.starIconDull
                }
                alt="star"
                className="w-3 md:w-3.5"
              />
            ))}
          <p className="text-xs text-gray-500">({product?.rating || 4})</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-base md:text-lg font-bold text-primary">
              {currencySign}
              {product?.offerPrice}
            </p>
            <span className="text-xs text-gray-400 line-through">
              {currencySign}
              {product?.price}
            </span>
          </div>

          {product.inStock === false ? (
            <button
              disabled
              className="w-24 h-8 rounded bg-red-500 text-white text-xs font-semibold cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : !cartItem ? (
            <button
              className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/60 w-16 h-8 rounded text-primary text-sm font-semibold"
              onClick={(e) => handleAdd(e, product?._id)}
            >
              {loadingId !== product?._id ? (
                <>
                  <img
                    src={assest.cartIconForCard}
                    alt="cart"
                    className="w-3"
                  />
                  Add
                </>
              ) : (
                <ButtonLoader />
              )}
            </button>
          ) : (
            <div className="flex items-center justify-between w-16 h-8 bg-primary/30 rounded select-none text-primary">
              <p className="px-2 font-bold">Added</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
