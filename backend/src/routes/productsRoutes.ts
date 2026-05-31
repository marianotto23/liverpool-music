import { Router } from "express";
import { getProductById, getProducts } from "../controllers/productsController";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.get("/:id", getProductById);

export default productsRoutes;