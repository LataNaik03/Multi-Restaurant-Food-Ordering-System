package org.jsp.food.data;

import java.util.List;

public class OrderRequest {
    private Long userId;
    private Long restaurantId;
    private String address;
    private String city;
    private String pincode;
    private String paymentMethod;
    private List<ItemRequest> items;

    public static class ItemRequest {
        private Long menuItemId;
        private int quantity;

        public Long getMenuItemId() { return menuItemId; }
        public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    // Getters & Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public List<ItemRequest> getItems() { return items; }
    public void setItems(List<ItemRequest> items) { this.items = items; }
}
