import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySign } from "../assets/asset";
import {
  getAllOrders,
  orderStatusManage,
} from "../redux/features/order/orderThunk";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, hasMore, page, loading, updatedOrderId } = useSelector(
    (state) => state?.order,
  );
  const loadMore = () => {
    if (hasMore && !loading) {
      dispatch(getAllOrders({ page: page + 1, limit: 2 }));
    }
  };
  const handleStatusChange = (status, _id) => {
    dispatch(orderStatusManage({ _id, status }));
  };
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-5">Live Orders</h2>
      <div className="max-w-4xl w-full rounded-md bg-white border border-gray-500/20">
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {orders?.map((order) => (
              <div
                key={order?._id}
                className="bg-white p-4 rounded-lg shadow space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{order?.user.userName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order?.createdAt)
                        .toDateString()
                        .split(" ")
                        .join(",")}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">ITEMS</p>
                    <p className="font-semibold">{order.items.length}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-400">TOTAL</p>
                    <p className="font-semibold">
                      {currencySign}
                      {order.totalAmount}
                    </p>
                  </div>

                  {/* Status */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, order._id)
                    }
                    className={`px-3 py-1 rounded border
                                ${order.status === "Delivered" && "bg-green-100 text-green-600"}
                                ${order.status === "Shipped" && "bg-blue-100 text-blue-600"}
                                ${order.status === "Processing" && "bg-yellow-100 text-yellow-600"}
                                ${order.status === "Cancelled" && "bg-red-100 text-red-600"}
                            `}
                  >
                    {updatedOrderId === order._id ? (
                      <option value="">Loading...</option>
                    ) : (
                      <>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </>
                    )}
                  </select>
                </div>

                {/* PRODUCTS LIST (BOTTOM) */}
                <div className="border-t pt-2">
                  {order.items.map((item) => (
                    <p key={item.product} className="text-sm text-gray-600">
                      {item?.name} × {item?.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
  );
};

export default Orders;
