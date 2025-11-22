package coms.ums.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Tariff")
public class Tariff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tariffID")
    private Long id;

    @Column(name = "effectiveFrom")
    private LocalDate effectiveFrom;

    @Column(name = "effectiveTo")
    private LocalDate effectiveTo;

    @Column(name = "slabFrom", precision = 18, scale = 4)
    private BigDecimal slabFrom;

    @Column(name = "slabTo", precision = 18, scale = 4)
    private BigDecimal slabTo;

    @Column(name = "rate", precision = 18, scale = 4)
    private BigDecimal rate;

    @Column(name = "fixedCharge", precision = 12, scale = 2)
    private BigDecimal fixedCharge;

    @Column(name = "subsidiaryPercentage", precision = 5, scale = 2)
    private BigDecimal subsidiaryPercentage;

    @Column(name = "utilityTypeID")
    private Integer utilityTypeId;

    public Tariff() {}

    // getters / setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getEffectiveFrom() { return effectiveFrom; }
    public void setEffectiveFrom(LocalDate effectiveFrom) { this.effectiveFrom = effectiveFrom; }
    public LocalDate getEffectiveTo() { return effectiveTo; }
    public void setEffectiveTo(LocalDate effectiveTo) { this.effectiveTo = effectiveTo; }
    public BigDecimal getSlabFrom() { return slabFrom; }
    public void setSlabFrom(BigDecimal slabFrom) { this.slabFrom = slabFrom; }
    public BigDecimal getSlabTo() { return slabTo; }
    public void setSlabTo(BigDecimal slabTo) { this.slabTo = slabTo; }
    public BigDecimal getRate() { return rate; }
    public void setRate(BigDecimal rate) { this.rate = rate; }
    public BigDecimal getFixedCharge() { return fixedCharge; }
    public void setFixedCharge(BigDecimal fixedCharge) { this.fixedCharge = fixedCharge; }
    public BigDecimal getSubsidiaryPercentage() { return subsidiaryPercentage; }
    public void setSubsidiaryPercentage(BigDecimal subsidiaryPercentage) { this.subsidiaryPercentage = subsidiaryPercentage; }
    public Integer getUtilityTypeId() { return utilityTypeId; }
    public void setUtilityTypeId(Integer utilityTypeId) { this.utilityTypeId = utilityTypeId; }
}
