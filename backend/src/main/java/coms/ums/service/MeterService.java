package coms.ums.service;

import coms.ums.dto.MeterRequest;
import coms.ums.dto.MeterResponse;
import coms.ums.exception.NotFoundException;
import coms.ums.model.Meter;
import coms.ums.model.User;
import coms.ums.repository.MeterRepository;
import coms.ums.repository.UserRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MeterService {

    private final MeterRepository meterRepo;
    private final UserRepository userRepo;

    public MeterService(MeterRepository meterRepo, UserRepository userRepo) {
        this.meterRepo = meterRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public MeterResponse create(MeterRequest req) {
        User customer = userRepo.findById(req.getCustomerId()).orElseThrow(() -> new NotFoundException("Customer not found"));

        if (customer.getRole() == null || !"Customer".equalsIgnoreCase(customer.getRole().getRoleName())) {
            throw new IllegalArgumentException("Meters can only be assigned to users with the 'Customer' role.");
        }

        Meter m = new Meter();
        m.setSerialNumber(req.getSerialNumber());
        m.setUtilityTypeId(req.getUtilityTypeId());
        m.setInstallationDate(req.getInstallationDate());
        m.setStatus(req.getStatus() == null ? "Live" : req.getStatus());
        m.setCustomer(customer);

        return toResponse(meterRepo.save(m));
    }

    @Transactional
    public MeterResponse update(Long id, MeterRequest req) {
        Meter m = meterRepo.findById(id).orElseThrow(() -> new NotFoundException("Meter not found"));

        m.setSerialNumber(req.getSerialNumber());
        m.setUtilityTypeId(req.getUtilityTypeId());
        m.setInstallationDate(req.getInstallationDate());
        m.setStatus(req.getStatus());

        if (req.getCustomerId() != null) {
            User customer = userRepo.findById(req.getCustomerId()).orElseThrow(() -> new NotFoundException("User not found"));

            if (customer.getRole() == null || !"Customer".equalsIgnoreCase(customer.getRole().getRoleName())) {
                throw new IllegalArgumentException("Cannot assign meter to an Admin. Only 'Customer' role allowed.");
            }

            m.setCustomer(customer);
        } else {
            m.setCustomer(null);
        }

        Meter saved = meterRepo.saveAndFlush(m);
        return toResponse(saved);
    }

    public Page<MeterResponse> list(int page, int size, String sortBy, String direction) {
        Sort sort = Sort.by(sortBy == null ? "id" : sortBy);
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

        if (m.getCustomer() != null) {
            r.setCustomerId(m.getCustomer().getId());
            r.setCustomerName(m.getCustomer().getUsername());
        } else {
            r.setCustomerName("Unassigned");
        }
        return r;
    }
}