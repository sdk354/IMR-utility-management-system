package coms.ums.service;

import coms.ums.model.Bill;
import coms.ums.model.User;
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

// 1. Use MockitoExtension to enable mocking
@ExtendWith(MockitoExtension.class)
public class BillingServiceTest {

    // 2. Create a mock instance of the dependency (BillRepository)
    @Mock
    private BillRepository billRepository;

    // 3. Inject the mocks into the service class being tested
    @InjectMocks
    private BillingService billingService;

    private User testUser;
    private Bill testBill;

    // Runs before each test method
    @BeforeEach
    void setUp() {
        testUser = new User("testuser", "hashedpass", "test@email.com", "ROLE_USER");
        testUser.setId(1L);

        testBill = new Bill();
        testBill.setId(100L);
        testBill.setUser(testUser);
        testBill.setAmount(new BigDecimal("150.00"));
        testBill.setPaid(false);
    }

    @Test
    void whenGetBillById_returnsBill() {
        // Arrange: Define the behavior of the mocked repository
        when(billRepository.findById(100L)).thenReturn(Optional.of(testBill));

        // Act: Call the service method
        Optional<Bill> result = billingService.getBillById(100L);

        // Assert: Check the result
        assertTrue(result.isPresent());
        assertEquals(100L, result.get().getId());
    }

    @Test
    void whenGetBillsByUser_returnsListOfBills() {
        // Arrange
        List<Bill> bills = List.of(testBill);
        when(billRepository.findByUserOrderByIssuedDateDesc(testUser)).thenReturn(bills);

        // Act
        List<Bill> result = billingService.getBillsByUser(testUser);

        // Assert
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        // Verify that the repository method was called exactly once
        verify(billRepository, times(1)).findByUserOrderByIssuedDateDesc(testUser);
    }
}