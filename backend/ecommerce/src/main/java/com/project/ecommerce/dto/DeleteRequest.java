package com.project.ecommerce.dto;

public class DeleteRequest {

    private Long productId;
    private Long sellerId; // The ID of the user *requesting* the delete

    // --- Manual Getters and Setters ---

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    // --- THIS IS THE MISSING METHOD ---
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }
    // ---------------------------------
}