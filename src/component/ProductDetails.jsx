import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assest, currencySign } from "../assets/asset";
import { API_URL_BASE } from "../constants/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeItemFromCart,
} from "../redux/features/cart/cartThunk";
import ButtonLoaderAnimated from "./ButtonLoaderAnimated";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, cart } = useSelector((state) => state?.cart);
  const [thumbnail, setThumbnail] = useState("");
  const isPresent = cart?.items?.some(
    (el) => el?.product?._id === product?._id,
  );
  useEffect(() => {
    if (product?.images?.length > 0) setThumbnail(product?.images[0]);
  }, [product]);
  return (
    product && (
      <div className="mt-12">
        <p>
          <Link to="/">Home</Link> /<Link to="/products"> Products</Link> /
          <Link
            to={`/products/${product?.category?._id}`}
            state={{ category: product?.category?.name }}
          >
            {" "}
            {product?.category?.name}
          </Link>{" "}
          /<span className="text-primary"> {product?.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product?.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img
                    src={`${API_URL_BASE}${image}`}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="border border-gray-300 rounded overflow-hidden w-[620px] h-[400px]">
              <img
                src={`${API_URL_BASE}${thumbnail}`}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product?.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(product?.rating)
                .fill("")
                .map((_, i) => (
                  <img
                    src={
                      i < product?.rating
                        ? assest.starIcon
                        : assest.starIconDull
                    }
                    alt="icon"
                    className="md:w-4 w-3.5"
                  />
                ))}
              <p className="text-base ml-2">({product?.rating})</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: {currencySign}
                {product?.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currencySign}
                {product?.offerPrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product?.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            {product.inStock ? (
              <div className="flex items-center mt-10 gap-4 text-base">
                <button
                  className={`w-full py-3.5 cursor-pointer font-medium transition
                                  ${
                                    isPresent
                                      ? loading
                                        ? "bg-gray-100 text-gray-500"
                                        : "bg-red-500 text-white hover:bg-red-600"
                                      : "bg-gray-100 text-gray-800/80 hover:bg-gray-200"
                                  }`}
                  disabled={loading}
                  onClick={() => {
                    if (isPresent) {
                      dispatch(removeItemFromCart(product?._id));
                    } else {
                      dispatch(
                        addProductToCart({
                          productId: product?._id,
                          quantity: 1,
                        }),
                      );
                    }
                  }}
                >
                  {loading ? (
                    <ButtonLoaderAnimated />
                  ) : isPresent ? (
                    "Remove from Cart"
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                {!isPresent && (
                  <button
                    className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-dull transition"
                    onClick={() => {
                      dispatch(
                        addProductToCart({
                          productId: product?._id,
                          quantity: 1,
                        }),
                      )
                        .unwrap()
                        .then(() => {
                          navigate("/cart");
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    Buy now
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center mt-10 gap-4 text-base">
                <p className="text-xl font-bold text-red-500">*Out Of Stock!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
