package coms.ums.service;

import coms.ums.dto.PaymentRequestDTO;
import coms.ums.model.Bill;
import coms.ums.model.Payment;
import coms.ums.model.User;
import coms.ums.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BillingService billingService;

    public PaymentService(PaymentRepository paymentRepository, BillingService billingService) {
        this.paymentRepository = paymentRepository;
        this.billingService = billingService;
    }

    @Transactional(rollbackFor = {Exception.class})
    public Payment processPayment(PaymentRequestDTO request, User currentUser) {
        // 1. Validate Bill
        Bill bill = billingService.getBillById(request.getBillId())
                .orElseThrow(() -> new IllegalArgumentException("Bill not found."));

        // 2. Security Check
        String roleName = currentUser.getRole().getRoleName();
        boolean isAdmin = roleName.equalsIgnoreCase("ADMIN") || roleName.equalsIgnoreCase("DEV");

        if (!isAdmin && !bill.getUser().getId().equals(currentUser.getId())) {
            throw new SecurityException("Access Denied: You do not own this bill.");
        }

        if ("Paid".equalsIgnoreCase(bill.getStatus())) {
            throw new IllegalArgumentException("This bill has already been settled.");
        }

        // 3. Save Payment (REMOVED Status line)
        Payment payment = new Payment();
        payment.setBill(bill);
        payment.setUser(bill.getUser());
        payment.setAmount(request.getAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setReceiptNo("RCPT-" + System.currentTimeMillis());

        Payment savedPayment = paymentRepository.save(payment);

        // 4. Update the Bill
        billingService.markBillAsPaid(bill.getBillID());

        return savedPayment;
    }

    public List<Payment> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUserIdOrderByPaymentDateDesc(userId);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}