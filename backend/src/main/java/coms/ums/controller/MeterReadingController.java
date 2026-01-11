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

        if (reading.getReadingDate() == null || reading.getReadingDate().isEmpty()) {
            reading.setReadingDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        }


        if (reading.getUserId() == null) {
            reading.setUserId(1L);
        }

        MeterReading saved = readingRepo.save(reading);
        return ResponseEntity.ok(saved);
    }
}