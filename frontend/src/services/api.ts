import type { Product } from "../types/Product";
import type { BuyerData, Order } from "../types/Order";
import type { CartItem } from "../types/CartItem";

const API_URL = "http://localhost:4000";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Producto no encontrado");
  }

  return response.json();
}

type CreateOrderPayload = {
  buyer: BuyerData;
  items: CartItem[];
  total: number;
};

export async function createOrder(
  orderData: CreateOrderPayload
): Promise<Order> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la orden");
  }

  return response.json();
}

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Error al obtener las órdenes");
  }

  return response.json();
}

export async function getOrderById(id: string): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${id}`);

  if (!response.ok) {
    throw new Error("Orden no encontrada");
  }

  return response.json();
}