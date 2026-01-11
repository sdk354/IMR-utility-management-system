package coms.ums.service;

import coms.ums.model.Bill;
import coms.ums.model.User;
import coms.ums.repository.BillRepository;
import coms.ums.repository.MeterRepository;
import coms.ums.repository.PaymentRepository;
import coms.ums.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final UserRepository userRepository;
    private final BillRepository billRepository;
    private final PaymentRepository paymentRepository;
    private final MeterRepository meterRepository;

    public ReportService(UserRepository userRepository, BillRepository billRepository, PaymentRepository paymentRepository, MeterRepository meterRepository) {
        this.userRepository = userRepository;
        this.billRepository = billRepository;
        this.paymentRepository = paymentRepository;
        this.meterRepository = meterRepository;
    }

    public Map<String, Object> generateSystemSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalCustomers", userRepository.countActualCustomers());
        summary.put("activeMeters", meterRepository.countByStatus("Live"));
        summary.put("metersUnderRepair", meterRepository.countByStatus("Under Repair"));
        summary.put("metersSuspended", meterRepository.countByStatus("Suspended"));

        List<Bill> unpaidBills = billRepository.findByStatusAndDueDateBefore("Unpaid", LocalDate.now());
        BigDecimal totalOutstanding = unpaidBills.stream().map(Bill::getTotalAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        summary.put("outstandingBalance", totalOutstanding);

        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);
        BigDecimal todaysCollection = paymentRepository.sumPaymentsAfter(startOfDay);
        summary.put("todaysCollections", todaysCollection != null ? todaysCollection : BigDecimal.ZERO);
        summary.put("revenueTrend", paymentRepository.getMonthlyRevenue());

        return summary;
    }

    public Map<String, Object> getCustomerSummary(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> summary = new HashMap<>();
        List<Bill> bills = billRepository.findByUserOrderByIssuedDateDesc(user);
        Bill latest = bills.isEmpty() ? null : bills.get(0);

        summary.put("lastBillAmount", latest != null ? latest.getTotalAmount() : 0);
        summary.put("dueDate", latest != null ? latest.getDueDate().toString() : "N/A");
        summary.put("accountStatus", "Active");
        summary.put("currentUsage", latest != null ? latest.getTotalConsumption() : 0);

        List<Double> consumptionTrend = bills.stream().limit(12).map(Bill::getTotalConsumption).toList();
        summary.put("consumptionTrend", consumptionTrend);

        return summary;
    }

    public List<Map<String, Object>> getReportDataList(String type, String period) {
        LocalDate startDate = calculateStartDate(period);
        List<Map<String, Object>> reportList = new ArrayList<>();

        if (type.toLowerCase().contains("revenue")) {
            List<Bill> bills = billRepository.findAllByDueDateAfter(startDate);
            for (Bill b : bills) {
                Map<String, Object> row = new HashMap<>();
                row.put("ID", b.getId());
                row.put("Customer", b.getUser().getUsername());
                row.put("Date", b.getIssuedDate());
                row.put("Amount", b.getTotalAmount());
                row.put("Status", b.getStatus());
                reportList.add(row);
            }
        } else if (type.toLowerCase().contains("unpaid")) {
            List<Bill> unpaid = billRepository.findByStatusAndDueDateAfter("Unpaid", startDate);
            for (Bill b : unpaid) {
                Map<String, Object> row = new HashMap<>();
                row.put("Customer", b.getUser().getUsername());
                row.put("Due Date", b.getDueDate());
                row.put("Amount", b.getTotalAmount());
                reportList.add(row);
            }
        }
        return reportList;
    }

    public byte[] generateReportData(String type, String period) {
        StringBuilder csv = new StringBuilder();
        LocalDate startDate = calculateStartDate(period);

        if (type.toLowerCase().contains("revenue")) {
            csv.append("Date,Bill ID,Customer,Amount,Status\n");
            List<Bill> bills = billRepository.findAllByDueDateAfter(startDate);
            for (Bill b : bills) {
                csv.append(String.format("%s,%d,%s,%s,%s\n", b.getDueDate(), b.getId(), b.getUser().getUsername(), b.getTotalAmount(), b.getStatus()));
            }
        } else if (type.toLowerCase().contains("unpaid")) {
            csv.append("Customer,Email,Due Date,Outstanding Amount\n");
            List<Bill> unpaid = billRepository.findByStatusAndDueDateAfter("Unpaid", startDate);
            for (Bill b : unpaid) {
                csv.append(String.format("%s,%s,%s,%s\n", b.getUser().getUsername(), b.getUser().getEmail(), b.getDueDate(), b.getTotalAmount()));
            }
        }
        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    private LocalDate calculateStartDate(String period) {
        return switch (period) {
            case "Last 7 Days" -> LocalDate.now().minusDays(7);
            case "Last 30 Days" -> LocalDate.now().minusDays(30);
            case "Last Month" -> LocalDate.now().minusMonths(1).withDayOfMonth(1);
            case "This Year" -> LocalDate.now().withDayOfYear(1);
            default -> LocalDate.now();
        };
    }
}