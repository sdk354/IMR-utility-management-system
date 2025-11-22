package coms.ums.service;

import coms.ums.dto.PaymentRequestDTO;
import coms.ums.exception.TransactionFailedException;
import coms.ums.model.Bill;
import coms.ums.model.Payment;
import coms.ums.model.User;
import coms.ums.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BillingService billingService;
    // Assume you have an external service/client for payment gateway (e.g., PaymentGatewayClient)

    public PaymentService(PaymentRepository paymentRepository, BillingService billingService) {
        this.paymentRepository = paymentRepository;
        this.billingService = billingService;
    }

    /**
     * Main method to process a user's payment.
     * @param request The payment details from the user.
     * @param currentUser The authenticated User making the payment.
     * @return The newly created Payment record.
     */
    @Transactional(rollbackFor = TransactionFailedException.class)
    public Payment processPayment(PaymentRequestDTO request, User currentUser) {

        // 1. Validate Bill Existence and Ownership
        Bill bill = billingService.getBillById(request.getBillId())
                .orElseThrow(() -> new IllegalArgumentException("Bill not found."));

        if (!bill.getUser().getId().equals(currentUser.getId())) {
            throw new SecurityException("User does not own this bill.");
        }

        if (bill.isPaid()) {
            throw new IllegalArgumentException("This bill is already paid.");
        }

        // 2. Validate Amount (Simple check, complex logic needed for partial payments)
        if (request.getAmount().compareTo(bill.getAmount()) < 0) {
            throw new IllegalArgumentException("Payment amount is less than the bill total.");
        }

        // --- 3. External Payment Gateway Simulation (Placeholder) ---
        // In a real application, you would call an external API here.
        String referenceId = simulateExternalPayment(request.getAmount(), request.getPaymentMethod());

        if (referenceId == null) {
            // Rollback happens due to @Transactional(rollbackFor = ...)
            throw new TransactionFailedException("Payment gateway declined the transaction.");
        }
        // -----------------------------------------------------------

        // 4. Create and Save Payment Record
        Payment payment = new Payment();
        payment.setBill(bill);
        payment.setUser(currentUser);
        payment.setAmountPaid(request.getAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setTransactionReference(referenceId);

        Payment savedPayment = paymentRepository.save(payment);

        // 5. Update Bill Status
        billingService.markBillAsPaid(bill.getId());

        return savedPayment;
    }

    /**
     * Placeholder for integrating with an external payment provider.
     * Returns a transaction reference ID on success, null on failure.
     */
    private String simulateExternalPayment(BigDecimal amount, String method) {
        // For demonstration: always succeeds unless the amount is suspiciously large
        if (amount.compareTo(new BigDecimal("1000000.00")) > 0) {
            return null; // Simulation of gateway failure
        }
        return "REF-" + System.currentTimeMillis();
    }
}