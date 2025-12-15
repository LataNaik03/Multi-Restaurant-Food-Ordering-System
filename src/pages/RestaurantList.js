import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import axios from "axios";
import "./RestaurantList.css";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Fetch all restaurants from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/restaurants") // fixed path ✅
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="restaurant-list-page">
      <h2>🍽️ Explore Top Restaurants</h2>

      <input
        type="text"
        placeholder="🔍 Search restaurants..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="restaurant-grid">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p className="no-results">No restaurants found 😔</p>
        )}
      </div>
    </div>
  );
}
