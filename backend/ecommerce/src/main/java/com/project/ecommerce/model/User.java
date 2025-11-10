package com.project.ecommerce.model;


import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // CUSTOMER or SELLER

    // --- NEW FIELD ADDED ---
    @Column(nullable = true) // Nullable because Customers won't have one
    private String shopName;

    public enum Role {
        CUSTOMER,
        SELLER
    }

    // --- We must add all this manually without Lombok ---

    // No-argument constructor (required by JPA)
    public User() {
    }

    // --- Getters ---
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    // --- NEW GETTER ---
    public String getShopName() {
        return shopName;
    }

    // --- Setters ---
    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    // --- NEW SETTER ---
    public void setShopName(String shopName) {
        this.shopName = shopName;
    }
}