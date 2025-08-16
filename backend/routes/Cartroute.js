

import { Router } from "express";
import { addToCart, clearCart, getCart, removeFromCart, updateCart } from '../controller/Cartcontroller.js';

const cartroute = Router();

cartroute.post('/add', addToCart);
cartroute.get('/get', getCart);
cartroute.post('/remove', removeFromCart);
cartroute.post('/update', updateCart); 
cartroute.post('/clear',  clearCart);

export default cartroute;


 