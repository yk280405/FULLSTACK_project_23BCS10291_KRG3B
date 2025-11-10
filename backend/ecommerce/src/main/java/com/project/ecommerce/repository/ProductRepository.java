package com.project.ecommerce.repository;
import org.springframework.data.repository.query.Param;

import com.project.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;


public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySellerId(Long sellerId);

    // --- NEW METHOD FOR SEARCH/FILTER ---
    /**
     * Searches and filters products.
     * - If 'search' is provided, it matches against product names.
     * - If 'shopName' is provided, it matches against the seller's shop name.
     * - If both are null, it returns all products.
     */
    @Query("SELECT p FROM Product p JOIN p.seller u WHERE " +
            "(:search IS NULL OR p.name LIKE %:search%) AND " +
            "(:shopName IS NULL OR u.shopName LIKE %:shopName%)")
    List<Product> searchAndFilterProducts(
            @Param("search") String search,
            @Param("shopName") String shopName
    );
}