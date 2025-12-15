package org.jsp.food.controller;

import org.jsp.food.data.OrderRequest;
import org.jsp.food.model.Order;
import org.jsp.food.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // ✅ POST — Place new order
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest req) {
        try {
            Order saved = service.placeOrder(req);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ GET — View all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    // ✅ GET — Orders by User
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return service.getOrdersByUser(userId);
    }

    // ✅ GET — View order by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.getOrderById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Order not found with ID: " + id);
        }
    }

    // ✅ PUT — Update order status (Track Order feature)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            Order updated = service.updateOrderStatus(id, status);
            return ResponseEntity.ok(Map.of(
                    "message", "Status updated successfully",
                    "newStatus", updated.getStatus()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error updating order: " + e.getMessage());
        }
    }
}
