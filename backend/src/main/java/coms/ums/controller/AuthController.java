package coms.ums.controller;

import coms.ums.dto.JwtResponse;
import coms.ums.dto.LoginRequest;
import coms.ums.model.User;
import coms.ums.repository.UserRepository;
import coms.ums.service.JwtUtils;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import coms.ums.model.UserPrincipal; // Needed to get details after successful auth

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth") // Base URL for all auth endpoints
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    // Constructor Injection
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    // --- 1. Login Endpoint ---
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // 1. Authenticate the user credentials using the AuthenticationManager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        // 2. Place the successful authentication object in the Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Generate the JWT
        String jwt = jwtUtils.generateJwtToken(authentication);

        // 4. Extract user details and build the response
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        // Assuming your UserPrincipal's getAuthorities()[0] returns the role string
        String role = userPrincipal.getAuthorities().iterator().next().getAuthority();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userPrincipal.getUser().getId(),
                userPrincipal.getUsername(),
                role));
    }

    // --- 2. Registration Endpoint ---
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {

        // Basic check for existence
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User newUser = new User(
                user.getUsername(),
                encoder.encode(user.getPassword()), // *** Store the HASHED password ***
                user.getEmail(),
                "ROLE_USER" // Default role for new registrations
        );

        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully!");
    }
}