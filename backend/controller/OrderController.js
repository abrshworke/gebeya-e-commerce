

import jwt from 'jsonwebtoken';
import UserModel from '../model/User.js';

// POST /api/order/place
export const placeOrder = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { deliveryInfo, paymentMethod, totalAmount } = req.body;

    const orderedItems = Array.from(user.cartData).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    const newOrder = {
      items: orderedItems,
      deliveryInfo,
      paymentMethod,
      totalAmount,
      status: 'Pending',
      orderDate: new Date(),
    };

    user.orders.push(newOrder);
    user.cartData = new Map(); // clear cart after order placed

    await user.save();
    res.status(200).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/order
export const getOrders = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    res.status(200).json({ orders: user.orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};





export const getAllOrdersAdmin = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin' || decoded.email !== process.env.Admin_Email) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const users = await UserModel.find({}, 'orders').lean();

    const allOrders = [];
    users.forEach((user) => {
      if (Array.isArray(user.orders)) {
        user.orders.forEach((order) => {
          allOrders.push({
            ...order,
            userId: user._id,
          });
        });
      }
    });

    allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    res.json({ success: true, orders: allOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};





export const updateOrderStatus = async (req, res) => {
  try {
    const { userId, orderId, status } = req.body;
    const user = await UserModel.findById(userId);
    const order = user.orders.id(orderId);

    if (!order) return res.json({ success: false, message: "Order not found" });

    order.status = status;
    await user.save();

    res.json({ success: true, message: "Order status updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};