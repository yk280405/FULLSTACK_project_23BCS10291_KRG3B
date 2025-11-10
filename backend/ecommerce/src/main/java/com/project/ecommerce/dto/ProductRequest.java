package com.project.ecommerce.dto;




public class ProductRequest {

    private String name;
    private String description;

    // --- YEH SABSE ZAROORI CHANGE HAI ---
    private Double price; // Capital 'D'

    private String imageUrl;
    private Long sellerId;

    // --- Manual Getters and Setters ---
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // --- YEH BHI CAPITAL 'D' HONA CHAHIYE ---
    public Double getPrice() {
        return price;
    }

    // --- YEH BHI CAPITAL 'D' HONA CHAHIYE ---
    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }
}

