package coms.ums.dto;

// Standard imports for data validation (optional but good practice)
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank // Ensures the field is not null and not empty
    private String username;

    @NotBlank
    private String password;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}