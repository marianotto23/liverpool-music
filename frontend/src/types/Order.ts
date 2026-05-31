import type { CartItem } from "./CartItem";

export type BuyerData = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

export type Order = {
    id: string;
    buyer: BuyerData;
    items: CartItem[];
    total: number;
    createdAt: string;
};