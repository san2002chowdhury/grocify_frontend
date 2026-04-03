import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/AdminNavbar";
import AdminSidebar from "../component/AdminSidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCategories } from "../redux/features/category/categoryThunk";
import { getEveryProducts } from "../redux/features/product/productThunk";
import { getAllOrders } from "../redux/features/order/orderThunk";

const AdminPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getEveryProducts({ page: 1, limit: 10 }));
    dispatch(getAllOrders({ page: 1, limit: 2 }));
  }, [dispatch]);

  return (
    <>
      <AdminNavbar />
      <div className="flex mt-[95px]">
        <AdminSidebar />
        <div className="ml-60 flex-1 p-2  min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
