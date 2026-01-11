package coms.ums.service;

import coms.ums.model.Bill;
import coms.ums.model.User;
import coms.ums.repository.BillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BillingService {

    private final BillRepository billRepository;

    public BillingService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Optional<Bill> getBillById(Long billId) {
        return billRepository.findById(billId);
    }

    public List<Bill> getBillsByUser(User user) {
        return billRepository.findByUserOrderByIssuedDateDesc(user);
    }

    @Transactional
    public Bill createNewBill(Bill bill) {
        if (bill.getIssuedDate() == null) {
            bill.setIssuedDate(java.time.LocalDate.now());
        }
        return billRepository.save(bill);
    }

    @Transactional
    public void markBillAsPaid(Long billId) {
        Bill bill = billRepository.findById(billId).orElseThrow(() -> new IllegalArgumentException("Bill not found"));
        bill.setStatus("Paid");
        billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    @Transactional
    public Bill updateBill(Long id, Bill billDetails) {
        Bill existingBill = billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));

        existingBill.setTotalAmount(billDetails.getTotalAmount());
        existingBill.setTotalConsumption(billDetails.getTotalConsumption());
        existingBill.setBillingPeriodStart(billDetails.getBillingPeriodStart());
        existingBill.setBillingPeriodEnd(billDetails.getBillingPeriodEnd());
        existingBill.setDueDate(billDetails.getDueDate());
        existingBill.setStatus(billDetails.getStatus());
        existingBill.setUser(billDetails.getUser());

        return billRepository.save(existingBill);
    }
}