package coms.ums.controller;

import coms.ums.dto.MeterRequest;
import coms.ums.dto.MeterResponse;
import coms.ums.service.MeterService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meters")
public class MeterController {

    private final MeterService service;

    public MeterController(MeterService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<MeterResponse> create(@Valid @RequestBody MeterRequest req) {
        MeterResponse r = service.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(r);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MeterResponse> update(@PathVariable Long id, @Valid @RequestBody MeterRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @GetMapping
    public ResponseEntity<Page<MeterResponse>> list(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(required = false) String sortBy, @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(service.list(page, size, sortBy, direction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeterResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }
}
