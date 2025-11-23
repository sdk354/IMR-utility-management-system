# Database Schema Documentation

## Database: utility_management_system

## Core Tables

### 1. Utility_Type
Stores different types of utilities (electricity, water, gas, etc.)

**Columns:**
- `utilityTypeID` (INT, PK, IDENTITY) - Primary key
- `utilityName` (VARCHAR(100), UNIQUE) - Name of utility type
- `unit` (VARCHAR(20)) - Unit of measurement (kWh, m³, etc.)
- `description` (VARCHAR(MAX)) - Description of utility type

**Purpose:** Define available utility services in the system

---

### 2. Role
Defines user roles in the system

**Columns:**
- `roleID` (INT, PK, IDENTITY) - Primary key
- `roleName` (VARCHAR(50), UNIQUE) - Role name (Admin, Customer, etc.)
- `description` (VARCHAR(MAX)) - Role description

**Purpose:** Role-based access control

---

### 3. User
Stores all users (customers, admins, staff)

**Columns:**
- `userID` (INT, PK, IDENTITY) - Primary key
- `username` (VARCHAR(50), UNIQUE) - Login username
- `passwordHash` (VARCHAR(255)) - Hashed password
- `email` (VARCHAR(100), UNIQUE) - Email address
- `contactNo` (VARCHAR(15)) - Contact number
- `street` (VARCHAR(100)) - Street address
- `streetNo` (VARCHAR(20)) - Street number
- `city` (VARCHAR(50)) - City
- `status` (VARCHAR(20), DEFAULT 'Active') - Account status
- `roleID` (INT, FK) - Foreign key to Role table

**Foreign Keys:**
- `roleID` → Role(roleID)

**Purpose:** Central user management for all system users

---

### 4. Meter
Manages utility meters

**Columns:**
- `meterID` (INT, PK, IDENTITY) - Primary key
- `serialNumber` (VARCHAR(100), UNIQUE) - Unique meter serial number
- `utilityTypeID` (INT, FK) - Type of utility measured
- `customerID` (INT, FK, NULL) - Assigned customer
- `installationDate` (DATE) - Date of installation
- `status` (VARCHAR(50), DEFAULT 'Active') - Meter status

**Foreign Keys:**
- `utilityTypeID` → Utility_Type(utilityTypeID)
- `customerID` → User(userID)

**Purpose:** Track physical meters and their assignments

---

### 5. Meter_Reading
Records meter readings over time

**Columns:**
- `readingID` (INT, PK, IDENTITY) - Primary key
- `readingValue` (DECIMAL(18,4)) - Reading value
- `readingDate` (DATETIME2) - Date and time of reading
- `remarks` (VARCHAR(255)) - Additional notes
- `userID` (INT, FK, NULL) - User who entered reading
- `meterID` (INT, FK) - Meter that was read

**Foreign Keys:**
- `userID` → User(userID)
- `meterID` → Meter(meterID)

**Purpose:** Historical tracking of meter readings

**Validation:** Trigger ensures reading values cannot decrease

---

### 6. Tariff
Defines pricing structures for utilities

**Columns:**
- `tariffID` (INT, PK, IDENTITY) - Primary key
- `rate` (DECIMAL(10,4)) - Rate per unit
- `effectiveFrom` (DATE) - Start date of tariff
- `effectiveTo` (DATE) - End date of tariff
- `slabFrom` (DECIMAL(18,4)) - Consumption slab start
- `slabTo` (DECIMAL(18,4)) - Consumption slab end
- `fixedCharge` (DECIMAL(10,2)) - Fixed monthly charge
- `subsidiaryPercentage` (DECIMAL(5,2)) - Subsidy percentage
- `utilityTypeID` (INT, FK) - Utility type

**Foreign Keys:**
- `utilityTypeID` → Utility_Type(utilityTypeID)

**Purpose:** Flexible pricing with slab-based rates and time periods

**Validation:** Trigger prevents overlapping tariff date ranges

---

### 7. Bill
Stores customer bills

**Columns:**
- `billID` (INT, PK, IDENTITY) - Primary key
- `totalAmount` (DECIMAL(12,2)) - Total bill amount
- `totalConsumption` (DECIMAL(18,4)) - Total units consumed
- `billingPeriodStart` (DATE) - Billing period start
- `billingPeriodEnd` (DATE) - Billing period end
- `billDate` (DATE, DEFAULT GETDATE()) - Bill generation date
- `status` (VARCHAR(50), DEFAULT 'Unpaid') - Payment status
- `dueDate` (DATE) - Payment due date
- `lateFee` (DECIMAL(12,2), DEFAULT 0) - Late payment fee
- `userID` (INT, FK) - Customer

**Foreign Keys:**
- `userID` → User(userID)

**Purpose:** Generate and track customer bills

**Automation:** Status automatically updates to 'Paid' via trigger when full payment received

---

### 8. Bill_Tariff
Junction table linking bills to applicable tariffs

**Columns:**
- `billTariffID` (INT, PK, IDENTITY) - Primary key
- `billID` (INT, FK) - Bill reference
- `tariffID` (INT, FK) - Tariff reference

**Foreign Keys:**
- `billID` → Bill(billID)
- `tariffID` → Tariff(tariffID)

**Purpose:** Support multi-tariff billing (e.g., multiple slabs)

**Validation:** Trigger prevents duplicate tariff assignments to same bill

---

### 9. Complaint
Manages customer complaints

**Columns:**
- `complaintID` (INT, PK, IDENTITY) - Primary key
- `userID` (INT, FK) - Customer who filed complaint
- `meterID` (INT, FK, NULL) - Related meter (optional)
- `complaintText` (VARCHAR(MAX)) - Complaint details
- `complaintDate` (DATETIME2, DEFAULT SYSUTCDATETIME()) - Submission date
- `status` (VARCHAR(50), DEFAULT 'Pending') - Complaint status

**Foreign Keys:**
- `userID` → User(userID)
- `meterID` → Meter(meterID)

**Purpose:** Track and manage customer service issues

---

### 10. Payment
Records customer payments

**Columns:**
- `paymentID` (INT, PK, IDENTITY) - Primary key
- `billID` (INT, FK) - Bill being paid
- `userID` (INT, FK, NULL) - User who processed payment
- `amount` (DECIMAL(12,2)) - Payment amount
- `paymentDate` (DATETIME2, DEFAULT SYSUTCDATETIME()) - Payment date
- `paymentMethod` (VARCHAR(50)) - Payment method
- `receiptNo` (VARCHAR(100)) - Receipt number

**Foreign Keys:**
- `billID` → Bill(billID)
- `userID` → User(userID)

**Purpose:** Track payment transactions

---

## Database Views

### 1. get_UserInfo
```sql
File: database/views/views.sql:2-15
```
Returns user information with role names

### 2. get_fulladdress
```sql
File: database/views/views.sql:19-30
```
Concatenates user address components into full address string

### 3. get_Tariffs
```sql
File: database/views/views.sql:34-47
```
Joins tariffs with utility type names

### 4. get_MeterReadings
```sql
File: database/views/views.sql:51-63
```
Shows readings with meter serial and user who entered

### 5. get_Bills
```sql
File: database/views/views.sql:67-80
```
Bill information with customer usernames

### 6. get_BillTariffs
```sql
File: database/views/views.sql:84-104
```
Detailed view of bills with applied tariffs

### 7. get_MonthlyRevenue
```sql
File: database/views/views.sql:107-120
```
Monthly revenue aggregated by utility type

---

## Stored Procedures

### 1. AddUtilityType
```sql
File: database/procedures/Procedure1.sql
```
Parameters: @typeName, @unit, @description
Purpose: Insert new utility type

### 2. AddComplaint
```sql
File: database/procedures/Procedure2.sql
```
Parameters: @userID, @meterID, @complaintText
Purpose: Create new complaint

### 3. UpdatePaymentMethod
```sql
File: database/procedures/Procedure3.sql
```
Parameters: @paymentID, @method
Purpose: Update payment method for existing payment

---

## Database Functions

### 1. TotalPaymentsByUser
```sql
File: database/functions/Function1.sql
```
Returns: DECIMAL(12,2)
Purpose: Calculate total payments made by a user

### 2. GetUtilityTypeName
```sql
File: database/functions/Function2.sql
```
Returns: VARCHAR(100)
Purpose: Get utility type name by ID

### 3. ComplaintCountByMeter
```sql
File: database/functions/Function3.sql
```
Returns: INT
Purpose: Count complaints associated with a meter

---

## Triggers

### 1. Tariff_NoOverlap
```sql
File: database/triggers/triggers.sql:2-24
```
Table: Tariff
Event: AFTER INSERT, UPDATE
Purpose: Prevent overlapping tariff date ranges for same utility type

### 2. MeterReading_Validate
```sql
File: database/triggers/triggers.sql:27-44
```
Table: Meter_Reading
Event: AFTER INSERT
Purpose: Ensure meter readings don't decrease from previous values

### 3. Bill_AutoStatus
```sql
File: database/triggers/triggers.sql:47-63
```
Table: Payment
Event: AFTER INSERT
Purpose: Automatically mark bill as 'Paid' when total payments >= bill amount

### 4. BillTariff_NoDuplicate
```sql
File: database/triggers/triggers.sql:66-81
```
Table: Bill_Tariff
Event: AFTER INSERT
Purpose: Prevent duplicate tariff assignments to same bill

---

## Entity Relationships

### Key Relationships:
1. **User → Role** (Many-to-One): Users have one role
2. **Meter → Utility_Type** (Many-to-One): Each meter measures one utility type
3. **Meter → User** (Many-to-One): Meters assigned to customers
4. **Meter_Reading → Meter** (Many-to-One): Multiple readings per meter
5. **Bill → User** (Many-to-One): Multiple bills per customer
6. **Bill ↔ Tariff** (Many-to-Many via Bill_Tariff): Bills can have multiple tariffs
7. **Payment → Bill** (Many-to-One): Multiple partial payments per bill
8. **Complaint → User** (Many-to-One): Multiple complaints per customer
9. **Complaint → Meter** (Many-to-One): Complaints may reference meters

## Data Integrity Features

1. **Unique Constraints**: Username, email, meter serial numbers
2. **Foreign Key Constraints**: Referential integrity across tables
3. **Default Values**: Timestamps, status fields
4. **Triggers**: Business rule enforcement
5. **Check Constraints**: (Can be added for value ranges)
