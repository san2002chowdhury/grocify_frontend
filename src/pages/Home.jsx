import React, { useEffect } from "react";
import MainBanner from "../component/MainBanner";
import Categories from "../component/Categories";
import BestSeller from "../component/BestSeller";
import BottomBanner from "../component/BottomBanner";
import NewsLetter from "../component/NewsLetter";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../redux/features/category/categoryThunk";
import { getBestSellingProducts } from "../redux/features/product/productThunk";
import { resetProductState } from "../redux/features/product/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getBestSellingProducts());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch]);

  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
