import orderModel from "../models/ordersModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

const currency = 'inr'
const deliveryCharge = 65

const rayzorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
})

// using cod method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = new orderModel({
            userId,
            items, 
            address: typeof address === "Object" ? JSON.stringify(address) : address,
            amount, 
            paymentMethod:"cod",
            payment: false,
            date: Date.now()
        });
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel
        .findByIdAndUpdate(userId,{ cartData: {} })

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// using razor pay method

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "razorpay",
            payment: false,
            date: Date.now()
        });
        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        await rayzorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: "Internal Server Error" });
            } else {
                res.json({ success: true, order });
            }
        }
        );

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { userId, razorpay_order_id} = req.body
        const orderInfo = await rayzorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Payment Successful" })
        } else{
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// all data for admin panel

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// user orders for frontend

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// update order status

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Order Status Updated" })
    } catch (error) {
        
    }
}

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyPayment }