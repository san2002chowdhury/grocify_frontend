import React from "react";
import { currencySign } from "../assets/asset";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createOpOrder,
  deleteUserOrder,
  placeCashOnDeliveryOrder,
  verifyUserPayment,
} from "../redux/features/order/orderThunk";
import { clearWholeCart } from "../redux/features/cart/cartThunk";

const CartOrderSummery = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [option, setOption] = useState("");
  const { user } = useSelector((state) => state?.user);
  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };
  console.log(user.address.length);

  const tax = Math.ceil(cart.totalAmount * 0.02);
  const totalPrice = cart.totalAmount + tax;

  const openRazorpay = (data) => {
    console.log(data);

    const options = {
      key: data.key,
      amount: data.razorpayOrder.amount,
      currency: data.razorpayOrder.currency,
      name: "Grocify",
      description: "Order Payment",
      order_id: data.razorpayOrder.id,

      prefill: {
        name: user?.userName,
        email: user?.email,
        contact: user?.phone,
      },

      notes: {
        address: `${user.address[0]?.houseNo}, ${user.address[0]?.city}`,
      },

      handler: async function (response) {
        const paymentData = {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        };
        dispatch(verifyUserPayment(paymentData))
          .unwrap()
          .then(() => {
            dispatch(clearWholeCart());
            navigate("/order_success");
          })
          .catch((err) => console.log(err));
      },
      modal: {
        ondismiss: function () {
          console.log("cancel", data.razorpayOrder.id);
          dispatch(deleteUserOrder(data.razorpayOrder.id));
        },
      },
      theme: {
        color: "#5E8F0E",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const handleAction = (e, option) => {
    const orderData = {
      items: cart?.items,
      shippingAddress: user.address[0],
      totalItems: cart?.totalItems,
      totalAmount: totalPrice,
      paymentType: option === "OP" ? "OP" : "COD",
    };
    e.preventDefault();
    if (option === "OP") {
      dispatch(createOpOrder(orderData))
        .unwrap()
        .then((res) => {
          console.log("RESULT ONLINE", res);
          openRazorpay(res);
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(placeCashOnDeliveryOrder(orderData))
        .unwrap()
        .then(() => {
          dispatch(clearWholeCart());
          navigate("/order_success");
        })
        .catch((err) => console.log(err));
    }
  };
  const canPlaceOrder = user?.address?.length > 0 && cart?.totalAmount > 0;

  return (
    <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
      <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
      <hr className="border-gray-300 my-5" />
      <div className="mb-6">
        <p className="text-sm font-medium uppercase">Delivery Address</p>
        <div className="flex items-center justify-between gap-3 mt-2">
          <p className="text-gray-500 text-sm flex-1 truncate">
            {user.address[0]?.length !== 0
              ? `House no:-${user.address[0]?.houseNo},${user.address[0]?.street}, ${user.address[0]?.city}, ${user.address[0]?.state}, ${user.address[0]?.country}`
              : "No address found"}
          </p>

          {user.address[0]?.length === 0 && (
            <button
              onClick={() => navigate("/user_profile")}
              className="text-primary text-sm font-medium hover:underline whitespace-nowrap"
            >
              Add Address
            </button>
          )}
        </div>

        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

        <select
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          onChange={handleOptionChange}
          value={option}
        >
          <option value="COD">Cash On Delivery</option>
          <option value="OP">Online Payment</option>
        </select>
      </div>

      <hr className="border-gray-300" />

      <div className="text-gray-500 mt-4 space-y-2">
        <p className="flex justify-between">
          <span>Price</span>
          <span>
            {currencySign}
            {cart.totalAmount === 0 ? 0 : cart.totalAmount}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="text-green-600">Free</span>
        </p>
        <p className="flex justify-between">
          <span>Tax (2%)</span>
          <span>
            {currencySign}
            {cart.totalAmount === 0 ? 0 : tax}
          </span>
        </p>
        <p className="flex justify-between text-lg font-medium mt-3">
          <span>Total Amount:</span>
          <span>
            {currencySign}
            {cart.totalAmount === 0 ? 0 : totalPrice}
          </span>
        </p>
      </div>

      <button
        className={`w-full py-3 mt-6 cursor-pointer ${canPlaceOrder ? "bg-primary cursor-pointer hover:bg-dull" : "bg-primary/30 cursor-not-allowed"} text-white font-medium  transition`}
        disabled={!canPlaceOrder}
        onClick={(e) => handleAction(e, option)}
      >
        {option === "OP" ? "Checkout" : "Place Order"}
      </button>
    </div>
  );
};

export default CartOrderSummery;
