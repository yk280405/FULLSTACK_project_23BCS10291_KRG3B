package com.project.ecommerce.model;

// In imports ko dhyan se check karein
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    // --- FIX 1: Price ko 'Double' (bada D) hona chahiye ---
    private Double price;

    // --- FIX 2: Image URL ko VARCHAR(MAX) hona chahiye ---
    @Column(columnDefinition = "VARCHAR(MAX)")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    // No-argument constructor
    public Product() {
    }

    // --- Getters ---
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    // FIX 1 (Getter)
    public Double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public User getSeller() {
        return seller;
    }

    // --- Setters ---
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // FIX 1 (Setter)
    public void setPrice(Double price) {
        this.price = price;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }
}