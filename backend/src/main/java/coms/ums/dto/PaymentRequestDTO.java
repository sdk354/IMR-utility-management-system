package coms.ums.dto;

import java.math.BigDecimal;

public class PaymentRequestDTO {

    private Long billId; // The ID of the bill the user intends to pay
    private BigDecimal amount; // The amount the user is paying
    private String paymentMethod; // e.g., "Card", "Wallet"

    // Optional: could include card details or token here

    // Getters and Setters
    public Long getBillId() { return billId; }
    public void setBillId(Long billId) { this.billId = billId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}