import Order from "../models/orderModel.js";
import Razorpay from "razorpay";


//Create a new order
export const createOrder = async (req, res) => {
    
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items:req.body.items,
            totalAmount:req.body.amount,
            Address:req.body.address
       });
    

       const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

//Get all orders
export const getOrders= async (req, res) => {
    try {

        // Ensure the user ID is available from the decoded token
    const userId = req.user.id;
    console.log('Fetching orders for User ID:', userId);

        const orders =await Order.find({ userId }).populate('items.food');
        console.log('Fetched orders:', orders);
        res.status(200).json(orders);  
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }

};

//Get an order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
    }
       res.json(order);
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
    }
};

const orderController = {
    createOrder,
    getOrders,
    getOrderById
};
export default orderController; 