package coms.ums.repository;

import coms.ums.model.Meter;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MeterRepository extends JpaRepository<Meter, Long> {

    Page<Meter> findAll(Pageable pageable);

}
