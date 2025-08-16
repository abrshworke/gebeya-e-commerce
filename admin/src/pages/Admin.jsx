

import React from 'react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8 md:p-12 transition hover:shadow-xl">
        <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">
          👩‍💼 Gebeya Admin Panel
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed text-center">
          Welcome to the controller dashboard of <span className="font-semibold text-pink-600">Gebeya</span> e-commerce platform.
          Use this panel to manage products, monitor orders, and oversee users.
        </p>

        {/* Optional Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-pink-600 text-white px-6 py-2 rounded-full shadow hover:bg-pink-700 transition">
            Manage Products
          </button>
          <button className="bg-pink-100 text-pink-700 px-6 py-2 rounded-full shadow hover:bg-pink-200 transition">
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
