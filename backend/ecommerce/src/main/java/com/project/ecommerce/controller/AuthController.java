package com.project.ecommerce.controller;



import com.project.ecommerce.dto.LoginRequest;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
// This allows your React frontend (running on localhost:5173) to call this API
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Endpoint for user signup.
     * Receives a User object and saves it to the database.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if the email is already in use
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            // Send a "Bad Request" error
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        // --- WARNING ---
        // As you requested, we are NOT hashing the password.
        // In a real app, you MUST hash the password here before saving.
        // e.g., user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the new user to the database
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    /**
     * Endpoint for user login.
     * Receives a LoginRequest DTO, checks credentials.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // Try to find the user by their email
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            // User not found
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        User user = userOptional.get();

        // --- INSECURE PASSWORD CHECK ---
        // As requested, we check the plaintext password.
        // In a real app, you would use:
        // if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) { ... }
        if (user.getPassword().equals(loginRequest.getPassword())) {

            // --- Login Success ---
            // Don't send the password back to the frontend
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } else {
            // Password did not match
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
    }
}
