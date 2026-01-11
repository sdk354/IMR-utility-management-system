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
import coms.ums.model.UserPrincipal;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;


    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));


            SecurityContextHolder.getContext().setAuthentication(authentication);


            String jwt = jwtUtils.generateJwtToken(authentication);


            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();


            if (userPrincipal.getUser() == null || userPrincipal.getUser().getRole() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: User or Role data is missing in the database for user: " + userPrincipal.getUsername());
            }


            String role = userPrincipal.getAuthorities().stream().findFirst().map(GrantedAuthority::getAuthority).orElse("UNKNOWN");


            return ResponseEntity.ok(new JwtResponse(jwt, userPrincipal.getUser().getId(), userPrincipal.getUsername(), role));

        } catch (Exception e) {

            System.out.println("--- LOGGING ACTUAL ERROR ---");
            e.printStackTrace();


            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Error: " + e.toString());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        Role role = roleRepository.findByRoleName("ROLE_USER").orElseThrow(() -> new RuntimeException("Error: Role not found"));

        User newUser = new User(user.getUsername(), encoder.encode(user.getPassword()), user.getEmail(), role);

        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully!");
    }
}