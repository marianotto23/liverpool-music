import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/ordersController";

const ordersRoutes = Router();

ordersRoutes.get("/", getOrders);
ordersRoutes.get("/:id", getOrderById);
ordersRoutes.post("/", createOrder);

export default ordersRoutes;