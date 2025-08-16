

import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <footer className="bg-white dark:bg-gray-900 mt-6 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-bold mb-3 text-orange-500">MyStore</h1>

          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Welcome to our store. We offer quality products and amazing service. Follow us on social media and stay connected.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>📞 +1-234-567-890</li>
            <li>📧 contact@greatstack.dev</li>
            <li>📍 Addis Ababa, Ethiopia</li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h3>
          

          {/* Social icons */}
          <div className="flex gap-4 mt-5 text-orange-500">
            <FaFacebook className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
            <FaTwitter className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
            <FaInstagram className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
          </div>

          {/* Theme toggle */}
          
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-4 border-t border-gray-200 dark:border-gray-800">
        © 2025 GreatStack.dev. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
