import type { Request, Response } from "express";
import { products } from "../data/products";

export function getProducts(_req: Request, res: Response) {
  res.json(products);
}

export function getProductById(req: Request, res: Response) {
  const productId = Number(req.params.id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.json(product);
}