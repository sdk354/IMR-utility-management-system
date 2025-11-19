package coms.ums.controller;

import coms.ums.dto.ImportResult;
import coms.ums.service.MeterReadingImportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/readings/import")
public class MeterReadingImportController {

    private final MeterReadingImportService importService;

    public MeterReadingImportController(MeterReadingImportService importService) {
        this.importService = importService;
    }

    /**
     * Upload CSV file with meter readings.
     * Form field name must be "file".
     * Returns 201 Created when all rows succeeded, 207 Multi-Status when some rows failed.
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImportResult> importCsv(@RequestPart("file") MultipartFile file) {
        ImportResult result = importService.importCsv(file);
        HttpStatus status = result.getFailureCount() == 0 ? HttpStatus.CREATED : HttpStatus.MULTI_STATUS;
        return ResponseEntity.status(status).body(result);
    }

    /**
     * Simple health check for the import endpoint (optional).
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("import endpoint up");
    }
}
