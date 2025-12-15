import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";

export default function RestaurantCard({ restaurant }) {
  // Calculate full, half, and empty stars
  const fullStars = Math.floor(restaurant.rating);
  const hasHalfStar = restaurant.rating % 1 >= 0.25 && restaurant.rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="restaurant-card">
      <img
        src={
          restaurant.imageUrl
            ? restaurant.imageUrl
            : "https://via.placeholder.com/150x100?text=Restaurant"
        }
        alt={restaurant.name}
        className="restaurant-image"
      />

      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.address}</p>

        <div className="rating">
          {"⭐".repeat(fullStars)}
          {hasHalfStar && <span className="half-star">⭐</span>}
          {"☆".repeat(emptyStars)}
          <span className="rating-value"> ({restaurant.rating})</span>
        </div>

        <Link to={`/menu/${restaurant.id}`} className="view-menu-btn">
          View Menu
        </Link>
      </div>
    </div>
  );
}
