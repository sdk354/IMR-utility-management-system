package coms.ums.service;

import coms.ums.model.UserPrincipal;
import coms.ums.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service // Mark as a Spring service component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    // Inject UserRepository using constructor injection
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads a user from the database given a username,
     * and returns a UserDetails object (our UserPrincipal).
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Use the repository method we defined earlier
        return userRepository.findByUsername(username)
                .map(UserPrincipal::new) // Map the User entity to our UserPrincipal
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username: " + username)
                );
    }
}