import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    const currentQty = user.cartData.get(productId) || 0;
    user.cartData.set(productId, currentQty + quantity);

    await user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getCart = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    res.status(200).json({ cart: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
 
    user.cartData.delete(productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from cart', cart: user.cartData });
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } 
}; 

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (quantity > 0) {
      user.cartData.set(productId, quantity);
    } else {   
      user.cartData.delete(productId); 
    }   

    await user.save();
    res.status(200).json({ message: 'Cart updated', cart: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } 
};
 
export const clearCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
 
    user.cartData = new Map();   
    await user.save();  

    res.json({ cart: user.cartData });
  } catch (err) {
    console.error('Clear Cart Error:', err);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
 