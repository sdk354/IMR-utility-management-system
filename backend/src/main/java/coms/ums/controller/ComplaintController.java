package coms.ums.controller;

import coms.ums.model.Complaint;
import coms.ums.model.UserPrincipal;
import coms.ums.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // Explicitly defining consumes ensures Spring knows this method handles JSON POSTs
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER', 'STAFF')")
    public ResponseEntity<?> createComplaint(@RequestBody Map<String, String> payload,
                                             @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            if (userPrincipal == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            // 1. Merge fields into a single string for the existing 'complaintText' layout
            String mergedText = String.format("[%s] %s: %s",
                    payload.getOrDefault("type", "General"),
                    payload.getOrDefault("subject", "No Subject"),
                    payload.getOrDefault("description", "No Description"));

            // 2. Map to existing Entity
            Complaint complaint = new Complaint();
            complaint.setComplaintText(mergedText);
            complaint.setComplaintDate(LocalDateTime.now());
            complaint.setStatus("Pending");
            complaint.setUser(userPrincipal.getUser());

            Complaint saved = complaintService.saveComplaint(complaint);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER', 'STAFF')")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Complaint> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        Complaint updated = complaintService.updateStatus(id, newStatus);
        return ResponseEntity.ok(updated);
    }
}