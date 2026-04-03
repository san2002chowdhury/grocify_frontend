import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../component/Loader";

const MainLayout = () => {
  const { globalLoading } = useSelector((state) => state?.ui);
  return (
    <>
      {globalLoading && <Loader />}
      <Outlet />
    </>
  );
};

export default MainLayout;
