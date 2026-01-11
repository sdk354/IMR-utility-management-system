package coms.ums.repository;

import coms.ums.model.MeterReading;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeterReadingRepository extends JpaRepository<MeterReading, Long> {
    Page<MeterReading> findAllByMeterId(Long meterId, Pageable pageable);

    Page<MeterReading> findAllByUserId(Long userId, Pageable pageable);
}
