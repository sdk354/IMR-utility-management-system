
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


ALTER TABLE [User]
ALTER COLUMN contactNo VARCHAR(15);


ALTER TABLE [User]
ALTER COLUMN streetNo VARCHAR(20);


ALTER TABLE Bill
ADD lateFee DECIMAL(12,2) DEFAULT 0;
