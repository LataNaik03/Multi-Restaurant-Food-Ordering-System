package org.jsp.food.repository;

import org.jsp.food.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantId(Long restaurantId);
    List<MenuItem> findByCategory(String category);
    List<MenuItem> findByRestaurantIdAndCategory(Long restaurantId, String category);

}
