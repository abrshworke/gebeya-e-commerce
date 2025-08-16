
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BackendURL } from "../App";

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BackendURL}api/user/order/admin/orders`, {
        headers: { token },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch orders");
      console.error(err);
    }
  };

  const updateOrderStatus = async (userId, orderId, status) => {
    try {
      const res = await axios.post(
        `${BackendURL}api/user/order/admin/orders/update`,
        { userId, orderId, status },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("✅ Order status updated");
        fetchOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("❌ Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders =
    filteredStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filteredStatus);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-pink-600">📦 Admin Orders</h1>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg italic">
            No orders match the selected status.
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition p-6"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left: Order Info */}
                  <div className="flex-1 space-y-2 text-gray-800">
                    <p><span className="font-semibold">👤 User:</span> {order.deliveryInfo?.firstName || "N/A"}</p>
                    <p><span className="font-semibold">📧 Email:</span> {order.deliveryInfo?.email || "N/A"}</p>
                    <p><span className="font-semibold">🗓️ Order Date:</span> {order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}</p>
                    <p><span className="font-semibold">🛒 Total Items:</span> {order.items?.reduce((sum, item) => sum + item.quantity, 0) || "0"}</p>
                    <p><span className="font-semibold">💰 Total Price:</span> ${order.totalAmount?.toFixed(2) || "0.00"}</p>
                  </div>

                  {/* Right: Status and Address */}
                  <div className="flex-1 space-y-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.userId, order._id, e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p className="font-semibold text-gray-700">📍 Delivery Address:</p>
                      <p>{order.deliveryInfo?.street || "N/A"}</p>
                      <p>
                        {order.deliveryInfo?.city || "N/A"},{" "}
                        {order.deliveryInfo?.country || "N/A"}
                      </p>
                      <p>{order.deliveryInfo?.postalCode || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
