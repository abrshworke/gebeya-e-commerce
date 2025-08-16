
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { BackendURL } from "../App";
import { toast } from "react-toastify";

const EditProduct = ({ token }) => {
  const { id } = useParams();

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // Fetch product info
  useEffect(() => {

    const fetchProduct = async () => {
  try {
    const res = await axios.post(`${BackendURL}api/product/single`, { id }, { headers: { token } });
    
    if (res.data && res.data.product) {
      setName(res.data.product.name);
      setDescription(res.data.product.description);
      setPrice(res.data.product.price);
      setOfferPrice(res.data.product.offerPrice);
      setCatagory(res.data.product.catagory);
      setImage1(res.data.product.image1);
      setImage2(res.data.product.image2);
      setImage3(res.data.product.image3);
      setImage4(res.data.product.image4);
    } else {
      toast.error("Product not found");
      console.error("Product data missing:", res.data);
    }

  } catch (error) {
    toast.error("Failed to fetch product");
    console.error("Fetch product error:", error);
  }
};


    fetchProduct();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("id", id);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("catagory", catagory);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      const response = await axios.post(
        BackendURL + "api/product/update",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Update Product Images (Optional)</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <label htmlFor="image1">
              <img
                className="w-20 cursor-pointer"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
              />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>

            <label htmlFor="image2">
              <img
                className="w-20 cursor-pointer"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt=""
              />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>

            <label htmlFor="image3">
              <img
                className="w-20 cursor-pointer"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
              />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>

            <label htmlFor="image4">
              <img
                className="w-20 cursor-pointer"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
              />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 cursor-pointer rounded border border-gray-500/40"
              onChange={(e) => setCatagory(e.target.value)}
              value={catagory}
            >
              <option value="Earphone">Earphone</option>
              <option value="Watches">Watches</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Cameras">Cameras</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        <button type="submit" className="px-8 py-2.5 cursor-pointer bg-blue-600 text-white font-medium rounded">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
