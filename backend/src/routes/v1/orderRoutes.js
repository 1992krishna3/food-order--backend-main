import express from "express";
import { createOrder, getOrders, getOrderById } from "../../controllers/orderController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const userRouter = express.Router();


userRouter.post('/', createOrder);
userRouter.get('/', authMiddleware,getOrders);
userRouter.get('/:id', getOrderById);

export default userRouter;
