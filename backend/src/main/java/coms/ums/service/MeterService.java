package coms.ums.service;

import coms.ums.dto.MeterRequest;
import coms.ums.dto.MeterResponse;
import coms.ums.exception.NotFoundException;
import coms.ums.model.Meter;
import coms.ums.repository.MeterRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class MeterService {

    private final MeterRepository meterRepo;

    public MeterService(MeterRepository meterRepo) {
        this.meterRepo = meterRepo;
    }

    public MeterResponse create(MeterRequest req) {
        Meter m = new Meter();
        m.setSerialNumber(req.getSerialNumber());
        m.setUtilityTypeId(req.getUtilityTypeId());
        m.setInstallationDate(req.getInstallationDate());
        m.setStatus(req.getStatus() == null ? "Active" : req.getStatus());
        Meter saved = meterRepo.save(m);
        return toResponse(saved);
    }

    public MeterResponse update(Long id, MeterRequest req) {
        Meter m = meterRepo.findById(id).orElseThrow(() -> new NotFoundException("Meter not found"));
        if (req.getSerialNumber() != null) m.setSerialNumber(req.getSerialNumber());
        if (req.getUtilityTypeId() != null) m.setUtilityTypeId(req.getUtilityTypeId());
        if (req.getInstallationDate() != null) m.setInstallationDate(req.getInstallationDate());
        if (req.getStatus() != null) m.setStatus(req.getStatus());
        Meter saved = meterRepo.save(m);
        return toResponse(saved);
    }

    public Page<MeterResponse> list(int page, int size, String sortBy, String direction) {
        Sort sort = Sort.by(sortBy == null ? "MeterID" : sortBy);
        sort = "desc".equalsIgnoreCase(direction) ? sort.descending() : sort.ascending();
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1), sort);
        return meterRepo.findAll(pageable).map(this::toResponse);
    }

    public MeterResponse get(Long id) {
        Meter m = meterRepo.findById(id).orElseThrow(() -> new NotFoundException("Meter not found"));
        return toResponse(m);
    }

    private MeterResponse toResponse(Meter m) {
        MeterResponse r = new MeterResponse();
        r.setId(m.getId());
        r.setSerialNumber(m.getSerialNumber());
        r.setUtilityTypeId(m.getUtilityTypeId());
        r.setInstallationDate(m.getInstallationDate());
        r.setStatus(m.getStatus());
        return r;
    }
}
