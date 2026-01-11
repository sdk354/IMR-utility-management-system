package coms.ums.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

/**
 * Implements Spring Security's UserDetails interface.
 * It wraps the application's User entity to provide security-specific information.
 */
public class UserPrincipal implements UserDetails {

    private final User user;

    // Constructor to create the principal from your application's User entity
    public UserPrincipal(User user) {
        this.user = user;
    }

    /**
     * Maps the User's role to a collection of GrantedAuthority objects.
     * In a simple setup, we just use the 'role' field.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleName = (user.getRole() != null) ? user.getRole().getRoleName() : "ROLE_USER";
        return Collections.singletonList(new SimpleGrantedAuthority(roleName));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    // --- Account Status Overrides (Set to true for a healthy account) ---
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Getter to access the underlying User entity if needed later
    public User getUser() {
        return user;
    }
}