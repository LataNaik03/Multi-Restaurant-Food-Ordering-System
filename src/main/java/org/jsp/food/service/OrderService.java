package org.jsp.food.service;

import org.jsp.food.data.OrderRequest;
import org.jsp.food.data.OrderRequest.ItemRequest;
import org.jsp.food.model.MenuItem;
import org.jsp.food.model.Order;
import org.jsp.food.model.OrderItem;
import org.jsp.food.model.Restaurant;
import org.jsp.food.model.User;
import org.jsp.food.repository.MenuItemRepository;
import org.jsp.food.repository.OrderRepository;
import org.jsp.food.repository.RestaurantRepository;
import org.jsp.food.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final MenuItemRepository menuRepo;
    private final UserRepository userRepo;
    private final RestaurantRepository restRepo;

    public OrderService(OrderRepository orderRepo,
                        MenuItemRepository menuRepo,
                        UserRepository userRepo,
                        RestaurantRepository restRepo) {
        this.orderRepo = orderRepo;
        this.menuRepo = menuRepo;
        this.userRepo = userRepo;
        this.restRepo = restRepo;
    }

    // ✅ Fetch all orders
    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    // ✅ Fetch single order by ID
    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
    }

    // ✅ Fetch all orders for a specific user
    @Transactional(readOnly = true)
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    // ✅ Place a new order
    @Transactional
    public Order placeOrder(OrderRequest req) {
        // 🧩 Validate user and restaurant
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Restaurant restaurant = restRepo.findById(req.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // 🧾 Create new order
        Order order = new Order();
        order.setUser(user);
        order.setRestaurant(restaurant);
        order.setCreatedAt(LocalDateTime.now());

        // ✅ Save address, city, pincode, and payment details
        order.setAddress(req.getAddress());
        order.setCity(req.getCity());
        order.setPincode(req.getPincode());
        order.setPaymentMethod(req.getPaymentMethod());
        order.setStatus("Pending");

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        // 🧠 Loop through each menu item
        for (ItemRequest ir : req.getItems()) {
            MenuItem menuItem = menuRepo.findById(ir.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found: " + ir.getMenuItemId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(ir.getQuantity());
            orderItem.setPrice(menuItem.getPrice());
            orderItem.setOrder(order); // link with main order

            items.add(orderItem);
            total += menuItem.getPrice() * ir.getQuantity();
        }

        // ✅ Set order totals
        order.setItems(items);
        order.setTotalAmount(total);

        // 💾 Save everything (Order + Items)
        return orderRepo.save(order);
    }

    // ✅ Update order status (used by “Track Order”)
    @Transactional
    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

        order.setStatus(status);
        return orderRepo.save(order);
    }

    // ✅ Delete order (optional, for admin)
    @Transactional
    public String deleteOrder(Long id) {
        if (!orderRepo.existsById(id)) {
            throw new RuntimeException("Order not found with ID: " + id);
        }
        orderRepo.deleteById(id);
        return "🗑️ Order deleted successfully.";
    }
}
