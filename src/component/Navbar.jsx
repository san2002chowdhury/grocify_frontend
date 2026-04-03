import { useEffect, useMemo, useState } from "react";
import { assest, searchSuggestions } from "../assets/asset";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../redux/features/user/userSlice";
import { logoutUser } from "../redux/features/user/userThunks";
import { Typewriter } from "react-simple-typewriter";
import debounce from "lodash/debounce";
import { API_URL_BASE } from "../constants/api";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const { user, totalItems = 0 } = useSelector((state) => ({
    user: state?.user?.user,
    totalItems: state?.cart?.cart?.totalItems,
  }));
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    searchFuntion(newValue);
  };
  const searchFuntion = useMemo(
    () =>
      debounce((val) => {
        if (val.trim().length > 2) {
          navigate(`/products?search=${val}`);
        }
        if (val.trim() === "") {
          navigate("/products");
        }
      }, 500),
    [navigate],
  );
  useEffect(() => {
    const urlSearch = params.get("search") || "";
    setValue(urlSearch);
  }, [params]);

  useEffect(() => {
    if (!value) setFocused(false);
  }, [value]);
  useEffect(() => {
    return () => {
      searchFuntion.cancel();
    };
  }, [searchFuntion]);

  return (
    <nav className="flex items-center justify-between mt-6 px-4 md:px-14 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <img
          className="h-[80px] mt-[-26px]"
          src={assest.logo}
          alt="dummyLogoColored"
        />
      </Link>
      <div className="flex items-center gap-6 sm:hidden">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img
            src={assest.cartIcon}
            alt="cartIcon"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full ">
            {totalItems}
          </button>
        </div>

        <button
          aria-label="Menu"
          id="menu-toggle"
          onClick={() => (open ? setOpen(false) : setOpen(true))}
        >
          <img src={assest.menuIcon} alt="menuIcon" />
        </button>
      </div>
      {open && (
        <div
          id="mobile-menu"
          className={`${open ? "flex" : "hidden"} absolute top-[80px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <Link to="/" className="block" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="block" onClick={() => setOpen(false)}>
            Products
          </Link>
          <Link to="/contact" className="block" onClick={() => setOpen(false)}>
            Contact
          </Link>
          {!user?.isLoggedIn ? (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm"
              onClick={() => {
                setOpen(false);
                navigate("/login");
                dispatch(resetError());
              }}
            >
              Login
            </button>
          ) : (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm"
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </button>
          )}
        </div>
      )}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/" className="block">
          Home
        </Link>
        <Link to="/products" className="block">
          Products
        </Link>
        <Link to="/contact" className="block">
          Contact
        </Link>
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full relative">
          <input
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="py-1.5 w-full bg-transparent outline-none"
            type="text"
          />

          {!value && !focused && (
            <div className="absolute left-3 text-gray-500 pointer-events-none font-bold">
              Search{" "}
              <Typewriter
                words={searchSuggestions}
                loop
                typeSpeed={50}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </div>
          )}
          <img src={assest.searchIcon} alt="searchIcon" className="w-4 h-4" />
        </div>
        {!user?.isLoggedIn ? (
          <></>
        ) : (
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img
              src={assest.cartIcon}
              alt="cartIcon"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full ">
              {totalItems}
            </button>
          </div>
        )}
        {!user?.isLoggedIn ? (
          <button
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-dull transition text-white rounded-full"
            onClick={() => {
              navigate("/login");
              dispatch(resetError());
            }}
          >
            Login
          </button>
        ) : (
          <div className="relative group cursor-pointer">
            <img
              src={
                user?.profilePic
                  ? `${API_URL_BASE}${user.profilePic}`
                  : assest.profileIcon
              }
              alt="profileIcon"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <ul className="hidden group-hover:block absolute top-10 right-[-24px] bg-white shadow border border-gray-200 py-3 w-[100px] rounded-md text-sm z-40">
              <li
                className="p-2 pl-3 hover:bg-primary/30 cursor-pointer"
                onClick={() => navigate("/user_orders")}
              >
                My Orders
              </li>
              <li
                className="p-2 pl-3 hover:bg-primary/30 cursor-pointer"
                onClick={() => navigate("/user_profile")}
              >
                My Profile
              </li>
              <li
                className="p-2 pl-3 hover:bg-primary/30 cursor-pointer"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
