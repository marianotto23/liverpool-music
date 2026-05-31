/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

type CartContextValue = {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("liverpool-music-cart");

    if (storedCart) {
    return JSON.parse(storedCart);
    }

    return [];
    });

    useEffect(() => {
        localStorage.setItem("liverpool-music-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(product: Product) {
    setCartItems((currentItems) => {
        const productAlreadyInCart = currentItems.find(
        (item) => item.id === product.id
        );

        if (productAlreadyInCart) {
        if (productAlreadyInCart.quantity >= product.stock) {
        return currentItems;
        }

        return currentItems.map((item) =>
        item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
    }

    return [...currentItems, { ...product, quantity: 1 }];
    });
    }

    function removeFromCart(productId: number) {
    setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
    );
    }

    function decreaseQuantity(productId: number) {
    setCartItems((currentItems) =>
        currentItems
        .map((item) =>
        item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    }

    function clearCart() {
    setCartItems([]);
    }

    return (
    <CartContext.Provider
        value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        }}
    >
        {children}
    </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
    }

    return context;
}