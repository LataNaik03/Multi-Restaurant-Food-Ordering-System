package org.jsp.food.repository;

import java.util.List;

import org.jsp.food.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUserId(Long userId);
	List<Order> findByRestaurantId(Long restaurantId);

}