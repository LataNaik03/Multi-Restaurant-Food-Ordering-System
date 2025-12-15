package org.jsp.food.controller;

import java.util.List;
import java.util.Optional;

import org.jsp.food.model.Restaurant;
import org.jsp.food.repository.RestaurantRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // ✅ Allow React frontend (localhost:3000) to access backend
@RestController
@RequestMapping("/api/restaurants") // ✅ Base URL for all restaurant APIs
public class RestaurantController {

    private final RestaurantRepository repo;

    // ✅ Constructor injection (recommended way)
    public RestaurantController(RestaurantRepository repo) {
        this.repo = repo;
    }

    // ✅ 1. Get all restaurants
    // Example: GET http://localhost:8080/api/restaurants
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return repo.findAll();
    }

    // ✅ 2. Add a new restaurant
    // Example: POST http://localhost:8080/api/restaurants
    // Body (JSON):
    // {
    //   "name": "Spice Villa",
    //   "address": "Downtown Street, Near Mall",
    //   "rating": 4.2
    // }
    @PostMapping
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return repo.save(restaurant);
    }

    // ✅ 3. Get a restaurant by its ID
    // Example: GET http://localhost:8080/api/restaurants/1
    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        Optional<Restaurant> restaurant = repo.findById(id);
        return restaurant.orElse(null);
    }

    // ✅ 4. Update an existing restaurant (optional)
    // Example: PUT http://localhost:8080/api/restaurants/1
    @PutMapping("/{id}")
    public Restaurant updateRestaurant(@PathVariable Long id, @RequestBody Restaurant updatedData) {
        return repo.findById(id).map(existing -> {
            existing.setName(updatedData.getName());
            existing.setAddress(updatedData.getAddress());
            existing.setRating(updatedData.getRating());
            existing.setImageUrl(updatedData.getImageUrl());
            return repo.save(existing);
        }).orElse(null);
    }
    @RequestMapping(value = "/deleteAll", method = {RequestMethod.DELETE, RequestMethod.POST})
    public String deleteAllRestaurants() {
        repo.deleteAll();
        return "All restaurants deleted successfully.";
    }

    // ✅ 5. Delete a restaurant (optional)
    // Example: DELETE http://localhost:8080/api/restaurants/1
    @DeleteMapping("/{id}")
    public String deleteRestaurant(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Restaurant deleted successfully.";
        }
        return "Restaurant not found.";
    }
}
