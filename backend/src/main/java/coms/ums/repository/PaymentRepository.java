package coms.ums.repository;

import coms.ums.model.Payment;
import coms.ums.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

// 1. Updated ID type to Integer to match Payment.java (@Id private Integer paymentID)
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // Helper for finding payments by User ID directly
    List<Payment> findByUserIdOrderByPaymentDateDesc(Long userId);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.paymentDate >= :startOfDay")
    BigDecimal sumPaymentsAfter(@Param("startOfDay") LocalDateTime startOfDay);

    @Query(value = "SELECT DATENAME(month, paymentDate) as month, SUM(amount) as total " +
            "FROM Payment " +
            "WHERE YEAR(paymentDate) = YEAR(GETDATE()) " +
            "GROUP BY MONTH(paymentDate), DATENAME(month, paymentDate) " +
            "ORDER BY MONTH(paymentDate)", nativeQuery = true)
    List<Object[]> getMonthlyRevenue();
}