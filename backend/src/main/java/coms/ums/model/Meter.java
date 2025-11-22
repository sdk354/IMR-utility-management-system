package coms.ums.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Meter")
public class Meter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MeterID")
    private Long id;

    @Column(name = "SerialNumber", nullable = false, unique = true, length = 100)
    private String serialNumber;

    @Column(name = "UtilityTypeID", nullable = false)
    private Integer utilityTypeId;

    @Column(name = "InstallationDate")
    private LocalDate installationDate;

    @Column(name = "Status", length = 50)
    private String status;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }
    public Integer getUtilityTypeId() { return utilityTypeId; }
    public void setUtilityTypeId(Integer utilityTypeId) { this.utilityTypeId = utilityTypeId; }
    public LocalDate getInstallationDate() { return installationDate; }
    public void setInstallationDate(LocalDate installationDate) { this.installationDate = installationDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
