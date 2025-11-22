package coms.ums.controller;

import coms.ums.model.Bill;
import coms.ums.model.User;
import coms.ums.model.UserPrincipal;
import coms.ums.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillingService billingService;

    public BillController(BillingService billingService) {
        this.billingService = billingService;
    }

    /**
     * Endpoint to fetch all bills for the authenticated user.
     * Requires the user to be logged in.
     */
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Bill>> getAllUserBills(@AuthenticationPrincipal UserPrincipal userPrincipal) {

        // Use the underlying User object from the UserPrincipal
        User currentUser = userPrincipal.getUser();
        List<Bill> bills = billingService.getBillsByUser(currentUser);

        return ResponseEntity.ok(bills);
    }

    /**
     * Admin-only endpoint to create a new bill for any user.
     * Note: You would typically pass DTOs here, but using the Bill model for simplicity.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {

        // This assumes the Bill object passed in already contains the associated User object (or user ID).
        // In a real scenario, you'd use a DTO to pass the user ID and fetch the User here.
        Bill createdBill = billingService.createNewBill(bill);
        return ResponseEntity.status(201).body(createdBill);
    }
}