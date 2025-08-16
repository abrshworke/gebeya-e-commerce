
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";


const ShopContext = createContext();
export const useAppContext = () => useContext(ShopContext);
export const backendURL = import.meta.env.VITE_BACKEND_URL;

const ShopcontextProvider = ({ children }) => {
  const currency = "$";
  const [allProduct, setAllproduct] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(new Map());


  // ------------------- Load User -------------------
  
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${backendURL}api/user/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
        } catch (err) {
          console.error("User fetch failed", err);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  // ------------------- Logout Function -------------------

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  // ------------------- Load Products -------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendURL}api/product/all`);
        if (res.data.success) setAllproduct(res.data.allProduct);
        else toast.error(res.data.message);
      } catch (err) {
        toast.error("Product load failed");
      }
    };
    fetchProducts();
  }, []);

  
  // ------------------- Load Cart -------------------
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendURL}api/user/cart/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(new Map(Object.entries(res.data.cart)));
    } catch (err) {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // ------------------- Cart Functions -------------------
  const addToCart = async (productId, quantity = 1) => {
    if (!token) return toast.error("Please login first");
    try {
      const res = await axios.post(`${backendURL}api/user/cart/add`, {
        productId,
        quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(new Map(Object.entries(res.data.cart)));
      toast.success("Product added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.post(`${backendURL}api/user/cart/remove`, {
        productId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(new Map(Object.entries(res.data.cart)));
      toast.success("Product removed");
    } catch (err) {
      toast.error("Failed to remove from cart");
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (!token) return toast.error("Please login first");

    try {
      const endpoint = quantity > 0
        ? `${backendURL}api/user/cart/update`
        : `${backendURL}api/user/cart/remove`;

      const payload = quantity > 0
        ? { productId, quantity }
        : { productId };

      const res = await axios.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCart(new Map(Object.entries(res.data.cart)));
      toast.success("Cart updated");
    } catch (err) {
      toast.error("Failed to update cart");
    }
  };

  const getCartItems = () => {
    const items = {};
    for (const [productId, qty] of cart.entries()) {
      items[productId] = qty;
    }
    return items;
  };

  const getCartCount = () => {
    let total = 0;
    for (const qty of cart.values()) {
      total += qty;
    }
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const [productId, qty] of cart.entries()) {
      const product = allProduct.find(p => p._id === productId);
      if (product) total += product.offerPrice * qty;
    }
    return total; 
  };

  const deliveryFee = () => {
    return 10; // Example fixed fee
  };


  const clearCart = async () => {
  try {
    const res = await axios.post(`${backendURL}api/user/cart/clear`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCart(new Map()); // Reset cart in context
    toast.success("Cart cleared");
  } catch (err) {
    // toast.error("Failed to clear cart");
  }
}; 



  // ------------------- Feedback Functions -------------------

  const submitFeedback = async ({ name, email, message }) => {
  try {
    const res = await axios.post(`${backendURL}api/feedback/add`, {
      name,
      email,
      message
    }, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    
    if (res.data.success) toast.success("Feedback submitted!");
    else toast.error(res.data.message);
  } catch (err) {
    toast.error("Error submitting feedback");
  }
};




  // ------------------- Context Value -------------------
  const value = {
    currency,
    allProduct,
    setAllproduct,
    deliveryFee,
    showSearch,
    setShowSearch,
    user,
    token,
    setToken,
    logout,
    backendURL,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    cart,
    getCartItems,
    getCartCount,
    getCartAmount,
    clearCart,
    submitFeedback,
    
    
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopcontextProvider;



