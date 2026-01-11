package coms.ums.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complaintID")
    private Long id;

    @Column(name = "complaintText", columnDefinition = "TEXT", nullable = false)
    private String complaintText;

    @Column(name = "complaintDate", nullable = false)
    private LocalDateTime complaintDate;

    @Column(name = "status")
    private String status = "Pending";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", nullable = false)
    // Prevents Infinite Recursion loop: User -> Complaint -> User
    @JsonIgnoreProperties({"complaints", "password", "handler", "hibernateLazyInitializer"})
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "meterID")
    @JsonIgnoreProperties({"complaints", "handler", "hibernateLazyInitializer"})
    private Meter meter;

    public Complaint() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getComplaintText() { return complaintText; }
    public void setComplaintText(String complaintText) { this.complaintText = complaintText; }
    public LocalDateTime getComplaintDate() { return complaintDate; }
    public void setComplaintDate(LocalDateTime complaintDate) { this.complaintDate = complaintDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Meter getMeter() { return meter; }
    public void setMeter(Meter meter) { this.meter = meter; }
}