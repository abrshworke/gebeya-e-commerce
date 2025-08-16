import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ allProduct }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${allProduct._id}`);
  };


  return (

    <div
      onClick={handleClick}
      className="flex flex-col items-start gap-0.5 max-w-[270px] w-full cursor-pointer"
    >

      <div className="cursor-pointer group relative mt-5 bg-gray-100 rounded-xl w-full h-[220px] flex items-center justify-center overflow-hidden transition-shadow hover:shadow-lg">
  <img
    src={allProduct.image[0]}
    alt={allProduct.name}
    className="w-4/5 h-4/5 object-contain transform transition-transform duration-300 group-hover:scale-105"
  />
  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200">
    <img
      className="h-4 w-4"
      src={assets.heart_icon}
      alt="heart_icon"
    />
  </button>
</div>


      <p className="text-base font-medium pt-2 w-full truncate">{allProduct.name}</p>
      <p className="w-full text-xs text-gray-500/70 truncate">{allProduct.description}</p>
      <div className="flex items-center gap-2">
        <p className="text-xs">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              className="h-3 w-3"
              src={index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon}
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">{allProduct.offerPrice} <span className='text-[12px] ml-0.5 text-red-600 font-bold'>birr</span></p>
        <button className="px-4 py-1.5 cursor-pointer text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


