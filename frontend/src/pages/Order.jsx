
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../context/Shopcontext';
import { useAppContext } from '../context/Shopcontext';
import { PackageCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom"; 
import { toast } from 'react-toastify';

const Order = () => {
  const router = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { allProduct } = useAppContext();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get(`${backendURL}api/user/order`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders.reverse());
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const statusStyles = {
    delivered: "bg-green-100 text-green-700 border-green-300",
    shipped: " bg-yellow-100 text-yellow-700 border-yellow-300",
    pending: "bg-red-100 text-red-700 border-red-300"
  };

  return (
    <section className="min-h-[100vh] bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-20 sm:px-10">
      <div className="text-center mb-14 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800">Your Orders</h1>
        <p className="mt-4 text-lg text-gray-500">See your purchase history and order status.</p>
      </div>

      {loading ? (
        <div className="text-center py-32 text-gray-600 animate-pulse">
          Loading your orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 text-gray-600">
          <PackageCheck className="w-14 h-14 text-gray-400" />
          <p className="text-lg font-semibold">You haven't placed any orders yet.</p>
          <button
            onClick={() => router('/shop')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid gap-10 max-w-5xl mx-auto">
          
          {orders.map((order, index) => {
            const status = order.status?.toLowerCase() || 'pending';
            const statusStyle = statusStyles[status] || statusStyles.pending;

            return (
              <div
                key={order._id || index}
                className="relative bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-orange-200 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order #{index + 1}
                    </h2>
                    <p className="text-gray-500">Date: {formatDate(order.orderDate)}</p>
                    <p className="text-gray-500">Items: {order.items?.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    <p className="text-gray-600 text-lg font-semibold">
                      Total: ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <span className={`text-sm font-medium px-4 py-2 border rounded-full ${statusStyle}`}>
                      {status}
                    </span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-medium shadow-lg">
                      View Status
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {order.items?.map((item) => {
                    const product = allProduct?.find(p => p._id === item.productId);
                    if (!product) return null;

                    return (
                      <div
                        key={item.productId}
                        className="flex items-center gap-4 border border-gray-200 p-3 rounded-xl bg-white hover:bg-gray-50 transition"
                      >
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Order;
