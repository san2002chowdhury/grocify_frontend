import React, { useEffect } from "react";
import ProductDetails from "../component/ProductDetails";
import RelatedProduct from "../component/RelatedProduct";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../redux/features/product/productThunk";
import { resetProductState } from "../redux/features/product/productSlice";

const SingleProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products, singleProduct } = useSelector((state) => state?.product);

  useEffect(() => {
    if (!singleProduct || singleProduct._id !== id) {
      dispatch(getProductDetails(id));
    }
  }, [id, singleProduct, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch]);

  return (
    <div className="mt-6">
      <ProductDetails product={singleProduct} />
      <RelatedProduct products={products} />
    </div>
  );
};

export default SingleProductDetails;
