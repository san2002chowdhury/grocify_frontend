import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL_BASE } from "../constants/api";
import { Link } from "react-router-dom";
import { resetState } from "../redux/features/order/orderSlice";

const OrderSuccessful = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.order?.order);

  useEffect(() => {
    return () => dispatch(resetState());
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-2xl">
        <div className="text-center">
          <div className="text-green-600 text-5xl mb-2">✓</div>

          <h2 className="text-2xl font-semibold">Order Placed Successfully</h2>

          <p className="text-gray-500 mt-1">Thank you for your purchase</p>
        </div>

        <div className="mt-6 border-t pt-4 space-y-2">
          <p>
            <span className="font-medium">Total Items:</span>{" "}
            {order?.totalItems}
          </p>

          <p>
            <span className="font-medium">Total Amount:</span> ₹
            {order?.totalAmount}
          </p>

          <p>
            <span className="font-medium">Payment:</span>{" "}
            {order?.paymentType === "OP"
              ? "Online Payment"
              : "Cash-On-Delivery"}
          </p>

          <p>
            <span className="font-medium">Status:</span> {order?.status}
          </p>
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-3">Ordered Items</h3>

          <div className="space-y-3">
            {order?.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-lg p-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${API_URL_BASE}${item?.image}`}
                    alt={item?.name}
                    className="w-14 h-14 object-cover rounded"
                  />

                  <div>
                    <p className="font-medium">{item?.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item?.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold">₹{item?.price * item?.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6 gap-3">
          <Link
            to="/user_orders"
            className="w-full text-center border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            My Orders
          </Link>

          <Link
            to="/"
            className="w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-dull transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessful;
