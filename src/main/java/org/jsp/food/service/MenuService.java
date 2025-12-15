package org.jsp.food.service;

import org.jsp.food.model.MenuItem;
import org.jsp.food.model.Restaurant;
import org.jsp.food.repository.MenuItemRepository;
import org.jsp.food.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    private final MenuItemRepository menuRepo;
    private final RestaurantRepository restaurantRepo;

    public MenuService(MenuItemRepository menuRepo, RestaurantRepository restaurantRepo) {
        this.menuRepo = menuRepo;
        this.restaurantRepo = restaurantRepo;
    }

    // ✅ Get all menu items
    public List<MenuItem> findAll() {
        return menuRepo.findAll();
    }

    // ✅ Get menu items by restaurant ID
    public List<MenuItem> findByRestaurant(Long restaurantId) {
        return menuRepo.findByRestaurantId(restaurantId);
    }

    // ✅ Save and load full restaurant details
    public MenuItem save(MenuItem item) {
        if (item.getRestaurant() != null && item.getRestaurant().getId() != null) {
            Restaurant restaurant = restaurantRepo.findById(item.getRestaurant().getId())
                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            item.setRestaurant(restaurant);
        }
        return menuRepo.save(item);
    }

    // ✅ Delete menu item by ID
    public boolean deleteById(Long id) {
        Optional<MenuItem> optional = menuRepo.findById(id);
        if (optional.isPresent()) {
            menuRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ Delete all menu items
    public void deleteAll() {
        menuRepo.deleteAll();
    }

    public List<MenuItem> saveAll(List<MenuItem> items) {
        return menuRepo.saveAll(items);
    }
}
