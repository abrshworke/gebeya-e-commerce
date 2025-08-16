
import { Router } from "express";
import { AddProduct, AllProduct, RemoveProduct, UpdateProduct, SingleProduct } from "../controller/ProductController.js";
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js";

const ProductRouter = Router();

ProductRouter.post('/add' , adminAuth ,upload.fields([{name : "image1" , maxCount : 1} , {name : "image2" , maxCount : 1} ,{name : "image3" , maxCount : 1},{name : "image4" , maxCount : 1}]) , AddProduct);
ProductRouter.post('/update' , adminAuth ,upload.fields([{name : "image1" , maxCount : 1} , {name : "image2" , maxCount : 1} ,{name : "image3" , maxCount : 1},{name : "image4" , maxCount : 1}]) , UpdateProduct);
ProductRouter.post('/single' , SingleProduct);
ProductRouter.get('/all' , AllProduct);
ProductRouter.post('/remove' , adminAuth , RemoveProduct);

export default ProductRouter;

