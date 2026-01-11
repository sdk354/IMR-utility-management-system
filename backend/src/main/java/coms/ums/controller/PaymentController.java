package coms.ums.controller;

import coms.ums.dto.PaymentRequestDTO;
import coms.ums.dto.PaymentResponseDTO;
import coms.ums.exception.TransactionFailedException;
import coms.ums.model.Payment;
import coms.ums.model.User;
import coms.ums.model.UserPrincipal;
import coms.ums.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> processPayment(@Valid @RequestBody PaymentRequestDTO paymentRequest, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            User currentUser = userPrincipal.getUser();
            Payment newPayment = paymentService.processPayment(paymentRequest, currentUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(new PaymentResponseDTO(newPayment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/my-payments")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<PaymentResponseDTO>> getMyPayments(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<PaymentResponseDTO> payments = paymentService.getPaymentsByUserId(userPrincipal.getUser().getId()).stream().map(PaymentResponseDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DEV')")
    public ResponseEntity<List<PaymentResponseDTO>> getPaymentHistoryByUserId(@PathVariable Long userId) {
        List<PaymentResponseDTO> payments = paymentService.getPaymentsByUserId(userId).stream().map(PaymentResponseDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(payments);
    }

    @GetMapping


    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        List<PaymentResponseDTO> payments = paymentService.getAllPayments().stream().map(PaymentResponseDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(payments);
    }
}