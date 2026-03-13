import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
                if (existing) {
                    return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
                }
            return [...prev, {...item, qty: 1}];
        });
    };

    const removeFromCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing.qty === 1) {
                return prev.filter(i => i.id !== item.id);
            }
            return prev.map(i => i.id === item.id ? {...i, qty: i.qty - 1} : i);
        });
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
