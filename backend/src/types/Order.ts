import type { Product } from "./Product";

export type CartItem = Product & {
  quantity: number;
};

export type BuyerData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type CreateOrderRequest = {
  buyer: BuyerData;
  items: CartItem[];
  total: number;
};

export type Order = CreateOrderRequest & {
  id: string;
  createdAt: string;
};