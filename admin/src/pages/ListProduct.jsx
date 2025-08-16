

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { BackendURL } from "../App";

const ProductList = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${BackendURL}api/product/all`);
      if (response.data.success) {
        setList(response.data.allProduct);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product list");
    }
  };

  const removeProducts = async (id) => {
    try {
      const response = await axios.post(
        `${BackendURL}api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-700 mb-6">🛍️ All Products</h2>

        <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-pink-100 text-pink-800 uppercase text-left tracking-wide">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 hidden sm:table-cell">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Offer Price</th>
                <th className="px-8 py-4 hidden sm:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.length > 0 ? (
                list.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 flex items-center gap-4 max-w-xs">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image[0]}
                          alt="Product"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="font-medium text-gray-800 truncate">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                      {item.catagory}
                    </td>
                    <td className="px-6 py-4 text-red-600 font-semibold">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ${item.offerPrice}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            (window.location.href = `/edit-product/${item._id}`)
                          }
                          className="flex items-center gap-1 px-6 cursor-pointer py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
                        >
                          Edit
                          <img src={assets.redirect_icon} alt="→" className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeProducts(item._id)}
                          className="flex items-center gap-1 px-6 py-2 cursor-pointer bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                        >
                          Remove
                          <img src={assets.redirect_icon} alt="→" className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-6 py-12 text-gray-500 italic">
                    No products available. Try adding some!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
