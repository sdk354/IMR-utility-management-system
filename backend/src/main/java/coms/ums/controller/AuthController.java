package coms.ums.controller;

import coms.ums.dto.JwtResponse;
import coms.ums.dto.LoginRequest;
import coms.ums.model.User;
import coms.ums.repository.UserRepository;
import coms.ums.service.JwtUtils;
import coms.ums.model.Role;
import coms.ums.repository.RoleRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import coms.ums.model.UserPrincipal; // Needed to get details after successful auth

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth") // Base URL for all auth endpoints
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    // Constructor Injection
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    // --- 1. Login Endpoint ---
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // 1. Authenticate the user credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            // 2. Place the successful authentication object in the Security Context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 3. Generate the JWT String
            String jwt = jwtUtils.generateJwtToken(authentication);

            // 4. Extract user details
            // NOTE: If this cast fails, it will trigger the catch block below
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            // Safety check: Ensure the user and role aren't null before accessing them
            if (userPrincipal.getUser() == null || userPrincipal.getUser().getRole() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: User or Role data is missing in the database for user: " + userPrincipal.getUsername());
            }

            // Extract the role name (e.g., ROLE_USER)
            String role = userPrincipal.getAuthorities().stream()
                    .findFirst()
                    .map(GrantedAuthority::getAuthority)
                    .orElse("UNKNOWN");

            // 5. Build the response
            return ResponseEntity.ok(new JwtResponse(
                    jwt,
                    userPrincipal.getUser().getId(),
                    userPrincipal.getUsername(),
                    role));

        } catch (Exception e) {
            // Log to terminal
            System.out.println("--- LOGGING ACTUAL ERROR ---");
            e.printStackTrace();

            // Return the specific Java exception to Postman body
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Error: " + e.toString());
        }
    }

    // --- 2. Registration Endpoint ---
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        Role role = roleRepository.findByRoleName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Error: Role not found"));

        User newUser = new User(
                user.getUsername(),
                encoder.encode(user.getPassword()),
                user.getEmail(),
                role
        );

        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully!");
    }
}