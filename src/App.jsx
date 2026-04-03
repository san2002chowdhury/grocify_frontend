import Navbar from "./component/Navbar";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import Products from "./pages/Products";
import ProductsByCategory from "./pages/ProductsByCategory";
import SingleProductDetails from "./pages/SingleProductDetails";
import EmailVerifiedSuccessfully from "./pages/EmailVerifiedSuccessfully";
import UserDetails from "./pages/UserDetails";
import EmailVerificationResend from "./pages/EmailVerificationResend";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import AdminPage from "./pages/AdminPage";
import AddProduct from "./component/AddProduct";
import ProductList from "./component/ProductList";
import Orders from "./component/Orders";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ScrollTop from "./component/ScrollTop";
import PageNotFound from "./pages/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartProducts } from "./redux/features/cart/cartThunk";
import OrderSuccessful from "./pages/OrderSuccessful";
import MyOrders from "./pages/MyOrders";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    if (
      user?.isLoggedIn &&
      user?.role === "admin" &&
      location.pathname === "/"
    ) {
      navigate("/admin", { replace: true });
    }
  }, [user?.isLoggedIn, user?.role, location.pathname, navigate]);

  useEffect(() => {
    if (user?.isLoggedIn && user?.role === "user") {
      dispatch(getCartProducts());
    }
  }, [user?.isLoggedIn, user?.role]);

  return (
    <>
      <ScrollTop />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      {!["/login", "/signup", "/forgot_password", "/reset_password"].includes(
        location.pathname,
      ) &&
        !location.pathname.startsWith("/verify") &&
        !location.pathname.startsWith("/admin") && <Navbar />}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:category"
              element={<ProductsByCategory />}
            />
            <Route
              path="/product/:category/:id"
              element={<SingleProductDetails />}
            />
            <Route path="/contact" element={<Contact />} />

            <Route element={<ProtectedLayout allowedRole="admin" />}>
              <Route path="/admin" element={<AdminPage />}>
                <Route index element={<AddProduct />} />
                <Route path="product_list" element={<ProductList />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>

            <Route element={<ProtectedLayout allowedRole="user" />}>
              <Route path="/user_profile" element={<UserDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order_success" element={<OrderSuccessful />} />
              <Route path="/user_orders" element={<MyOrders />} />
            </Route>
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/verify_email/:token"
              element={<EmailVerifiedSuccessfully />}
            />
            <Route
              path="/verify_email/resend"
              element={<EmailVerificationResend />}
            />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/verify_otp" element={<VerifyOtp />} />
            <Route path="/reset_password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </div>
      {!["/login", "/signup", "/forgot_password", "/reset_password"].includes(
        location.pathname,
      ) &&
        !location.pathname.startsWith("/verify") &&
        !location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default App;
