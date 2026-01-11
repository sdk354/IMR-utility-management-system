package coms.ums.repository;

import coms.ums.model.Meter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MeterRepository extends JpaRepository<Meter, Long> {

    @Query(value = "SELECT m FROM Meter m LEFT JOIN FETCH m.customer", countQuery = "SELECT count(m) FROM Meter m")
    Page<Meter> findAll(Pageable pageable);

    long countByStatus(String status);

    long countByStatusIgnoreCase(String status);
}