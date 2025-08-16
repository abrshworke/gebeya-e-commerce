// File: src/pages/home.jsx
import React, { useState, useEffect } from "react";
import { assets } from '../assets/assets';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const router = useNavigate();
  const sliderData = [

    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image, 
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
    
  ];

  const products = [

      {
        id: 1,
        image: assets.girl_with_headphone_image,
        title: "Unparalleled Sound",
        description: "Experience crystal-clear audio with premium headphones.",
      },
      {
        id: 2,
        image: assets.girl_with_earphone_image,
        title: "Stay Connected",
        description: "Compact and stylish earphones for every occasion.",
      },
      {
        id: 3,
        image: assets.boy_with_laptop_image,
        title: "Power in Every Pixel",
        description: "Shop the latest laptops for work, gaming, and more.",
      },
      

];



  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);


  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };


  return (

    <>

    <section>

          <div className="overflow-hidden relative w-full md:w-[80%] mx-auto">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {sliderData.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
                  >
                    <div className="md:pl-8 mt-10 md:mt-0">
                      <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
                      <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                        {slide.title}
                      </h1>
                      <div className="flex items-center mt-4 md:mt-6 ">
                        <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                          {slide.buttonText1}
                        </button>
                        <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                          {slide.buttonText2}
                          <img className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center flex-1 justify-center">
                      <img
                        className="md:w-72 w-48"
                        src={slide.imgSrc}
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-8">
                {sliderData.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`h-2 w-2 rounded-full cursor-pointer ${
                      currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
    </section>


          <section className="py-20 bg-white px-4 md:px-12">
            
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">🌟 Featured Products</h2>
              <div className="w-24 h-1 bg-orange-600 mx-auto mt-3 rounded-full"></div>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Check out our best-selling items handpicked just for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map(({ id, image, title, description }) => (
                <div
                  key={id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-104 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-200 mt-1 line-clamp-3">
                      {description}
                    </p>
                    <button
                      onClick={() => router('/shop')}
                      className="mt-4 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm transition"
                    >
                      Buy Now
                      <img src={assets.redirect_icon} alt="Redirect" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
      </section>
        


      <section className="bg-gradient-to-r from-orange-50 to-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            🎁 Subscribe & Get <span className="text-orange-600">20% Off</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            Join our mailing list and be the first to receive exclusive deals, new arrivals, and more.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full sm:w-2/3 px-5 py-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition"
            >
              Subscribe
            </button>
          </form>

          {/* Optional small note */}
          <p className="text-sm text-gray-500 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
  </section>


    </>

  );
};

export default Home;