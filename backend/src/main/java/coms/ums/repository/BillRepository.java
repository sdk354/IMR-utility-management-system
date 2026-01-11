package coms.ums.repository;

import coms.ums.model.Bill;
import coms.ums.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUserOrderByIssuedDateDesc(User user);

    List<Bill> findByStatusAndDueDateBefore(String status, LocalDate date);

    List<Bill> findAllByDueDateAfter(LocalDate date);

    List<Bill> findByStatusAndDueDateAfter(String status, LocalDate date);

    @Query("SELECT SUM(b.totalAmount) FROM Bill b WHERE b.issuedDate >= :startDate")
    Double sumBillsAfter(@Param("startDate") LocalDate startDate);
}