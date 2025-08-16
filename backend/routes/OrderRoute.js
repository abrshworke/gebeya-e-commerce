

import { Router } from "express";
import { getAllOrdersAdmin, getOrders, placeOrder, updateOrderStatus } from "../controller/OrderController.js";
import adminAuth from "../middleware/adminAuth.js";

const OrderRoute = Router();

OrderRoute.post('/place-order' , placeOrder);
OrderRoute.get('/' , getOrders);
OrderRoute.get('/admin/orders', adminAuth , getAllOrdersAdmin);
OrderRoute.post('/admin/orders/update' , adminAuth , updateOrderStatus);

export default OrderRoute;


