package coms.ums.controller;

import coms.ums.model.Role;
import coms.ums.model.User;
import coms.ums.model.UserPrincipal;
import coms.ums.repository.RoleRepository;
import coms.ums.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // --- Profile Methods for the Customer Dashboard ---

    /**
     * Gets the profile of the currently logged-in user.
     */
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getUser().getId()).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Updates the profile of the currently logged-in user.
     * Uses Map<String, Object> to prevent JSON parse errors if nested objects are sent.
     */
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> updateProfile(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody Map<String, Object> payload) {
        return userRepository.findById(userPrincipal.getUser().getId()).map(user -> {
            // Using String.valueOf() handles the Object -> String conversion safely
            if (payload.containsKey("username")) {
                user.setUsername(String.valueOf(payload.get("username")));
            }

            if (payload.containsKey("email")) {
                user.setEmail(String.valueOf(payload.get("email")));
            }

            if (payload.containsKey("phone")) {
                user.setContactNo(String.valueOf(payload.get("phone")));
            }

            if (payload.containsKey("address")) {
                user.setStreet(String.valueOf(payload.get("address")));
            }

            User saved = userRepository.save(user);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- Management Methods (Admin/Staff) ---

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        Role customerRole = roleRepository.findByRoleName("Customer").orElseThrow(() -> new RuntimeException("Default Role not found"));
        user.setRole(customerRole);

        // Hash password before saving
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode("123456"));
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    /**
     * Standard update for Admin/Staff usage.
     * Note: This is separate from /profile to allow updating Status and Roles.
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setContactNo(userDetails.getContactNo());
            user.setStatus(userDetails.getStatus());
            user.setStreet(userDetails.getStreet());
            user.setStreetNo(userDetails.getStreetNo());
            user.setCity(userDetails.getCity());

            // Only update password if a new one is provided
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            if (userDetails.getRole() != null) {
                user.setRole(userDetails.getRole());
            }

            return ResponseEntity.ok(userRepository.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }
}