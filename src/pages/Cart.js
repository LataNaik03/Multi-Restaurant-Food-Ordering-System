import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/api";
import "./Cart.css";


const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login first!");
    if (cart.length === 0) return alert("Your cart is empty!");

    try {
      const restaurantId = cart[0].restaurant.id;
      await api.post("/orders", {
        userId: user.id,
        restaurantId,
        items: cart.map((c) => ({
          menuItemId: c.id,
          quantity: c.quantity,
        })),
      });
      alert("✅ Order placed successfully!");
      clearCart();
    } catch {
      alert("❌ Order failed!");
    }
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((c) => (
              <div key={c.id} className="cart-item">
                {/* ✅ Food image */}
                <img
                  src={
                    c.imageUrl ||
                    "https://via.placeholder.com/80x80?text=No+Image"
                  }
                  alt={c.name}
                  className="cart-img"
                />

                {/* ✅ Item details */}
                <div className="cart-details">
                  <span className="item-name">{c.name}</span>
                  <span className="item-qty">x {c.quantity}</span>
                </div>

                {/* ✅ Price */}
                <span className="item-total">₹{c.price * c.quantity}</span>

                {/* ✅ Delete button */}
                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(c.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <h3 className="cart-total">Total: ₹{total}</h3>

          <div className="cart-buttons">
            <button className="place-order-btn" onClick={placeOrder}>
              🚀 Place Order
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              🗑️ Clear All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
