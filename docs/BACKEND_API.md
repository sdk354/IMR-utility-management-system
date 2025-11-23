# Backend API Documentation

## Overview
The backend is structured as a Java Spring Boot application following MVC (Model-View-Controller) architecture. Currently, only skeleton/placeholder files exist in the backend directory.

## Technology Stack
- **Framework**: Spring Boot (Java)
- **Architecture**: RESTful API with MVC pattern
- **Package Structure**: com.ums (Utility Management System)

## Location
```
/backend/src/main/java/coms/ums/
├── config/          # Configuration classes
├── controller/      # REST controllers (endpoints)
├── dto/            # Data Transfer Objects
├── exception/      # Custom exception handlers
├── model/          # Entity/domain models
├── repository/     # Data access layer
└── service/        # Business logic layer
```

## Current Status
**⚠️ PLACEHOLDER IMPLEMENTATION**
- All files are test/placeholder files (Test1.java through Test7.java)
- No actual API endpoints implemented
- Structure exists but requires full implementation

---

## Planned Architecture

### 1. Model Layer (`/model/`)
**Purpose**: Entity classes mapping to database tables

**Planned Entities**:
- `User.java` - User entity (customers, admins, staff)
- `Role.java` - User roles
- `UtilityType.java` - Utility type definitions
- `Meter.java` - Meter entity
- `MeterReading.java` - Meter reading records
- `Tariff.java` - Tariff structures
- `Bill.java` - Billing records
- `BillTariff.java` - Bill-tariff junction
- `Payment.java` - Payment transactions
- `Complaint.java` - Customer complaints

**Example Structure**:
```java
@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(unique = true, nullable = false)
    private String username;

    private String passwordHash;
    private String email;
    private String contactNo;
    private String street;
    private String streetNo;
    private String city;
    private String status;

    @ManyToOne
    @JoinColumn(name = "roleID")
    private Role role;

    // Getters, setters, constructors
}
```

---

### 2. Repository Layer (`/repository/`)
**Purpose**: Data access using Spring Data JPA

**Planned Repositories**:
- `UserRepository.java`
- `RoleRepository.java`
- `UtilityTypeRepository.java`
- `MeterRepository.java`
- `MeterReadingRepository.java`
- `TariffRepository.java`
- `BillRepository.java`
- `BillTariffRepository.java`
- `PaymentRepository.java`
- `ComplaintRepository.java`

**Example Structure**:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByStatus(String status);
    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.role.roleName = :roleName")
    List<User> findByRoleName(@Param("roleName") String roleName);
}
```

---

### 3. Service Layer (`/service/`)
**Purpose**: Business logic and transaction management

**Planned Services**:

#### UserService
- `registerUser(UserDTO userDTO)` - Create new user
- `updateUser(Integer id, UserDTO userDTO)` - Update user
- `getUserById(Integer id)` - Get user by ID
- `getUserByUsername(String username)` - Find by username
- `deactivateUser(Integer id)` - Deactivate account
- `getAllCustomers()` - Get all customers

#### MeterService
- `registerMeter(MeterDTO meterDTO)` - Register new meter
- `assignMeterToCustomer(Integer meterId, Integer customerId)` - Assign meter
- `getMetersByCustomer(Integer customerId)` - Get customer meters
- `updateMeterStatus(Integer meterId, String status)` - Update status
- `getMeterBySerialNumber(String serialNumber)` - Find by serial

#### MeterReadingService
- `addReading(MeterReadingDTO readingDTO)` - Add new reading
- `getReadingsByMeter(Integer meterId)` - Get meter history
- `getReadingsByDateRange(Integer meterId, LocalDate start, LocalDate end)` - Filter by date
- `validateReading(MeterReadingDTO readingDTO)` - Validate reading value

#### BillingService
- `generateBill(Integer userId, LocalDate startDate, LocalDate endDate)` - Generate bill
- `calculateBillAmount(Integer meterId, BigDecimal consumption)` - Calculate charges
- `applyTariffs(Bill bill, BigDecimal consumption)` - Apply tariff slabs
- `getBillsByCustomer(Integer userId)` - Get customer bills
- `updateBillStatus(Integer billId, String status)` - Update status
- `calculateLateFee(Integer billId)` - Calculate late fees

#### PaymentService
- `recordPayment(PaymentDTO paymentDTO)` - Record payment
- `getPaymentsByBill(Integer billId)` - Get bill payments
- `getPaymentsByCustomer(Integer userId)` - Get customer payments
- `generateReceipt(Integer paymentId)` - Generate receipt
- `refundPayment(Integer paymentId)` - Process refund

#### TariffService
- `createTariff(TariffDTO tariffDTO)` - Create new tariff
- `updateTariff(Integer tariffId, TariffDTO tariffDTO)` - Update tariff
- `getActiveTariffs(Integer utilityTypeId)` - Get active tariffs
- `getTariffForDate(Integer utilityTypeId, LocalDate date)` - Get tariff by date
- `deactivateTariff(Integer tariffId)` - Deactivate tariff

#### ComplaintService
- `createComplaint(ComplaintDTO complaintDTO)` - Submit complaint
- `updateComplaintStatus(Integer complaintId, String status)` - Update status
- `assignComplaint(Integer complaintId, Integer staffId)` - Assign to staff
- `getComplaintsByCustomer(Integer userId)` - Get customer complaints
- `getPendingComplaints()` - Get pending queue

#### ReportService
- `getMonthlyRevenue(Integer year, Integer month)` - Revenue report
- `getConsumptionReport(Integer userId, LocalDate start, LocalDate end)` - Consumption report
- `getPaymentCollectionReport(LocalDate start, LocalDate end)` - Collection report
- `getOutstandingBalanceReport()` - Outstanding balances
- `getComplaintResolutionReport(LocalDate start, LocalDate end)` - Complaint metrics

---

### 4. Controller Layer (`/controller/`)
**Purpose**: REST API endpoints

**Planned Controllers**:

#### UserController (`/api/users`)
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO);

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Integer id);

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer id, @RequestBody UserDTO userDTO);

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivateUser(@PathVariable Integer id);

    @GetMapping("/customers")
    public ResponseEntity<List<UserDTO>> getAllCustomers();
}
```

#### MeterController (`/api/meters`)
```
POST /api/meters - Register new meter
GET /api/meters/{id} - Get meter details
PUT /api/meters/{id} - Update meter
GET /api/meters/customer/{customerId} - Get customer meters
POST /api/meters/{id}/assign - Assign to customer
GET /api/meters/serial/{serialNumber} - Find by serial
```

#### MeterReadingController (`/api/readings`)
```
POST /api/readings - Add reading
GET /api/readings/meter/{meterId} - Get meter readings
GET /api/readings/{id} - Get reading details
DELETE /api/readings/{id} - Delete reading
```

#### BillingController (`/api/bills`)
```
POST /api/bills/generate - Generate bill
GET /api/bills/{id} - Get bill details
GET /api/bills/customer/{customerId} - Get customer bills
PUT /api/bills/{id}/status - Update bill status
GET /api/bills/unpaid - Get unpaid bills
```

#### PaymentController (`/api/payments`)
```
POST /api/payments - Record payment
GET /api/payments/{id} - Get payment details
GET /api/payments/bill/{billId} - Get bill payments
GET /api/payments/customer/{customerId} - Get customer payments
POST /api/payments/{id}/refund - Process refund
```

#### TariffController (`/api/tariffs`)
```
POST /api/tariffs - Create tariff
GET /api/tariffs/{id} - Get tariff details
GET /api/tariffs/active - Get active tariffs
PUT /api/tariffs/{id} - Update tariff
DELETE /api/tariffs/{id} - Deactivate tariff
```

#### ComplaintController (`/api/complaints`)
```
POST /api/complaints - Submit complaint
GET /api/complaints/{id} - Get complaint details
GET /api/complaints/customer/{customerId} - Get customer complaints
PUT /api/complaints/{id}/status - Update status
PUT /api/complaints/{id}/assign - Assign to staff
GET /api/complaints/pending - Get pending complaints
```

#### ReportController (`/api/reports`)
```
GET /api/reports/revenue - Monthly revenue report
GET /api/reports/consumption - Consumption analytics
GET /api/reports/collections - Payment collections
GET /api/reports/outstanding - Outstanding balances
GET /api/reports/complaints - Complaint metrics
```

#### AuthController (`/api/auth`)
```
POST /api/auth/login - User login
POST /api/auth/logout - User logout
POST /api/auth/refresh - Refresh token
POST /api/auth/change-password - Change password
```

---

### 5. DTO Layer (`/dto/`)
**Purpose**: Data transfer objects for API communication

**Planned DTOs**:
- `UserDTO.java`
- `LoginDTO.java`
- `MeterDTO.java`
- `MeterReadingDTO.java`
- `BillDTO.java`
- `PaymentDTO.java`
- `TariffDTO.java`
- `ComplaintDTO.java`
- `ReportDTO.java`

**Example Structure**:
```java
public class MeterReadingDTO {
    private Integer readingID;
    private BigDecimal readingValue;
    private LocalDateTime readingDate;
    private String remarks;
    private Integer userID;
    private String username;
    private Integer meterID;
    private String meterSerial;

    // Constructors, getters, setters
}
```

---

### 6. Exception Layer (`/exception/`)
**Purpose**: Custom exception handling

**Planned Exceptions**:
- `ResourceNotFoundException.java` - 404 errors
- `DuplicateResourceException.java` - Duplicate entries
- `InvalidRequestException.java` - Bad requests
- `UnauthorizedException.java` - Auth failures
- `BusinessLogicException.java` - Business rule violations

**Global Exception Handler**:
```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex);

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(DuplicateResourceException ex);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex);
}
```

---

### 7. Config Layer (`/config/`)
**Purpose**: Application configuration

**Planned Configurations**:

#### SecurityConfig
- Spring Security configuration
- JWT authentication
- CORS settings
- Password encoding

#### DatabaseConfig
- Data source configuration
- Connection pooling
- Transaction management

#### WebConfig
- CORS mappings
- Interceptors
- Message converters

---

## API Response Format

### Success Response:
```json
{
    "status": "success",
    "data": { ... },
    "message": "Operation completed successfully"
}
```

### Error Response:
```json
{
    "status": "error",
    "error": {
        "code": "RESOURCE_NOT_FOUND",
        "message": "User with ID 123 not found"
    },
    "timestamp": "2024-01-22T10:30:00Z"
}
```

### Paginated Response:
```json
{
    "status": "success",
    "data": [ ... ],
    "pagination": {
        "page": 1,
        "size": 20,
        "totalPages": 5,
        "totalElements": 100
    }
}
```

---

## Authentication & Security

### JWT Authentication:
1. User logs in with credentials
2. Server validates and returns JWT token
3. Client includes token in Authorization header
4. Server validates token on each request

### Security Features:
- Password hashing (BCrypt)
- Role-based access control (RBAC)
- CSRF protection
- CORS configuration
- Request rate limiting
- Input validation
- SQL injection prevention

---

## Database Integration

### Configuration (application.properties):
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=utility_management_system
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect
```

---

## Development Roadmap

### Phase 1: Core Setup
1. Configure Spring Boot application
2. Set up database connection
3. Create entity models
4. Implement repositories
5. Configure security

### Phase 2: Basic CRUD
1. User management APIs
2. Meter management APIs
3. Basic authentication

### Phase 3: Business Logic
1. Meter reading services
2. Billing calculation
3. Payment processing
4. Tariff application

### Phase 4: Advanced Features
1. Complaint handling
2. Report generation
3. Notifications
4. Advanced analytics

### Phase 5: Integration & Testing
1. Frontend integration
2. API testing
3. Performance optimization
4. Security hardening

---

## Testing Strategy

### Unit Tests:
- Service layer business logic
- Utility methods
- Validation logic

### Integration Tests:
- Repository layer with test database
- Controller endpoints
- End-to-end flows

### Test Coverage:
- Minimum 80% code coverage
- All critical paths tested
- Edge cases handled

---

## API Documentation

### Tools:
- **Swagger/OpenAPI**: Auto-generated API docs
- **Postman Collections**: API testing
- **JavaDoc**: Code documentation

### Swagger Setup:
```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("coms.ums.controller"))
            .paths(PathSelectors.any())
            .build();
    }
}
```

---

## Performance Considerations

### Optimization Strategies:
1. Database query optimization
2. Connection pooling
3. Caching (Redis/Caffeine)
4. Lazy loading for relationships
5. Pagination for large datasets
6. Async processing for reports
7. Database indexing

### Monitoring:
- Application metrics
- Database query performance
- API response times
- Error rates
- Resource utilization
