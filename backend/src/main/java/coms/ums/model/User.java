package coms.ums.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "[User]")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID")
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "passwordHash", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore // <--- IMPORTANT: Prevents serialization issues & security leaks
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "contactNo")
    private String contactNo;

    @Column(name = "street")
    private String street;

    @Column(name = "streetNo")
    private String streetNo;

    @Column(name = "city")
    private String city;

    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roleID", nullable = false)
// Add "users" to the ignore list if your Role entity has a List<User> users field
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "users"})
    private Role role;

    public User() {}

    public User(String username, String password, String email, Role role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContactNo() { return contactNo; }
    public void setContactNo(String contactNo) { this.contactNo = contactNo; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getStreetNo() { return streetNo; }
    public void setStreetNo(String streetNo) { this.streetNo = streetNo; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}