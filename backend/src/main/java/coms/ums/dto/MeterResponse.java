package coms.ums.dto;

import java.time.LocalDate;

public class MeterResponse {
    private Long id;
    private String serialNumber;
    private Integer utilityTypeId;
    private LocalDate installationDate;
    private String status;

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
