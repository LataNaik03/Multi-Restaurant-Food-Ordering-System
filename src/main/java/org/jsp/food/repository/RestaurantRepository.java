package org.jsp.food.repository;

import java.util.List;

import org.jsp.food.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> { 
	List<Restaurant> findByNameContainingIgnoreCase(String name);
}
