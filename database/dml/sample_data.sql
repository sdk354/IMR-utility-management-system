INSERT INTO Utility_Type (utilityName, unit, description)
VALUES
('Electricity', 'kWh', 'Electricity consumption'),
('Water', 'm3', 'Water consumption'),
('Gas', 'm3', 'Gas consumption'),
('Internet', 'GB', 'Internet usage'),
('Sewage', 'm3', 'Sewage services'),
('Heating', 'kWh', 'Heating services'),
('Cooling', 'kWh', 'Cooling services'),
('Parking', 'Days', 'Parking fees'),
('Trash', 'kg', 'Trash disposal'),
('Maintenance', 'Service', 'Building maintenance');

INSERT INTO Role (roleName, description)
VALUES
('Admin', 'System administrator'),
('Customer', 'Regular customer'),
('MeterReader', 'Records meter readings'),
('Accountant', 'Manages billing'),
('Support', 'Handles complaints'),
('Manager', 'Manages operations'),
('Supervisor', 'Supervises staff'),
('Technician', 'Fixes meters'),
('Auditor', 'Checks records'),
('Guest', 'Temporary user');

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

INSERT INTO Meter (serialNumber, utilityTypeID, customerID, installationDate, status)
VALUES
('ELEC001', 1, 1, '2025-01-01', 'Active'),
('WATR001', 2, 2, '2025-01-02', 'Active'),
('GAS001', 3, 3, '2025-01-03', 'Active'),
('INT001', 4, 4, '2025-01-04', 'Active'),
('SEW001', 5, 5, '2025-01-05', 'Active'),
('HEAT001', 6, 6, '2025-01-06', 'Active'),
('COOL001', 7, 7, '2025-01-07', 'Active'),
('PARK001', 8, 8, '2025-01-08', 'Active'),
('TRASH001', 9, 9, '2025-01-09', 'Active'),
('MAINT001', 10, 10, '2025-01-10', 'Active');

INSERT INTO Tariff (rate, effectiveFrom, effectiveTo, slabFrom, slabTo, fixedCharge, subsidiaryPercentage, utilityTypeID)
VALUES
(15.50, '2025-01-01', '2025-12-31', 0, 30, 50, 5, 1),
(20.00, '2025-01-01', '2025-12-31', 31, 60, 50, 5, 1),
(25.00, '2025-01-01', '2025-12-31', 0, 20, 30, 3, 2),
(30.00, '2025-01-01', '2025-12-31', 21, 50, 30, 3, 2),
(10.00, '2025-01-01', '2025-12-31', 0, 100, 20, 2, 3),
(5.00, '2025-01-01', '2025-12-31', 0, 50, 10, 1, 4),
(7.50, '2025-01-01', '2025-12-31', 51, 100, 10, 1, 4),
(50.00, '2025-01-01', '2025-12-31', 0, 10, 100, 0, 5),
(40.00, '2025-01-01', '2025-12-31', 0, 20, 80, 0, 6),
(60.00, '2025-01-01', '2025-12-31', 0, 15, 120, 0, 7);

INSERT INTO Meter_Reading (readingValue, readingDate, remarks, userID, meterID)
VALUES
(100, '2025-02-01', 'Initial reading', 1, 1),
(150, '2025-02-02', 'Initial reading', 2, 2),
(200, '2025-02-03', 'Initial reading', 3, 3),
(250, '2025-02-04', 'Initial reading', 4, 4),
(300, '2025-02-05', 'Initial reading', 5, 5),
(350, '2025-02-06', 'Initial reading', 6, 6),
(400, '2025-02-07', 'Initial reading', 7, 7),
(450, '2025-02-08', 'Initial reading', 8, 8),
(500, '2025-02-09', 'Initial reading', 9, 9),
(550, '2025-02-10', 'Initial reading', 10, 10);

INSERT INTO Bill (totalAmount, totalConsumption, billingPeriodStart, billingPeriodEnd, dueDate, userID)
VALUES
(500, 32, '2025-02-01', '2025-02-28', '2025-03-10', 1),
(700, 45, '2025-02-01', '2025-02-28', '2025-03-10', 2),
(600, 38, '2025-02-01', '2025-02-28', '2025-03-10', 3),
(800, 50, '2025-02-01', '2025-02-28', '2025-03-10', 4),
(450, 25, '2025-02-01', '2025-02-28', '2025-03-10', 5),
(900, 55, '2025-02-01', '2025-02-28', '2025-03-10', 6),
(750, 48, '2025-02-01', '2025-02-28', '2025-03-10', 7),
(650, 40, '2025-02-01', '2025-02-28', '2025-03-10', 8),
(550, 35, '2025-02-01', '2025-02-28', '2025-03-10', 9),
(1000, 60, '2025-02-01', '2025-02-28', '2025-03-10', 10);

INSERT INTO Bill_Tariff (billID, tariffID)
VALUES
(1,1),(1,2),(2,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8);

INSERT INTO Complaint (userID, meterID, complaintText)
VALUES
(1,1,'Meter not working'),
(2,2,'High bill issue'),
(3,3,'Leakage detected'),
(4,4,'No reading recorded'),
(5,5,'Meter broken'),
(6,6,'Incorrect bill'),
(7,7,'Low voltage'),
(8,8,'Water leakage'),
(9,9,'Gas smell'),
(10,10,'Internet outage');

INSERT INTO Payment (billID, userID, amount, paymentMethod, receiptNo)
VALUES
(1,1,500,'Card','REC001'),
(2,2,700,'Cash','REC002'),
(3,3,600,'Card','REC003'),
(4,4,800,'Bank','REC004'),
(5,5,450,'Cash','REC005'),
(6,6,900,'Card','REC006'),
(7,7,750,'Bank','REC007'),
(8,8,650,'Cash','REC008'),
(9,9,550,'Card','REC009'),
(10,10,1000,'Bank','REC010');

