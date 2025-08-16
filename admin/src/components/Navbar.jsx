
import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setToken }) => {
  const router = useNavigate();

  return (
    <header className="bg-white border-b mb-10 shadow-sm fixed w-full top-0 z-70">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <img
          onClick={() => router('/')}
          src={assets.gpt_logo}
          alt="Logo"
          className="w-18 lg:w-12 cursor-pointer hover:opacity-90 transition"
        />

        <button
          onClick={() => setToken('')}
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-5 sm:px-6 py-2 rounded-full text-sm shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
