package coms.ums.controller;

import coms.ums.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * Endpoint to fetch an aggregate summary, only available to Admins.
     */
    @GetMapping("/summary")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getSystemSummary() {
        // You'll need to implement the actual aggregation logic in ReportService
        Map<String, Object> summary = reportService.generateSystemSummary();
        return ResponseEntity.ok(summary);
    }
}