package coms.ums.dto;

public class JwtResponse {

    private String token;
    private String type = "Bearer"; // Standard token type
    private Long id;
    private String username;
    private String role;

    // Constructor for successful login
    public JwtResponse(String accessToken, Long id, String username, String role) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.role = role;
    }

    // Getters and Setters (only for token and type are shown for brevity)
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // Add getters/setters for id, username, and role here...
}