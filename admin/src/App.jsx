import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import AddProduct from './pages/AddProduct';
import Admin from './pages/Admin';
import ProductList from './pages/ListProduct';
import Login from './components/Login';
import AdminOrders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import EditProduct from './pages/EditProduct';
import AdminFeedback from './pages/Feedback';


export const BackendURL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-700">
      <ToastContainer autoClose={1000}/>
      
      <Navbar setToken={setToken} />

      <hr className="border-gray-300 pt-10" />

      <main className="flex flex-1 max-w-7xl mx-auto w-full px-4 mt-5 py-8 gap-6">

        <SideBar />

        <section className="flex-1 bg-white rounded-md shadow p-6">

          <Routes>
            <Route path="/" element={<Admin token={token} />} />
            <Route path="/addproduct" element={<AddProduct token={token} />} />
            <Route path="/product-list" element={<ProductList token={token} />} />
            <Route path="/order" element={<AdminOrders token={token} />} />
            <Route path="/edit-product/:id" element={<EditProduct token={token} />} />
            <Route path="/feedback" element={< AdminFeedback token={token}/> } />
          </Routes>

        </section>
      </main>

      <hr className="border-gray-300" />

      <Footer />

    </div>
  );
};


export default App;
