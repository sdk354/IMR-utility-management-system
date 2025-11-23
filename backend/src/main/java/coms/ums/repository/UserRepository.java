package coms.ums.repository;

import coms.ums.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a User entity by its unique username.
     * This is essential for Spring Security's authentication process.
     * @param username The username to search for.
     * @return An Optional containing the User if found.
     */
    Optional<User> findByUsername(String username);

    // Optional: Add a check for email existence during registration
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}