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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillingService billingService;

    public BillController(BillingService billingService) {
        this.billingService = billingService;
    }

    /**
     * Endpoint for customers to fetch their own bills.
     * Maps to: GET /api/bills/my-bills
     */
    @GetMapping("/my-bills")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Bill>> getMyBills(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User currentUser = userPrincipal.getUser();
        // This now calls the service which uses the corrected 'issuedDate' sorting
        return ResponseEntity.ok(billingService.getBillsByUser(currentUser));
    }

    /**
     * General bills endpoint.
     * Admins can see all bills using ?adminView=true.
     */
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Bill>> getBills(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(value = "adminView", defaultValue = "false") boolean isAdminView) {

        // Check if admin is requesting the full list
        if (isAdminView && userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok(billingService.getAllBills());
        }

        // Otherwise, default to returning only the logged-in user's bills
        return ResponseEntity.ok(billingService.getBillsByUser(userPrincipal.getUser()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        Bill createdBill = billingService.createNewBill(bill);
        return ResponseEntity.status(201).body(createdBill);
    }

    @GetMapping("/public")
    public ResponseEntity<List<Bill>> getAllBillsPublic() {
        return ResponseEntity.ok(billingService.getAllBills());
    }
}