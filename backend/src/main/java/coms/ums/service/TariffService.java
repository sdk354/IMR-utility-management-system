package coms.ums.service;

import coms.ums.model.Tariff;
import coms.ums.repository.TariffRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TariffService {

    private final TariffRepository tariffRepository;

    public TariffService(TariffRepository tariffRepository) {
        this.tariffRepository = tariffRepository;
    }

    public List<Tariff> getAllTariffs() {
        return tariffRepository.findAll();
    }

    public Optional<Tariff> getTariffById(Long id) {
        return tariffRepository.findById(id);
    }

    public List<Tariff> getApplicableTariffs(Integer utilityTypeId) {
        return tariffRepository.findApplicableTariffs(utilityTypeId, LocalDate.now());
    }

    public Tariff saveTariff(Tariff tariff) {
        return tariffRepository.save(tariff);
    }

    public void deleteTariff(Long id) {
        tariffRepository.deleteById(id);
    }
}