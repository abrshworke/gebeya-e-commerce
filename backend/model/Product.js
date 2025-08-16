
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name : {type : String , required : true},
    description : {type : String , required : true},
    price : {type : Number , required : true},
    offerPrice : {type : Number , required : true},
    image : {type : [String] , required : true},
    catagory : {type : String , required : true},
    date : {type : Date , default : Date.now},
    rating : {type : Number , default : 0},
 

})

const ProductModel = mongoose.models.Product || mongoose.model('product' , ProductSchema);
export default ProductModel;
