import React from "react";
import { API_URL_BASE } from "../constants/api";
import { assest, currencySign } from "../assets/asset";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateProductQuatityInCart,
} from "../redux/features/cart/cartThunk";
import { getProductDetails } from "../redux/features/product/productThunk";
import { useNavigate } from "react-router-dom";

const CartDetails = ({ cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e, id) => {
    e.preventDefault();
    dispatch(getProductDetails(id))
      .unwrap()
      .then((res) => {
        if (res?.product?.category)
          navigate(
            `/product/${res?.product?.category?.path.toLowerCase()}/${id}`,
            {
              replace: true,
            },
          );
      })
      .catch(() => {});
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateProductQuatityInCart({ id, quantity: Number(quantity) }));
  };
  return (
    <div className="flex-1 max-w-4xl">
      <h1 className="text-3xl font-medium mb-6">
        Shopping Cart{" "}
        <span className="text-[20px] text-primary">
          ({cart?.totalItems} Items)
        </span>
      </h1>

      <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
        <p className="text-left">Product Details</p>
        <p className="text-center">Subtotal</p>
        <p className="text-center">Action</p>
      </div>

      {cart?.items?.length === 0 ? (
        <h2 className="text-center text-3xl font-bold italic mt-10">
          *No products in the cart...
        </h2>
      ) : (
        cart.items?.map((product) => (
          <div
            key={product?._id}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  className="max-w-full h-full object-cover"
                  src={`${API_URL_BASE}${product?.product?.images[0]}`}
                  alt={product?.product.name}
                />
              </div>
              <div>
                <p
                  className="hidden md:block font-semibold cursor-pointer hover:text-primary"
                  onClick={(e) => handleClick(e, product.product._id)}
                >
                  {product?.product?.name}
                </p>
                <div className="font-normal text-gray-500/70">
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={product.quantity}
                      onChange={(e) => {
                        handleQuantityChange(
                          product?.product?._id,
                          e.target.value,
                        );
                      }}
                    >
                      {Array(5)
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currencySign}
              {product?.price * product?.quantity}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => dispatch(removeItemFromCart(product.product._id))}
            >
              <img
                src={assest.removeIcon}
                alt="icon"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))
      )}

      <button
        className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        onClick={() => navigate("/products")}
      >
        <img
          src={assest.arrowIconColored}
          alt="icon"
          className="group-hover:-translate-x-1 transition"
        />
        Continue Shopping
      </button>
    </div>
  );
};

export default CartDetails;
