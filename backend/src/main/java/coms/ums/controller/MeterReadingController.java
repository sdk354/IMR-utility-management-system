package coms.ums.controller;

import coms.ums.model.MeterReading;
import coms.ums.repository.MeterReadingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "http://localhost:3000")
public class MeterReadingController {

    private final MeterReadingRepository readingRepo;

    public MeterReadingController(MeterReadingRepository readingRepo) {
        this.readingRepo = readingRepo;
    }

    @PostMapping
    public ResponseEntity<MeterReading> createManualReading(@RequestBody MeterReading reading) {
        // 1. Ensure date format is correct for SQL datetime2 if not provided
        if (reading.getReadingDate() == null || reading.getReadingDate().isEmpty()) {
            reading.setReadingDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        }

        // 2. The userId is now sent from React, but we keep a final safety fallback
        // to prevent Database NULL constraint violations.
        if (reading.getUserId() == null) {
            reading.setUserId(1L);
        }

        MeterReading saved = readingRepo.save(reading);
        return ResponseEntity.ok(saved);
    }
}