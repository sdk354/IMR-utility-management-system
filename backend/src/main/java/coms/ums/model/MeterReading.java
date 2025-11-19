package coms.ums.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Meter_Reading")
public class MeterReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "readingID")
    private Long id;

    @Column(name = "readingValue", nullable = false, precision = 18, scale = 4)
    private BigDecimal readingValue;

    @Column(name = "readingDate", nullable = false)
    private LocalDateTime readingDate;

    @Column(name = "remarks", length = 255)
    private String remarks;

    @Column(name = "userID")
    private Long userId;

    @Column(name = "meterID", nullable = false)
    private Long meterId;

    public MeterReading() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public BigDecimal getReadingValue() { return readingValue; }
    public void setReadingValue(BigDecimal readingValue) { this.readingValue = readingValue; }

    public LocalDateTime getReadingDate() { return readingDate; }
    public void setReadingDate(LocalDateTime readingDate) { this.readingDate = readingDate; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getMeterId() { return meterId; }
    public void setMeterId(Long meterId) { this.meterId = meterId; }
}
