import type { Request, Response } from "express";

import { orders } from "../data/orders";
import { products } from "../data/products";
import type { CreateOrderRequest, Order } from "../types/Order";

function createOrderId() {
  return `LM-${Date.now()}`;
}

function isValidBuyer(buyer: CreateOrderRequest["buyer"]) {
  return (
    buyer &&
    typeof buyer.name === "string" &&
    buyer.name.trim() !== "" &&
    typeof buyer.email === "string" &&
    buyer.email.trim() !== "" &&
    typeof buyer.phone === "string" &&
    buyer.phone.trim() !== "" &&
    typeof buyer.address === "string" &&
    buyer.address.trim() !== ""
  );
}

function isValidItems(items: CreateOrderRequest["items"]) {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    items.every((item) => {
      return (
        typeof item.id === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0
      );
    })
  );
}

function buildOrderItems(items: CreateOrderRequest["items"]) {
  return items.map((item) => {
    const product = products.find((product) => product.id === item.id);

    if (!product) {
      throw new Error(`Product with id ${item.id} not found`);
    }

    if (item.quantity > product.stock) {
      throw new Error(`Not enough stock for product ${product.name}`);
    }

    return {
      ...product,
      quantity: item.quantity,
    };
  });
}

function calculateOrderTotal(items: Order["items"]) {
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}

function updateProductsStock(items: Order["items"]) {
  items.forEach((item) => {
    const product = products.find((product) => product.id === item.id);

    if (product) {
      product.stock = product.stock - item.quantity;
    }
  });
}

export function createOrder(req: Request, res: Response) {
  const { buyer, items } = req.body as CreateOrderRequest;

  if (!isValidBuyer(buyer)) {
    return res.status(400).json({
      message: "Invalid buyer data",
    });
  }

  if (!isValidItems(items)) {
    return res.status(400).json({
      message: "Order must contain valid items",
    });
  }

  try {
    const orderItems = buildOrderItems(items);
    const calculatedTotal = calculateOrderTotal(orderItems);

    const newOrder: Order = {
      id: createOrderId(),
      buyer,
      items: orderItems,
      total: calculatedTotal,
      createdAt: new Date().toISOString(),
    };

    updateProductsStock(orderItems);

    orders.push(newOrder);

    return res.status(201).json(newOrder);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(400).json({
      message: "Invalid order",
    });
  }
}

export function getOrders(_req: Request, res: Response) {
  res.json(orders);
}

export function getOrderById(req: Request, res: Response) {
  const { id } = req.params;

  const order = orders.find((order) => order.id === id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  return res.json(order);
}