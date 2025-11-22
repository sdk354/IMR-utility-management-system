package coms.ums.service;

import coms.ums.model.Bill;
import coms.ums.repository.BillRepository;
import coms.ums.repository.PaymentRepository;
import coms.ums.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final UserRepository userRepository;
    private final BillRepository billRepository;
    private final PaymentRepository paymentRepository;

    public ReportService(UserRepository userRepository, BillRepository billRepository, PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.billRepository = billRepository;
        this.paymentRepository = paymentRepository;
    }

    /**
     * Generates a high-level summary of the system's current status.
     * Accessible by admins.
     * @return A map containing aggregated metrics.
     */
    public Map<String, Object> generateSystemSummary() {
        Map<String, Object> summary = new HashMap<>();

        // 1. User Metrics
        long totalUsers = userRepository.count();
        summary.put("totalUsers", totalUsers);

        // 2. Bill Metrics
        long totalBills = billRepository.count();
        summary.put("totalBillsGenerated", totalBills);

        List<Bill> unpaidBills = billRepository.findByIsPaidFalseAndDueDateBefore(LocalDate.now());
        summary.put("unpaidBillsCount", unpaidBills.size());

        // Calculate total outstanding amount
        BigDecimal totalOutstanding = unpaidBills.stream()
                .map(Bill::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        summary.put("totalOutstandingAmount", totalOutstanding);

        // 3. Payment Metrics
        long totalPayments = paymentRepository.count();
        summary.put("totalPaymentsProcessed", totalPayments);

        // Note: You would typically add more complex metrics here,
        // such as monthly revenue or payment success rates.

        return summary;
    }
}