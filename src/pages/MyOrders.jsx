import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../redux/features/order/orderSlice";
import { getUserOrders } from "../redux/features/order/orderThunk";
import { API_URL_BASE } from "../constants/api";
import { currencySign } from "../assets/asset";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, page, hasMore, loading } = useSelector(
    (state) => state?.order,
  );

  useEffect(() => {
    dispatch(getUserOrders({ page: 1, limit: 2 }));
    return () => dispatch(resetState());
  }, [dispatch]);
  const loadMore = () => {
    if (hasMore && !loading) {
      dispatch(getUserOrders({ page: page + 1, limit: 2 }));
    }
  };

  const statusStyle = {
    Processing: "bg-yellow-200 text-yellow-700",
    Shipped: "bg-blue-200 text-blue-700",
    Delivered: "bg-green-200 text-green-700",
    Cancelled: "bg-red-200 text-red-700",
  };
  return (
    <div className="pt-[80px] min-h-screen flex flex-col">
      {/* CONTENT */}
      <div className="flex-1 max-w-6xl mx-auto p-5 w-full">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        {orders?.length === 0 && !loading && (
          <p className="text-gray-500">No orders found</p>
        )}

        {orders?.map((order) => (
          <div
            key={order?._id}
            className="border border-gray-300 rounded-lg p-4 mb-5 bg-white"
          >
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: {order?._id.slice(-6)}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(order?.createdAt)
                    .toDateString()
                    .split(" ")
                    .join(",")}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={`p-[6px] ${statusStyle[order?.status]} rounded`}
                  >
                    {order?.status}
                  </span>
                </p>

                <p className="text-sm text-green-600">₹{order?.totalAmount}</p>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-t pt-3"
                >
                  <img
                    src={`${API_URL_BASE}${item?.image}`}
                    alt={item?.name}
                    className="w-12 h-12 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item?.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item?.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-medium">
                    {currencySign}
                    {item?.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="px-5 py-2 bg-primary text-white rounded"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {/* THIS PUSHES FOOTER DOWN WHEN NO ORDERS */}
      <div className="mt-auto" />
    </div>
  );
};

export default MyOrders;
