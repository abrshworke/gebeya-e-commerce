
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/Shopcontext';

const categories = [
  "Earphone", "Accessories", "SmartPhone", "Laptop", "Camera",
  "Watch", "Speaker", "PlayStation" , "Projector", "Tablet"
];

const Shop = () => {
  const { allProduct, showSearch, setShowSearch } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    setDisplayedProducts(allProduct);
  }, [allProduct]);


  const handleFilterClick = (catagory) => {
    if (selectedCategory === catagory) {

      setSelectedCategory("");
      setDisplayedProducts(allProduct);
    } else {
      setSelectedCategory(catagory);
      const filtered = allProduct.filter(
        (product) =>
          product.catagory.toLowerCase() === catagory.toLowerCase()
      );
      setDisplayedProducts(filtered);
    }
  };


  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = allProduct.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedProducts(filtered);
  };


  return (
    <div className="flex flex-col items-center px-6">
      <div className="flex flex-col items-end pt-8 pb-7">
        <p className="text-2xl font-medium">All products</p>
        <div className="w-18 h-0.5 bg-orange-500 rounded-full"></div>
      </div>

      {showSearch && (  
        <div className="flex items-center mt-4 w-full max-w-xl gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 p-2 pl-4 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={() => {
              setSearchQuery("");
              setShowSearch(false);
              setDisplayedProducts(allProduct);
            }}
            className="text-3xl text-gray-500 pl-5 hover:text-red-500 cursor-pointer"
          >
            × 
          </button>
        </div>
      )}

      <div className="flex justify-center flex-wrap gap-1 mt-6 w-full">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleFilterClick(category)}
            className={`px-4 py-2 rounded-full cursor-pointer border text-sm transition 
              ${selectedCategory === category
                ? "bg-orange-500 text-white border-orange-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 m-5 gap-6 mt-12 pb-14 w-full">
        {displayedProducts.map((product, index) => (
          <ProductCard key={index} allProduct={product} />
        ))}
      </div>
    </div>
  );
};


export default Shop;
