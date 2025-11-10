package com.project.ecommerce.repository;


import com.project.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// This interface will be implemented automatically by Spring
// It gives us methods like save(), findById(), findAll()
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA is smart enough to create this query for us
    // just from the method name. It means:
    // "SELECT * FROM users WHERE email = ?"
    Optional<User> findByEmail(String email);
}
