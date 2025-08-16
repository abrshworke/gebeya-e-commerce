

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Shopcontext";

const Navigation = () => {
  const router = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showSearch, setShowSearch, user, logout } = useAppContext();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setShowDropdown(false);
    router("/signin");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-70 bg-white shadow-md border-b border-gray-100 px-6 md:px-12 py-6 transition-all">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img
          src={assets.Gpt_logo
          }
          alt="logo"
          className="w-15 cursor-pointer"
          onClick={() => router("/")}
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-gray-600 text-sm font-medium">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `hover:text-orange-600 transition duration-200 ${
                  isActive ? "text-orange-600 font-semibold" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5 cursor-pointer hidden md:block hover:scale-110 transition"
            onClick={() => {
              setShowSearch(true);
              router("/shop");
            }}
          />

          {/* Cart */}
          <img
            src={assets.cart_icon}
            alt="Cart"
            onClick={() => router("/cart")}
            className="w-6 h-6 cursor-pointer hidden md:block hover:scale-110 transition"
          />

          {/* User */}
          <div className="relative hidden md:block">
            <div
              className="cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user?.email ? (
                <div className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition">
                  {user.email.split("@")[0]}
                </div>
              ) : (
                <img src={assets.user_icon} alt="User" className="w-6 h-6" />
              )}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border border-gray-100">
                <ul className="text-sm text-gray-700 py-2">
                  {user ? (
                    <>
                      <li
                        onClick={() => {
                          setShowDropdown(false);
                          router("/cart");
                        }}
                        className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                      >
                        My Cart
                      </li>
                      <li
                        onClick={() => {
                          setShowDropdown(false);
                          router("/orders");
                        }}
                        className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                      >
                        My Orders
                      </li>
                      <li
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={() => {
                        setShowDropdown(false);
                        router("/signin");
                      }}
                      className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                    >
                      Sign In
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>



          {/* Mobile Menu Icon */}
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="w-7 h-7 md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>



      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 rounded-lg shadow bg-white border-t border-gray-100">
          <ul className="flex flex-col gap-3 px-6 py-4 text-gray-700 text-sm font-medium">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={label}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-600 transition"
              >
                {label}
              </NavLink>
            ))}

            {user ? (
              <>
                <li onClick={() => { router("/cart"); setMobileMenuOpen(false); }}>My Cart</li>
                <li onClick={() => { router("/orders"); setMobileMenuOpen(false); }}> My Orders</li>
                <li onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Logout</li>
              </>
            ) : (
              <li onClick={() => { router("/signin"); setMobileMenuOpen(false); }}>Sign In</li>
            )}
            <li onClick={() => { router("/cart"); setMobileMenuOpen(false); }}>Cart</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
