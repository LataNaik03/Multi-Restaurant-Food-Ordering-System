import React, { useEffect, useState } from "react";
import api from "../api/api";
import RestaurantCard from "../components/RestaurantCard";
import "./Home.css";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/restaurants").then((res) => setRestaurants(res.data));
  }, []);

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>🍴 Explore Top Restaurants</h1>

      <input
        type="text"
        placeholder="🔍 Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="restaurant-list">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
}
