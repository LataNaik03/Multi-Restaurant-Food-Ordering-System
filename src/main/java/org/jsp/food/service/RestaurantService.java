package org.jsp.food.service;

import org.jsp.food.model.Restaurant;
import org.jsp.food.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository repository;

    public RestaurantService(RestaurantRepository repository) {
        this.repository = repository;
    }

    // 🟢 Add a new restaurant
    public Restaurant save(Restaurant restaurant) {
        return repository.save(restaurant);
    }

    // 🟢 Get all restaurants
    public List<Restaurant> findAll() {
        return repository.findAll();
    }

    // 🟢 Get restaurant by ID
    public Optional<Restaurant> findById(Long id) {
        return repository.findById(id);
    }

    // 🟢 Update restaurant details
    public Restaurant update(Long id, Restaurant updatedRestaurant) {
        return repository.findById(id).map(existing -> {
            existing.setName(updatedRestaurant.getName());
            existing.setAddress(updatedRestaurant.getAddress());
            existing.setRating(updatedRestaurant.getRating());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }

    // 🔴 Delete restaurant by ID
    public String delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Restaurant deleted successfully.";
        } else {
            return "Restaurant not found.";
        }
    }
}
