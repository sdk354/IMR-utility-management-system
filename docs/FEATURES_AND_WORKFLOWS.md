# Features and Workflows Documentation

## System Features Overview

This document describes the major features of the IMR Utility Management System and how they work together.

---

## 1. User Management

### Feature Description
Manage all system users including customers, administrators, and staff members with role-based access control.

### Actors
- System Administrator
- Customers

### Database Components
- **Tables**: User, Role
- **Views**: get_UserInfo, get_fulladdress
- **Functions**: None specific

### Frontend Components
- **Admin Portal**: Customers page, AddEditCustomer page
- **Customer Portal**: Profile page, CustomerLogin page

### Workflows

#### 1.1 Customer Registration
**Steps**:
1. Admin navigates to `/admin/customers/add`
2. Admin fills customer form:
   - Username (unique)
   - Email (unique)
   - Contact number
   - Address (street, street number, city)
   - Assigns "Customer" role
3. System validates uniqueness of username and email
4. Admin submits form
5. Backend creates User record with hashed password
6. System generates welcome email/notification
7. Customer can now log in

**Database Operations**:
```sql
INSERT INTO User (username, passwordHash, email, contactNo, street, streetNo, city, roleID)
VALUES (@username, @hashedPassword, @email, @contactNo, @street, @streetNo, @city, @customerRoleID)
```

#### 1.2 Customer Login
**Steps**:
1. Customer navigates to `/customer/login`
2. Enters username and password
3. System validates credentials
4. Backend generates JWT token
5. Customer redirected to dashboard
6. Token stored for subsequent requests

---

## 2. Meter Management

### Feature Description
Register, track, and manage utility meters including installation, customer assignment, and status monitoring.

### Actors
- System Administrator
- Field Technicians

### Database Components
- **Tables**: Meter, Utility_Type
- **Views**: None specific
- **Functions**: GetUtilityTypeName, ComplaintCountByMeter

### Frontend Components
- **Admin Portal**: Meters page, RegisterMeter page

### Workflows

#### 2.1 Meter Registration
**Steps**:
1. Admin navigates to `/admin/meters/register`
2. Admin enters meter details:
   - Serial number (unique)
   - Utility type (electricity, water, gas)
   - Installation date
   - Initial status (Active)
3. System validates serial number uniqueness
4. Admin submits form
5. Meter created without customer assignment (NULL customerID)
6. Meter available for assignment

**Database Operations**:
```sql
INSERT INTO Meter (serialNumber, utilityTypeID, installationDate, status)
VALUES (@serialNumber, @utilityTypeID, @installationDate, 'Active')
```

#### 2.2 Meter Assignment to Customer
**Steps**:
1. Admin views meter list at `/admin/meters`
2. Selects unassigned meter
3. Chooses customer from dropdown
4. System updates meter record with customerID
5. Customer can now see meter in their account

**Database Operations**:
```sql
UPDATE Meter
SET customerID = @customerID
WHERE meterID = @meterID AND customerID IS NULL
```

---

## 3. Meter Reading Management

### Feature Description
Record and track meter readings over time, ensuring data integrity and supporting consumption calculations.

### Actors
- Field Technicians
- Customers (self-reading)
- Automated Meter Reading (AMR) systems

### Database Components
- **Tables**: Meter_Reading, Meter
- **Views**: get_MeterReadings
- **Triggers**: MeterReading_Validate (prevents decreasing values)

### Frontend Components
- **Admin Portal**: AddMeterReading page
- **Customer Portal**: Dashboard (submit reading option)

### Workflows

#### 3.1 Record Meter Reading
**Steps**:
1. Technician navigates to `/admin/meters/newreading`
2. Selects meter by serial number or customer
3. Enters reading value
4. Enters reading date/time
5. Adds optional remarks
6. Submits form
7. **Trigger validates** reading is not less than previous reading
8. If valid, reading recorded
9. If invalid, transaction rolled back with error

**Database Operations**:
```sql
-- Reading insertion
INSERT INTO Meter_Reading (readingValue, readingDate, remarks, userID, meterID)
VALUES (@readingValue, @readingDate, @remarks, @technicianID, @meterID)

-- Trigger validation happens automatically
-- Prevents: readingValue < previous readings for same meter
```

**Validation Rules**:
- Reading value must be >= all previous readings for the meter
- Reading date cannot be in the future
- Meter must be active

#### 3.2 Calculate Consumption
**Steps**:
1. System retrieves latest two readings for meter
2. Calculates difference: `currentReading - previousReading`
3. Determines billing period from reading dates
4. Returns consumption value for billing

---

## 4. Tariff Management

### Feature Description
Define and manage pricing structures with support for slab-based rates, time periods, fixed charges, and subsidies.

### Actors
- System Administrator
- Financial Manager

### Database Components
- **Tables**: Tariff, Utility_Type
- **Views**: get_Tariffs
- **Triggers**: Tariff_NoOverlap (prevents date overlaps)

### Frontend Components
- **Admin Portal**: Tariffs page, AddTariff page

### Workflows

#### 4.1 Create New Tariff
**Steps**:
1. Admin navigates to `/admin/tariffs/add`
2. Selects utility type
3. Defines tariff parameters:
   - Rate per unit
   - Effective from date
   - Effective to date
   - Consumption slab range (from-to)
   - Fixed monthly charge
   - Subsidiary percentage
4. Submits form
5. **Trigger validates** no overlapping date ranges for same utility type
6. If valid, tariff created
7. If invalid, error returned

**Database Operations**:
```sql
INSERT INTO Tariff (rate, effectiveFrom, effectiveTo, slabFrom, slabTo,
                    fixedCharge, subsidiaryPercentage, utilityTypeID)
VALUES (@rate, @effectiveFrom, @effectiveTo, @slabFrom, @slabTo,
        @fixedCharge, @subsidiaryPercentage, @utilityTypeID)
```

**Validation Rules** (via Trigger):
- Date ranges cannot overlap for same utility type
- effectiveFrom < effectiveTo
- slabFrom < slabTo

#### 4.2 Tariff Application Example
**Scenario**: Electricity tariff with slabs

| Slab | Consumption Range | Rate | Fixed Charge |
|------|------------------|------|--------------|
| 1 | 0-100 kWh | Rs. 5.00/kWh | Rs. 100 |
| 2 | 101-200 kWh | Rs. 7.50/kWh | Rs. 100 |
| 3 | 201+ kWh | Rs. 10.00/kWh | Rs. 100 |

**Calculation for 250 kWh**:
- First 100 kWh: 100 × 5.00 = Rs. 500
- Next 100 kWh: 100 × 7.50 = Rs. 750
- Remaining 50 kWh: 50 × 10.00 = Rs. 500
- Fixed charge: Rs. 100
- **Total**: Rs. 1,850

---

## 5. Billing Operations

### Feature Description
Generate bills based on consumption, apply appropriate tariffs, and manage billing cycles.

### Actors
- System Administrator
- Billing Department

### Database Components
- **Tables**: Bill, Bill_Tariff, Meter_Reading, Tariff
- **Views**: get_Bills, get_BillTariffs, get_MonthlyRevenue
- **Triggers**: BillTariff_NoDuplicate

### Frontend Components
- **Admin Portal**: Billing page, AddEditBill page
- **Customer Portal**: Dashboard bills section, BillsList, BillDetails pages

### Workflows

#### 5.1 Generate Monthly Bill
**Steps**:
1. Admin navigates to `/admin/billing/add`
2. Selects customer
3. Defines billing period (start and end dates)
4. System automatically:
   - Retrieves meter readings for period
   - Calculates consumption
   - Determines applicable tariffs for the period
   - Applies tariff slabs
   - Calculates total amount
   - Adds fixed charges
   - Applies subsidies if applicable
5. Admin reviews calculated bill
6. Admin submits to create bill
7. Bill created with status "Unpaid"
8. Bill-Tariff associations created
9. Customer notified

**Database Operations**:
```sql
-- Create bill
INSERT INTO Bill (totalAmount, totalConsumption, billingPeriodStart,
                  billingPeriodEnd, billDate, status, dueDate, userID)
VALUES (@totalAmount, @totalConsumption, @periodStart, @periodEnd,
        GETDATE(), 'Unpaid', @dueDate, @userID)

-- Link applicable tariffs
INSERT INTO Bill_Tariff (billID, tariffID)
VALUES (@billID, @tariffID)
```

**Business Logic**:
1. Find readings at start and end of billing period
2. Calculate consumption = endReading - startReading
3. Find active tariffs for the billing period
4. Apply slab-based calculation
5. Add fixed charges
6. Apply subsidies
7. Set due date (e.g., 15 days from bill date)

#### 5.2 View Bill Details (Customer)
**Steps**:
1. Customer logs in and goes to dashboard
2. Clicks "My Bills" in sidebar
3. Views list of bills with status
4. Clicks specific bill
5. System displays:
   - Billing period
   - Consumption details
   - Tariff breakdown by slab
   - Fixed charges
   - Subsidies applied
   - Total amount
   - Due date
   - Payment status

---

## 6. Payment Processing

### Feature Description
Record payments, support multiple payment methods, generate receipts, and automatically update bill status.

### Actors
- Customers
- Payment Officers
- System (automated processing)

### Database Components
- **Tables**: Payment, Bill
- **Views**: None specific
- **Triggers**: Bill_AutoStatus (auto-update bill status)
- **Functions**: TotalPaymentsByUser

### Frontend Components
- **Admin Portal**: Payments page, RecordPayment page, PastPayments page
- **Customer Portal**: CustomerPayments page

### Workflows

#### 6.1 Record Payment (Admin)
**Steps**:
1. Payment officer navigates to `/admin/payments/recordpayment`
2. Searches and selects bill (by bill ID or customer)
3. System displays bill details and outstanding amount
4. Officer enters:
   - Payment amount (can be partial)
   - Payment date
   - Payment method (Cash, Card, Online, Bank Transfer)
   - Receipt number (auto-generated or manual)
5. Officer submits payment
6. Payment recorded
7. **Trigger automatically checks** if total payments >= bill amount
8. If fully paid, bill status updated to "Paid"
9. Receipt generated and printed

**Database Operations**:
```sql
-- Record payment
INSERT INTO Payment (billID, userID, amount, paymentDate, paymentMethod, receiptNo)
VALUES (@billID, @staffID, @amount, @paymentDate, @method, @receiptNo)

-- Trigger Bill_AutoStatus automatically runs:
UPDATE Bill
SET status = 'Paid'
WHERE billID = @billID
  AND totalAmount <= (SELECT SUM(amount) FROM Payment WHERE billID = @billID)
```

**Payment Scenarios**:
- **Full Payment**: Bill marked as "Paid" immediately
- **Partial Payment**: Bill remains "Unpaid", shows partial payment
- **Overpayment**: Recorded, credit balance handled
- **Multiple Payments**: All payments tracked, sum compared to bill amount

#### 6.2 Online Payment (Customer)
**Steps**:
1. Customer navigates to `/customer/payment` in dashboard
2. Enters account number
3. System retrieves unpaid bills
4. Customer enters payment amount
5. Selects payment method (Credit Card, Debit Card, Online Banking)
6. Clicks "Pay Now"
7. Redirected to payment gateway
8. Payment processed
9. On success, payment recorded via API
10. Trigger updates bill status
11. Customer receives confirmation and receipt

---

## 7. Complaint Management

### Feature Description
Allow customers to submit complaints, track their status, and enable staff to manage and resolve issues.

### Actors
- Customers
- Support Staff
- System Administrators

### Database Components
- **Tables**: Complaint, User, Meter
- **Views**: None specific
- **Procedures**: AddComplaint
- **Functions**: ComplaintCountByMeter

### Frontend Components
- **Admin Portal**: Complaints page
- **Customer Portal**: CustomerComplaints page (Dashboard)

### Workflows

#### 7.1 Submit Complaint (Customer)
**Steps**:
1. Customer navigates to "Complaints" in dashboard
2. Fills complaint form:
   - Issue type (Billing Issue, Meter Reading, General Inquiry)
   - Subject line
   - Detailed description
3. System automatically captures:
   - Customer ID
   - Related meter ID (if applicable)
   - Complaint date/time
4. Customer submits
5. **Stored procedure** `AddComplaint` creates record
6. Complaint status set to "Pending"
7. Complaint appears in customer's ticket list
8. Admin notified

**Database Operations**:
```sql
-- Via stored procedure
EXEC AddComplaint @userID = @customerID,
                  @meterID = @meterID,
                  @complaintText = @description
```

#### 7.2 Handle Complaint (Admin)
**Steps**:
1. Staff navigates to `/admin/complaints`
2. Views pending complaints queue
3. Selects complaint to handle
4. Views complaint details:
   - Customer information
   - Complaint text
   - Related meter (if any)
   - Submission date
5. Assigns complaint to staff member (optional)
6. Updates status: "Pending" → "In Progress" → "Resolved"
7. Adds resolution notes
8. Saves updates
9. Customer notified of resolution

**Database Operations**:
```sql
UPDATE Complaint
SET status = @newStatus
WHERE complaintID = @complaintID
```

---

## 8. Reporting and Analytics

### Feature Description
Generate comprehensive reports on revenue, consumption, payments, and system performance.

### Actors
- System Administrators
- Financial Managers
- Business Analysts

### Database Components
- **Tables**: All tables
- **Views**: get_MonthlyRevenue, get_Bills, get_BillTariffs
- **Functions**: TotalPaymentsByUser

### Frontend Components
- **Admin Portal**: Reports page, Dashboard analytics

### Workflows

#### 8.1 Generate Monthly Revenue Report
**Steps**:
1. Manager navigates to `/admin/reports`
2. Selects "Monthly Revenue Report"
3. Chooses year and month
4. System queries `get_MonthlyRevenue` view
5. Report displays:
   - Revenue by utility type
   - Month-over-month comparison
   - Year-to-date totals
   - Charts and visualizations
6. Manager exports to PDF/Excel

**Database Query**:
```sql
SELECT * FROM get_MonthlyRevenue
WHERE BillYear = @year AND BillMonth = @month
```

#### 8.2 Consumption Analytics
**Steps**:
1. Analyst selects customer or region
2. Defines date range
3. System aggregates meter readings
4. Displays:
   - Average consumption
   - Peak consumption periods
   - Trends and patterns
   - Comparison charts
5. Export data for further analysis

---

## 9. Dashboard Analytics

### Feature Description
Real-time system overview with key metrics and quick actions.

### Actors
- System Administrators
- Customers

### Frontend Components
- **Admin Portal**: Dashboard page (frontend/frontend-admin-draft/src/Pages/Admin/Dashboard.jsx:3-127)
- **Customer Portal**: Dashboard page (src/pages/Dashboard.js:9-185)

### Features

#### 9.1 Admin Dashboard
**Metrics Displayed**:
- Total Customers: 24,567 (↑ 12% from last month)
- Active Meters: 31,245 (↑ 8% from last month)
- Outstanding Balance: Rs. 120M (↓ 5% from last month)
- Today's Collections: Rs. 4,589,000 (↑ 23% from yesterday)

**Alert Types**:
- High consumption warnings
- Overdue payment notifications
- Pending meter readings
- System issues

**Quick Actions**:
- Add customer, register meter, record payment
- Add tariff, view complaints, generate reports

#### 9.2 Customer Dashboard
**Metrics Displayed**:
- Current month usage (kWh)
- Last bill amount and due date
- Average daily usage
- Account status

**Features**:
- Monthly consumption trend chart
- Quick access to bills, payments, complaints
- Profile management

---

## 10. Data Integrity and Validation

### Feature Description
Automated data validation and business rule enforcement through database triggers.

### Database Triggers

#### 10.1 Tariff Date Overlap Prevention
**Trigger**: `Tariff_NoOverlap`
**Purpose**: Prevent overlapping tariff periods for same utility type
**When**: AFTER INSERT, UPDATE on Tariff table
**Action**: Rollback transaction if overlap detected

#### 10.2 Meter Reading Validation
**Trigger**: `MeterReading_Validate`
**Purpose**: Ensure readings don't decrease
**When**: AFTER INSERT on Meter_Reading table
**Action**: Rollback if new reading < previous reading

#### 10.3 Bill Auto-Payment Status
**Trigger**: `Bill_AutoStatus`
**Purpose**: Auto-update bill status when fully paid
**When**: AFTER INSERT on Payment table
**Action**: Update Bill.status to 'Paid' if total payments >= bill amount

#### 10.4 Duplicate Tariff Prevention
**Trigger**: `BillTariff_NoDuplicate`
**Purpose**: Prevent assigning same tariff twice to one bill
**When**: AFTER INSERT on Bill_Tariff table
**Action**: Rollback if duplicate detected

---

## Integration Points

### Frontend to Backend
- Customer Portal → REST API → Database
- Admin Portal → REST API → Database
- Authentication: JWT tokens
- Data format: JSON

### Backend to Database
- JPA/Hibernate ORM
- Stored procedures for complex operations
- Views for simplified queries
- Functions for calculations
- Triggers for validation

### External Integrations (Planned)
- Payment gateways
- SMS notification service
- Email service
- AMR (Automated Meter Reading) systems
- Government reporting systems

---

## Security Workflows

### Authentication Flow
1. User submits credentials
2. Backend validates against User table
3. Password hash compared
4. JWT token generated with role information
5. Token returned to frontend
6. Subsequent requests include token
7. Backend validates token and permissions

### Authorization Flow
1. Request received with JWT token
2. Token decoded to extract user role
3. Role-based access control applied
4. Endpoint permissions checked
5. If authorized, process request
6. If not, return 403 Forbidden

### Data Protection
- Passwords stored as hashes only
- Sensitive data encrypted at rest
- HTTPS for all communications
- SQL injection prevention via parameterized queries
- Input validation on all forms
