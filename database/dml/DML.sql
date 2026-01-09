INSERT INTO Utility_Type (utilityName, description)
VALUES
    ('Electricity', 'Electricity utility service'),
    ('Water', 'Water supply service'),
    ('Gas', 'Gas utility service');

INSERT INTO Role (roleName, description)
VALUES
    ('Admin', 'System administrator'),
    ('Technician', 'Handles meter servicing'),
    ('Customer', 'Regular system user');

INSERT INTO [User] (username, passwordHash, email, contactNo, street, streetNo, city, roleID)
VALUES
    ('john_doe', 'hash1', 'john@example.com', '0711234567', 'Main Street', '12A', 'Colombo', 2),
    ('alice_smith', 'hash2', 'alice@example.com', '0722345678', 'Park Road', '5', 'Kandy', 2),
    ('bob_jones', 'hash3', 'bob@example.com', '0773456789', 'River Street', '101', 'Galle', 2),
    ('carol_lee', 'hash4', 'carol@example.com', '0754567890', 'Hill Road', '22B', 'Negombo', 2),
    ('dave_wilson', 'hash5', 'dave@example.com', '0765678901', 'Lake Street', '8', 'Matara', 2),
    ('eve_martin', 'hash6', 'eve@example.com', '0716789012', 'Ocean Road', '15', 'Jaffna', 2),
    ('frank_taylor', 'hash7', 'frank@example.com', '0727890123', 'Garden Lane', '3', 'Batticaloa', 2),
    ('grace_clark', 'hash8', 'grace@example.com', '0778901234', 'Forest Street', '7C', 'Trincomalee', 2),
    ('henry_moore', 'hash9', 'henry@example.com', '0759012345', 'Hilltop Road', '9', 'Ratnapura', 2),
    ('iris_wright', 'hash10', 'iris@example.com', '0760123456', 'Sunset Blvd', '11', 'Anuradhapura', 2);

INSERT INTO Meter (serialNumber, utilityTypeID, installationDate, status)
VALUES
    ('MTR-1001', 1, '2023-05-10', 'Active'),
    ('MTR-1002', 2, '2023-06-15', 'Active'),
    ('MTR-1003', 3, '2023-07-01', 'Inactive');

INSERT INTO Complaint (userID, meterID, complaintText, complaintDate, status)
VALUES
    (1, 1, 'Meter not recording usage correctly', DEFAULT, 'Pending'),
    (2, 2, 'Water leakage near meter', DEFAULT, 'Pending'),
    (3, 3, 'Burnt smell coming from meter box', DEFAULT, 'Pending');

INSERT INTO Tariff (rate, effectiveFrom, effectiveTo, slabFrom, slabTo, fixedCharge, subsidiaryPercentage, utilityTypeID)
VALUES
    (15.50, '2025-01-01', '2025-12-31', 0, 30, 50, 5, 1),
    (20.00, '2025-01-01', '2025-12-31', 31, 60, 50, 5, 1),
    (25.00, '2025-01-01', '2025-12-31', 0, 20, 30, 3, 2),
    (30.00, '2025-01-01', '2025-12-31', 21, 50, 30, 3, 2),
    (10.00, '2025-01-01', '2025-12-31', 0, 100, 20, 2, 3);

INSERT INTO Meter_Reading (readingValue, readingDate, remarks, userID, meterID)
VALUES
    (100, '2025-02-01', 'Initial reading', 1, 1),
    (150, '2025-02-02', 'Initial reading', 2, 2),
    (200, '2025-02-03', 'Initial reading', 3, 3);

INSERT INTO Bill (totalAmount, totalConsumption, billingPeriodStart, billingPeriodEnd, dueDate, userID)
VALUES
    (500, 32, '2025-02-01', '2025-02-28', '2025-03-10', 1),
    (700, 45, '2025-02-01', '2025-02-28', '2025-03-10', 2),
    (600, 38, '2025-02-01', '2025-02-28', '2025-03-10', 3);

INSERT INTO Bill_Tariff (billID, tariffID)
VALUES
    (1,1),(1,2),(2,1),(2,2),(3,3);

INSERT INTO Payment (billID, userID, amount, paymentDate, paymentMethod, receiptNo)
VALUES
    (1, 1, 4500.00, DEFAULT, 'Card', 'PAY-001'),
    (2, 2, 3200.50, DEFAULT, 'Cash', 'PAY-002'),
    (3, 3, 5000.75, DEFAULT, 'Online', 'PAY-003');
