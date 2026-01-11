package coms.ums.controller;

import coms.ums.model.Tariff;
import coms.ums.service.TariffService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tariffs")
public class TariffController {

    private final TariffService tariffService;

    public TariffController(TariffService tariffService) {
        this.tariffService = tariffService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DEV')")
    public ResponseEntity<List<Tariff>> getAllTariffs() {
        return ResponseEntity.ok(tariffService.getAllTariffs());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DEV')")
    public ResponseEntity<Tariff> getTariffById(@PathVariable Long id) {
        return tariffService.getTariffById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Tariff> createTariff(@RequestBody Tariff tariff) {
        return ResponseEntity.ok(tariffService.saveTariff(tariff));
    }
}