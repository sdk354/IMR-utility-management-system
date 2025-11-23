package coms.ums.controller;

import coms.ums.dto.PaymentRequestDTO;
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
import javax.validation.Valid;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * Endpoint for an authenticated user to process a payment.
     * Uses the PaymentRequestDTO for input.
     */
    @PostMapping("/process")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> processPayment(@Valid @RequestBody PaymentRequestDTO paymentRequest,
                                            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            User currentUser = userPrincipal.getUser();
            Payment newPayment = paymentService.processPayment(paymentRequest, currentUser);

            // Return the created payment object along with a 201 Created status
            return ResponseEntity.status(HttpStatus.CREATED).body(newPayment);

        } catch (TransactionFailedException e) {
            // TransactionFailedException is mapped to a 400 status in its definition (@ResponseStatus)
            return ResponseEntity.badRequest().body("Payment failed: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            // Handle bad requests like bill already paid, invalid amount, etc.
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (SecurityException e) {
            // Handle attempts to pay someone else's bill
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}