import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import LoginRegister from "./components/LoginRegister";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import "./styles.css";

function App() {
  // ✅ Store logged-in user globally
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Keep user data when page reloads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        {/* ✅ Pass user + setUser to Navbar */}
        <Navbar user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          {/* ✅ Pass setUser to LoginRegister so Navbar updates after login */}
          <Route path="/login" element={<LoginRegister onLogin={setUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
