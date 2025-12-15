import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch user's orders
  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:8080/api/orders/user/${user.id}`)
      .then((res) => {
        console.log("✅ Orders:", res.data);
        setOrders(res.data);
      })
      .catch((err) => console.error("❌ Error fetching orders:", err));
  }, [user]);

  // ✅ Track Order Status
  const handleTrackStatus = (order) => {
    const statuses = ["Pending", "Preparing", "Out for Delivery", "Delivered"];
    const currentIndex = statuses.indexOf(order.status || "Pending");

    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      axios
        .put(`http://localhost:8080/api/orders/${order.id}/status`, {
          status: nextStatus,
        })
        .then(() => {
          alert(`🚚 Order status updated to: ${nextStatus}`);
          setOrders((prev) =>
            prev.map((o) =>
              o.id === order.id ? { ...o, status: nextStatus } : o
            )
          );
        })
        .catch((err) =>
          console.error("❌ Error updating order status:", err.response || err)
        );
    } else {
      alert("✅ Order already Delivered!");
    }
  };

  // 🧠 Get progress percentage
  const getProgress = (status) => {
    const steps = ["Pending", "Preparing", "Out for Delivery", "Delivered"];
    const index = steps.indexOf(status || "Pending");
    return ((index + 1) / steps.length) * 100;
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                {order.items?.length > 0 && (
                  <img
                    src={
                      order.items[0].menuItem?.imageUrl ||
                      "https://via.placeholder.com/80x80?text=No+Image"
                    }
                    alt={order.items[0].menuItem?.name}
                    className="order-thumb"
                  />
                )}
                <div>
                  <h3>Order #{order.id} — ₹{order.totalAmount}</h3>
                  <p><b>Status:</b> {order.status || "Pending"}</p>
                  <p><b>Payment:</b> {order.paymentMethod || "N/A"}</p>
                </div>
              </div>

              {/* 🚀 Progress Bar */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${getProgress(order.status)}%` }}
                ></div>
              </div>
              <p className="progress-text">{order.status || "Pending"}</p>

              <div className="btn-group">
                <button
                  className="view-btn"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </button>
                <button
                  className="track-btn"
                  onClick={() => handleTrackStatus(order)}
                >
                  🚚 Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders yet.</p>
      )}

      {/* 🧾 Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🧾 Order Details</h3>
            <p><b>Order ID:</b> #{selectedOrder.id}</p>
            <p><b>Payment:</b> {selectedOrder.paymentMethod}</p>
            <p>
              <b>Address:</b> {selectedOrder.address}, {selectedOrder.city} -{" "}
              {selectedOrder.pincode}
            </p>
            <p><b>Status:</b> {selectedOrder.status}</p>

            <div className="order-items">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <img
                    src={
                      item.menuItem?.imageUrl ||
                      "https://via.placeholder.com/100x100?text=No+Image"
                    }
                    alt={item.menuItem?.name}
                    className="order-img"
                  />
                  <div>
                    <p><b>{item.menuItem?.name}</b></p>
                    <p>Price: ₹{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={() => setSelectedOrder(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
