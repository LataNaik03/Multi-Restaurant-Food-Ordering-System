package org.jsp.food.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "menuItems", "orders"})
@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private double rating;
    private String imageUrl;


    public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	@OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<MenuItem> menuItems;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Order> orders;

    public Restaurant() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public List<MenuItem> getMenuItems() { return menuItems; }
    public void setMenuItems(List<MenuItem> menuItems) { this.menuItems = menuItems; }

    public List<Order> getOrders() { return orders; }
    public void setOrders(List<Order> orders) { this.orders = orders; }
}
