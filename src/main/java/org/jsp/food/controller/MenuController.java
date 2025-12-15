package org.jsp.food.controller;
import org.jsp.food.model.MenuItem;
import org.jsp.food.service.MenuService;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/menu")
public class MenuController {
    private final MenuService service;

    public MenuController(MenuService service) {
        this.service = service;
    }
    //localhost:8080/api/menu---GET
    // ✅ Get all menu items
    @GetMapping
    public List<MenuItem> all() {
        return service.findAll();
    }
    //localhost:8080/api/menu/restaurant/1---GET
    // ✅ Get menu items by restaurant ID
    @GetMapping("/restaurant/{id}")
    public List<MenuItem> byRestaurant(@PathVariable Long id) {
        return service.findByRestaurant(id);
    }
    // ✅ Add (POST) a new menu item
    //localhost:8080/api/menu--post----{
//    "name": "Veg pups",
//    "category": "Fast Food",
//    "price": 30.0,
//    "restaurant": { "id": 2 }
//  }
    @PostMapping
    public MenuItem create(@RequestBody MenuItem item) {
        return service.save(item);
    }
    @PostMapping("/all")
    public List<MenuItem> saveAll(@RequestBody List<MenuItem> items) {
        return service.saveAll(items);
    }


 // ✅ Delete single menu item by ID
    @DeleteMapping("/{id}")
    public String deleteMenuItem(@PathVariable Long id) {
        boolean deleted = service.deleteById(id);
        if (deleted) {
            return "Menu item deleted successfully!";
        } else {
            return "Menu item not found!";
        }
    }

    // ✅ Delete ALL menu items
    // Example: DELETE http://localhost:8080/api/menu
    @DeleteMapping
    public String deleteAllMenuItems() {
        service.deleteAll();
        return "All menu items deleted successfully!";
    }
}