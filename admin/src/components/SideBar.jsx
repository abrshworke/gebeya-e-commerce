
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Add Item',
      icon: assets.add_icon,
      path: '/addproduct',
    },
    {
      label: 'List Item',
      icon: assets.product_list_icon,
      path: '/product-list',
    },
    {
      label: 'Orders',
      icon: assets.order_icon,
      path: '/order',
    },
    {
      label: 'Feedback',
      icon: assets.order_icon,
      path: '/feedback',
    },
  ]; 

  return (
    <aside className="w-[15%] min-h-screen bg-white border-r shadow-sm py-8 px-4">
      <nav className="flex flex-col gap-4">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-100 transition duration-200 border border-transparent hover:border-pink-300 text-pink-700 hover:text-pink-800"
          >
            <div className="bg-pink-100 group-hover:bg-pink-200 p-2 rounded-full transition">
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
            </div>
            <span className="hidden md:inline text-base font-medium tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
