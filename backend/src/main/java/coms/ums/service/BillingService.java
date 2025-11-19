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

    /**
     * Finds a bill by its ID.
     */
    public Optional<Bill> getBillById(Long billId) {
        return billRepository.findById(billId);
    }

    /**
     * Retrieves all bills for a specific user, ordered by issue date.
     */
    public List<Bill> getBillsByUser(User user) {
        return billRepository.findByUserOrderByIssuedDateDesc(user);
    }

    /**
     * Administrator function to generate and save a new bill.
     */
    @Transactional
    public Bill createNewBill(Bill bill) {
        // Here you might add complex logic for calculating meter readings,
        // applying tariffs, etc.
        if (bill.getIssuedDate() == null) {
            bill.setIssuedDate(java.time.LocalDate.now());
        }
        bill.setPaid(false); // Ensure the bill is marked unpaid upon creation
        return billRepository.save(bill);
    }

