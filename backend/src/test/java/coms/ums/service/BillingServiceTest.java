package coms.ums.service;

import coms.ums.model.Bill;
import coms.ums.model.User;
import coms.ums.model.Role;
import coms.ums.repository.BillRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BillingServiceTest {

    @Mock
    private BillRepository billRepository;

    @InjectMocks
    private BillingService billingService;

    private User testUser;
    private Bill testBill;

    @BeforeEach
    void setUp() {
        Role role = new Role();
        role.setId(1);
        role.setRoleName("ROLE_USER");

        testUser = new User("testuser", "hashedpass", "test@email.com", role);
        testUser.setId(1L);

        testBill = new Bill();
        testBill.setId(100L);
        testBill.setUser(testUser);
        testBill.setTotalAmount(new BigDecimal("150.00"));
        testBill.setStatus("Unpaid");
    }

    @Test
    void whenGetBillById_returnsBill() {
        when(billRepository.findById(100L)).thenReturn(Optional.of(testBill));

        Optional<Bill> result = billingService.getBillById(100L);

        assertTrue(result.isPresent());
        assertEquals(100L, result.get().getId());
    }

    @Test
    void whenGetBillsByUser_returnsListOfBills() {
        // ARRANGE
        List<Bill> bills = List.of(testBill);

        // FIXED: Renamed to findByUserOrderByIssuedDateDesc to match the Repository/Service
        when(billRepository.findByUserOrderByIssuedDateDesc(testUser)).thenReturn(bills);

        // ACT
        List<Bill> result = billingService.getBillsByUser(testUser);

        // ASSERT
        assertNotNull(result, "The result should not be null");
        assertFalse(result.isEmpty(), "The bill list should not be empty");
        assertEquals(1, result.size());

        // FIXED: Verify the call was made to the correct method
        verify(billRepository, times(1)).findByUserOrderByIssuedDateDesc(testUser);
    }
}