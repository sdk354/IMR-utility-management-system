package coms.ums.repository;

import coms.ums.model.Payment;
import coms.ums.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Custom method to find all payments made by a specific user
    List<Payment> findByUserOrderByPaymentDateDesc(User user);
}