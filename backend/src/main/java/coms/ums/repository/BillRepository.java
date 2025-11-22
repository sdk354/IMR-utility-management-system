package coms.ums.repository;

import coms.ums.model.Bill;
import coms.ums.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {

    // Custom method to find all bills for a specific user
    List<Bill> findByUserOrderByIssuedDateDesc(User user);

    // Custom method to find bills that are due and unpaid
    List<Bill> findByIsPaidFalseAndDueDateBefore(java.time.LocalDate date);
}