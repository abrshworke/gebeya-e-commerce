import {v2 as cloudinary} from "cloudinary";
import ProductModel from "../model/Product.js";


const AddProduct = async (req , res) => {
        try {
                const {name , description , catagory , price , offerPrice, rate} = req.body;
                
                const image1 = req.files.image1 && req.files.image1[0]
                const image2 = req.files.image2 && req.files.image2[0]
                const image3 = req.files.image3 && req.files.image3[0]
                const image4 = req.files.image4 && req.files.image4[0]

                const images = [image1 , image2 , image3 , image4].filter((item) => item !== undefined);

                let ImageURL = await Promise.all(
                        images.map(async (item) => {
                           let result = await cloudinary.uploader.upload(item.path , {resource_type: 'image'});
                           return result.secure_url
                        })
                )

                const Productdata = {
                        name,
                        description,
                        price: Number(price),
                        catagory,
                        offerPrice: Number(offerPrice),
                        date:Date.now(),
                        image: ImageURL
                }

                const Product = new ProductModel(Productdata);
                await Product.save();

                res.json({success: true , message : 'Product added successfully'})
                console.log(name , description , catagory , price , rate);
                console.log(ImageURL);
                
                res.json({})
        } catch (error) {
                console.log(error);
                res.json({success: false , message: error.message})
        }
 
}

 
const SingleProduct = async (req, res) => {
  try {
    const { id, ProductID } = req.body;
    const product = await ProductModel.findById(id || ProductID);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const AllProduct = async (req , res) => {
       try {

        const allProduct = await ProductModel.find({})
        res.json({success : true ,allProduct})
        
       } catch (error) {
                console.log(error);      
                res.json({success: false , message: error.message})
       }
}



const RemoveProduct = async (req , res) => {

        try {

                await ProductModel.findByIdAndDelete(req.body.id)
                res.json({success: true , mesaage: 'product removed successfully'})
                
        } catch (error) {
               console.log(error);        
               res.json({success: false , message: error.message}) 
        }


}



const UpdateProduct = async (req, res) => {
  try {
    const { id, name, description, catagory, price, offerPrice, rate } = req.body;

    // Handle image uploads if new images are sent
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    let ImageURL = [];
    if (images.length > 0) {
      ImageURL = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    const updateFields = {
      name,
      description,
      catagory,
      price: Number(price),
      offerPrice: Number(offerPrice),
      rate,
    };

    // Only update image field if new images are provided
    if (ImageURL.length > 0) {
      updateFields.image = ImageURL;
    }

    const updated = await ProductModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.json({ success: true, message: "Product updated", updated });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




export {AddProduct , UpdateProduct , SingleProduct , AllProduct , RemoveProduct};
