import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "./menu.css";

export default function Menu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [address, setAddress] = useState({
    address: "",
    city: "",
    pincode: "",
    area: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  // ✅ Fetch restaurant and menu data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restRes = await axios.get(
          `http://localhost:8080/api/restaurants/${id}`
        );
        setRestaurant(restRes.data);

        const menuRes = await axios.get(
          `http://localhost:8080/api/menu/restaurant/${id}`
        );
        setMenuItems(menuRes.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    };
    fetchData();
  }, [id]);

  // Step 1️⃣: Click "ORDER NOW"
  const handleOrderNow = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("⚠️ Please login first!");
      navigate("/login");
      return;
    }
    setSelectedItem(item);
    setShowAddressForm(true);
  };

  // Step 2️⃣: Save Address
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!address.address || !address.city || !address.pincode) {
      alert("⚠️ Please fill all address fields!");
      return;
    }
    setShowAddressForm(false);
    setShowPayment(true);
  };

  // Step 3️⃣: Confirm Payment & Place Order
  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) {
      alert("⚠️ Please log in again. User not found.");
      navigate("/login");
      return;
    }

    if (!restaurant?.id || !selectedItem?.id) {
      alert("⚠️ Missing restaurant or item. Please try again.");
      return;
    }

    if (!paymentMethod) {
      alert("⚠️ Please select a payment method!");
      return;
    }

    try {
      // ✅ Send all order info to backend
      const response = await axios.post("http://localhost:8080/api/orders", {
        userId: user.id,
        restaurantId: restaurant.id,
        address: address.address,
        city: address.city,
        pincode: address.pincode,
        paymentMethod: paymentMethod,
        items: [{ menuItemId: selectedItem.id, quantity: 1 }],
      });

      console.log("✅ Order response:", response.data);

      alert(
        `✅ Order placed successfully!\n\nItem: ${selectedItem.name}\nPayment: ${paymentMethod}\nDelivery: ${address.address}, ${address.city}`
      );

      // Reset all states
      setShowPayment(false);
      setSelectedItem(null);
      setPaymentMethod("");
      setAddress({ address: "", city: "", pincode: "", area: "" });
    } catch (err) {
      console.error(
        "❌ Order failed:",
        err.response ? err.response.data : err.message
      );
      alert("❌ Failed to place order! Check backend or database IDs.");
    }
  };

  return (
    <div className="menu-page">
      {restaurant ? (
        <>
          <h2 className="menu-title">🍽️ {restaurant.name}</h2>
          <p className="menu-sub">{restaurant.address}</p>

          {menuItems.length > 0 ? (
            <div className="menu-grid">
              {menuItems.map((item) => (
                <div key={item.id} className="menu-card">
                  <img
                    src={
                      item.imageUrl ||
                      "https://via.placeholder.com/220x150?text=No+Image"
                    }
                    alt={item.name}
                    className="menu-img"
                  />
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price}</p>
                  <div className="menu-buttons">
                    <button
                      className="order-btn"
                      onClick={() => handleOrderNow(item)}
                    >
                      ORDER NOW
                    </button>
                    <button
                      className="cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      🛒
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-menu">No menu items found 😔</p>
          )}
        </>
      ) : (
        <p>Loading restaurant details...</p>
      )}

      {/* 🏠 Address Modal */}
      {showAddressForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🏠 Enter Delivery Address</h3>
            <form onSubmit={handleSaveAddress}>
              <input
                type="text"
                placeholder="Address"
                value={address.address}
                onChange={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Area / Landmark"
                value={address.area}
                onChange={(e) =>
                  setAddress({ ...address, area: e.target.value })
                }
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save Address
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddressForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 💳 Payment Modal */}
      {showPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>💳 Select Payment Method</h3>
            <div className="payment-options">
              {[
                {
                  name: "UPI",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg",
                },
                {
                  name: "PhonePe",
                  logo: "https://cdn-icons-png.flaticon.com/512/825/825454.png",
                },
                {
                  name: "Credit Card",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
                },
                {
                  name: "Cash on Delivery",
                  logo: "https://cdn-icons-png.flaticon.com/512/4290/4290854.png",
                },
              ].map((method) => (
                <label key={method.name}>
                  <input
                    type="radio"
                    name="payment"
                    value={method.name}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  />
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="pay-logo"
                  />
                  <span>{method.name}</span>
                </label>
              ))}
            </div>

            <div className="modal-buttons">
              <button onClick={handlePlaceOrder} className="save-btn">
                Confirm Order
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
