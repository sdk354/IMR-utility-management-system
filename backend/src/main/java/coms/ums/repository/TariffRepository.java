package coms.ums.repository;

import coms.ums.model.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TariffRepository extends JpaRepository<Tariff, Long> {

    @Query("SELECT t FROM Tariff t WHERE t.utilityTypeId = :utilityTypeId " + "AND (t.effectiveFrom IS NULL OR t.effectiveFrom <= :onDate) " + "AND (t.effectiveTo IS NULL OR t.effectiveTo >= :onDate) " + "ORDER BY t.slabFrom ASC")
    List<Tariff> findApplicableTariffs(@Param("utilityTypeId") Integer utilityTypeId, @Param("onDate") LocalDate onDate);

    List<Tariff> findByUtilityTypeIdOrderBySlabFromAsc(Integer utilityTypeId);
}
