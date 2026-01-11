package coms.ums.controller;

import coms.ums.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // Admin Dashboard Endpoint
    @GetMapping("/summary")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getSystemSummary() {
        return ResponseEntity.ok(reportService.generateSystemSummary());
    }

    // NEW: Customer Dashboard Endpoint (Fixes the 500 error for /customer-summary)
    @GetMapping("/customer-summary")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String, Object>> getCustomerSummary(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(reportService.getCustomerSummary(userDetails.getUsername()));
    }

    @GetMapping("/data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getReportData(
            @RequestParam String type,
            @RequestParam String period) {
        return ResponseEntity.ok(reportService.getReportDataList(type, period));
    }

    @GetMapping("/download")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> downloadReport(
            @RequestParam String type,
            @RequestParam String period) {

        byte[] data = reportService.generateReportData(type, period);
        String filename = type.replace(" ", "_") + ".csv";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(data);
    }
}