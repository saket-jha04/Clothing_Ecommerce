import express from 'express';
import { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyPayment } from '../controllers/ordersController.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',userAuth,placeOrder)
orderRouter.post('/razorpay',userAuth,placeOrderRazorpay)

orderRouter.post('/userorders',userAuth,userOrders)

orderRouter.post('/verifyPayment',userAuth,verifyPayment)

export default orderRouter;


