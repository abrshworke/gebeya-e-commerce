
import React from "react";
import { useAppContext } from "../context/Shopcontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Cart = () => {
  const navigate = useNavigate();

  const {
    allProduct,
    getCartItems,
    updateCartQuantity,
    addToCart,
    getCartAmount,
    getCartCount,
    deliveryFee
  } = useAppContext();

  const cartItems = getCartItems();
  const totalAmount = getCartAmount();
  const totalWithDelivery = totalAmount + deliveryFee();

  return (
    <div className="min-h-[90vh] pt-14 px-6 md:px-12 lg:px-32 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Your <span className="text-orange-600">Cart</span>
          </h1>
          <p className="text-gray-600">{getCartCount()} item(s)</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="text-left py-4 px-4">Product</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Quantity</th>
                <th className="py-4 px-4">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(cartItems).map(itemId => {
                const product = allProduct.find(p => p._id === itemId);
                const qty = cartItems[itemId];

                if (!product || qty <= 0) return null;

                return (
                  
                  <tr key={itemId} className="border-b">
                    <td className="flex items-center gap-4 py-4 px-4">
                      <img src={product.image[0]} className="w-16 h-16 rounded border" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <button
                          onClick={() => updateCartQuantity(itemId, 0)}
                          className="text-orange-500 text-xs hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                    <td className="text-center text-gray-700">{product.offerPrice}<span className='text-[11px] ml-0.5 text-red-600 font-bold'>birr</span></td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(itemId, qty - 1)}
                          className="bg-gray-200 p-1 rounded"
                        >
                          <img src={assets.decrease_arrow} className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 0;
                            updateCartQuantity(itemId, newQty);
                          }}
                          className="w-12 text-center border rounded px-1"
                        />
                         <button
                          onClick={() => addToCart(itemId)}
                          className="bg-gray-200 p-1 rounded"
                        >
                          <img src={assets.increase_arrow} className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="text-center text-gray-700">
                      {(product.offerPrice * qty).toFixed(2)}<span className='text-[11px] ml-0.5 text-red-600 font-bold'>birr</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-12 mb-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 text-orange-600 font-medium hover:underline"
            >
              <img
                src={assets.arrow_right_icon_colored}
                alt="Back"
                className="w-5 h-5 rotate-180"
              />
              Continue Shopping
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Cart Summary</h2>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Items</span>
              <span>{getCartCount()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>{totalAmount.toFixed(2)}<span className='text-[12px] ml-0.5 text-red-600 font-bold'>birr</span></span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Delivery Fee</span>
              <span>{deliveryFee()}<span className='text-[12px] ml-0.5 text-red-600 font-bold'>birr</span></span>
            </div>
            <div className="border-t pt-4 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{totalWithDelivery.toFixed(2)}<span className='text-[12px] ml-0.5 text-red-600 font-bold'>birr</span></span>
            </div>
            <button
              onClick={() => navigate("/place-order")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer py-3 rounded-lg font-medium transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;






