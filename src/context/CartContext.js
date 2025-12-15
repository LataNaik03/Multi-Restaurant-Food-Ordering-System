import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        // If item already in cart → increase quantity
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item with quantity = 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // ✅ Remove a single item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  // ✅ Place order (optional, integrates with backend)
  const placeOrder = async (userId, restaurantId) => {
    if (cart.length === 0) return alert("Your cart is empty!");

    try {
      const items = cart.map((i) => ({
        menuItemId: i.id,
        quantity: i.quantity,
      }));

      const orderData = {
        userId,
        restaurantId,
        items,
      };

      await axios.post("http://localhost:8080/api/orders", orderData);
      alert("✅ Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("❌ Order failed:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};
