package coms.ums.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Meter")
public class Meter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meterID")
    private Long id;

    @Column(name = "serialNumber", nullable = false, unique = true, length = 100)
    private String serialNumber;

    @Column(name = "utilityTypeID", nullable = false)
    private Integer utilityTypeId;

    @Column(name = "installationDate")
    private LocalDate installationDate;

    @Column(name = "status", length = 50)
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customerID", referencedColumnName = "userID")
    private User customer;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getUtilityTypeId() {
        return utilityTypeId;
    }

    public void setUtilityTypeId(Integer utilityTypeId) {
        this.utilityTypeId = utilityTypeId;
    }

    public LocalDate getInstallationDate() {
        return installationDate;
    }

    public void setInstallationDate(LocalDate installationDate) {
        this.installationDate = installationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }
}