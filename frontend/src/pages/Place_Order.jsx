
import React, { useState } from 'react';
import { useAppContext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../context/Shopcontext';
import { toast } from 'react-toastify';

const Place_Order = () => {
  const { deliveryFee, getCartAmount, getCartCount, clearCart } = useAppContext();
  const navigate = useNavigate();

  const [methods, setMethods] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    zip: '', country: '', phone: '',
  });

  const [telebirrPhone, setTelebirrPhone] = useState('');
  const [stripeCard, setStripeCard] = useState('');

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!methods) return toast.warning('Please select a payment method');
    for (const key in form) {
      if (!form[key]) return toast.warning('Fill all delivery details');
    }

    if (methods === 'telebirr' && !telebirrPhone) return toast.warning('Telebirr number required');
    if (methods === 'stripe' && !stripeCard) return toast.warning('Stripe card number required');

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(`${backendURL}api/user/order/place-order`, {
        deliveryInfo: form,
        paymentMethod: methods,
        totalAmount: getCartAmount() + deliveryFee(),
        telebirrPhone,
        stripeCard,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        clearCart();
        toast.success('🎉 Order placed successfully!');
        navigate('/orders');
      }
    } catch (err) {
      toast.error('Failed to place order. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] py-8 px-5 sm:px-10 bg-gradient-to-br from-orange-50 to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Delivery Info */}
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-orange-600 border-b pb-4">🚚 Delivery Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" onChange={handleInput} className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input name="lastName" placeholder="Last Name" onChange={handleInput} className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <input name="email" placeholder="Email" onChange={handleInput} className="input  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"  />
          <input name="street" placeholder="Street" onChange={handleInput} className="input  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="city" placeholder="City" onChange={handleInput} className="input  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input name="state" placeholder="State" onChange={handleInput} className="input  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="zip" placeholder="Zip Code" onChange={handleInput} className="input  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input name="country" placeholder="Country" onChange={handleInput} className="input  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <input name="phone" placeholder="Phone Number" onChange={handleInput} className="input  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        {/* Summary & Payment */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-gray-700 text-center mb-4">🛒 Cart Summary</h2>
            <div className="flex justify-between mb-2"><span>Total Items</span><span>{getCartCount()}</span></div>
            <div className="flex justify-between mb-2"><span>Subtotal</span><span>{getCartAmount().toFixed(2)}<span className='text-[10px] ml-1 text-red-600 font-bold'>birr</span></span></div>
            <div className="flex justify-between mb-2"><span>Delivery Fee</span><span>{deliveryFee()}<span className='text-[10px] ml-1 text-red-600 font-bold'>birr</span></span></div>
            <div className="flex justify-between border-t pt-3 font-semibold text-lg">
              <span>Total</span><span>{(getCartAmount() + deliveryFee()).toFixed(2)}<span className='text-[12px] ml-1 text-red-600 font-bold'>birr</span> </span>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">💳 Select Payment Method</h3>
            <div className="flex gap-4">
              {[{ id: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
                { id: 'telebirr', label: 'Telebirr', logo: assets.Telebirr }].map(({ id, label, logo }) => (
                <div
                  key={id}
                  onClick={() => setMethods(id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                    methods === id ? 'bg-orange-100 border-orange-500' : 'border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border ${methods === id ? 'bg-green-500' : 'bg-white'}`} />
                  <img src={logo} alt={label} className="h-6 object-contain" />
                </div>
              ))}
            </div>

            {methods === 'telebirr' && (
              <input
                type="tel"
                placeholder="Telebirr Phone Number"
                value={telebirrPhone}
                onChange={(e) => setTelebirrPhone(e.target.value)}
                className="input mt-4 w-70 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            )}
            {methods === 'stripe' && (
              <input
                type="text"
                placeholder="Stripe Card Number"
                value={stripeCard}
                onChange={(e) => setStripeCard(e.target.value)}
                className="input mt-4 w-70 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            )}
          </div>

          <div className="text-right">
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition"
            >
              {loading ? 'Placing Order...' : '🚀 Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place_Order;
