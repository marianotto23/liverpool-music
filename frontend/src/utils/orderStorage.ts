import type { Order } from "../types/Order";

const ORDER_STORAGE_KEY = "liverpool-music-last-order";

export function saveLastOrder(order: Order) {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
}

export function getLastOrder(): Order | null {
    const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);

    if (!storedOrder) {
    return null;
    }

    return JSON.parse(storedOrder);
}

export function clearLastOrder() {
    localStorage.removeItem(ORDER_STORAGE_KEY);
}