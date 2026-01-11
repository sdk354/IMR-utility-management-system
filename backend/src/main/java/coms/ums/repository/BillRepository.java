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

    // REMOVED: findByUserOrderByBillDateDesc (This was the cause of the crash)

    // USE THIS INSTEAD: Matches the 'issuedDate' field in your Bill model
    List<Bill> findByUserOrderByIssuedDateDesc(User user);

    // Custom method to find bills that are due and unpaid
    List<Bill> findByIsPaidFalseAndDueDateBefore(java.time.LocalDate date);

    @Procedure(procedureName = "CalculateMonthlyBills")
    void triggerBillGenerationProcedure();
}