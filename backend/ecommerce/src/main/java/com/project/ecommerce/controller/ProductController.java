package com.project.ecommerce.controller;

import com.project.ecommerce.dto.DeleteRequest;

import com.project.ecommerce.dto.ProductRequest;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.ProductRepository;
import com.project.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




import java.util.List;
import java.util.Optional;






@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Endpoint to get all products, with optional search and filter.
     */
    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String shopName
    ) {
        // We pass the parameters to our new repository method
        // If they are null, the query will ignore them
        return productRepository.searchAndFilterProducts(search, shopName);
    }

    /**
     * Endpoint to add a new product (for sellers).
     */
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest productRequest) {

        Optional<User> sellerOptional = userRepository.findById(productRequest.getSellerId());

        if (sellerOptional.isEmpty()) {
            return new ResponseEntity<>("Seller not found!", HttpStatus.BAD_REQUEST);
        }

        User seller = sellerOptional.get();

        if (seller.getRole() != User.Role.SELLER) {
            return new ResponseEntity<>("User is not a seller!", HttpStatus.FORBIDDEN);
        }

        Product newProduct = new Product();
        newProduct.setName(productRequest.getName());
        newProduct.setDescription(productRequest.getDescription());

        if (productRequest.getPrice() == null) {
            newProduct.setPrice(0.0);
        } else {
            newProduct.setPrice(productRequest.getPrice());
        }

        newProduct.setImageUrl(productRequest.getImageUrl());
        newProduct.setSeller(seller);

        Product savedProduct = productRepository.save(newProduct);

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    // --- NEW DELETE ENDPOINT ---
    /**
     * Endpoint for a seller to delete their own product.
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProduct(@RequestBody DeleteRequest deleteRequest) {

        // 1. Find the product
        Optional<Product> productOptional = productRepository.findById(deleteRequest.getProductId());
        if (productOptional.isEmpty()) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        Product product = productOptional.get();

        // 2. SECURITY CHECK: Verify the user owns this product
        Long actualOwnerId = product.getSeller().getId();
        Long requestingUserId = deleteRequest.getSellerId();

        if (!actualOwnerId.equals(requestingUserId)) {
            // If IDs don't match, this user is not the owner
            return new ResponseEntity<>("You are not authorized to delete this product", HttpStatus.FORBIDDEN);
        }

        // 3. IDs match, proceed with deletion
        productRepository.delete(product);

        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }
}