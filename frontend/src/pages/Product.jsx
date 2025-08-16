
// "use client"
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import ProductCard from "./ProductCard";
import { useParams } from 'react-router-dom';
import { useAppContext } from "../context/Shopcontext";
import { useNavigate } from 'react-router-dom';


  const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { allProduct, addToCart } = useAppContext();
    const [addingToCart, setAddingToCart] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
      const product = allProduct.find(product => product._id === id);
      setProductData(product);
    };

    useEffect(() => {
      fetchProductData();
    }, [id, allProduct]);

    if (!productData) {
      return <div className="p-10 text-center text-gray-500">Loading product...</div>;
    }
      
    const handleAddToCart = async () => {
      setAddingToCart(true);
      try {
        await addToCart(productData._id, 1);
      } finally {
        setAddingToCart(false);
      }
    };

    const handleBuyNow = async () => {
      await handleAddToCart();
      navigate('/cart'); 
   };

    return <>
       
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <img
                            src={mainImage || productData.image[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <img
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {productData.name}
                    </h1> 
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-4xl font-medium mt-6">
                        {productData.offerPrice}<span className=" font-normal text-2xl ml-1.5 text-red-700 font-mono ">birr</span>
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                         {productData.price} <span className=" text-red-700">birr</span>
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.catagory}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                     <div className="flex items-center mt-10 gap-4">
                          <button 
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                            className={`w-full py-3.5 cursor-pointer bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition ${
                              addingToCart ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {addingToCart ? 'Adding...' : 'Add to Cart'}
                          </button>
                          <button 
                            onClick={handleBuyNow}
                            disabled={addingToCart}
                            className={`w-full py-3.5 cursor-pointer bg-orange-500 text-white hover:bg-orange-600 transition ${
                              addingToCart ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {addingToCart ? 'Adding...' : 'Buy now'}
                          </button>
                      </div>
    
                </div>
            </div>
           
        </div>
    </>
    
};

export default Product;



