INSERT INTO Utility_Type (utilityName, description)
VALUES
    ('Electricity', 'Electricity utility service'),
    ('Water', 'Water supply service'),
    ('Gas', 'Gas utility service');

INSERT INTO Role (roleName, description)
VALUES
    ('Administrative Staff', 'Management of customers and complaints.'),
    ('Field Officer', 'Meter reading entry.'),
    ('Billing Clerk', 'Bill and payment processing.'),
    ('Manager', 'Reporting and analytics.'),
    ('Customer', 'End user dashboard access.'),
    ('Developer', 'System super-user.');

INSERT INTO [User] (username, passwordHash, email, contactNo, street, streetNo, city, roleID)
VALUES
    ('john_doe', '$2a$12$4LFWUyjNLIM13znJlpk2UepqVhnLSZ1BbmogEfXkBrFBBVQdLW45q', 'john@example.com', '0711234567', 'Main Street', '12A', 'Colombo', 1),
    ('alice_smith', '$2a$12$9GU7hkHKlVSWGcTe9VNaoe4yeLligHmbV71pFsTSYLV4FXIAlTapy', 'alice@example.com', '0722345678', 'Park Road', '5', 'Kandy', 1),
    ('bob_jones', '$2a$12$BkBik4HT1lvQ6ISSHQ6UaeXWmcDgruTN.olr4H5raXYSrGfsiMeme', 'bob@example.com', '0773456789', 'River Street', '101', 'Galle', 2),
    ('carol_lee', '$2a$12$OYL8zY603VACY8w1whm8wO6mP7zvvhs0ozDAMGlfkPzaS0vmtdiW.', 'carol@example.com', '0754567890', 'Hill Road', '22B', 'Negombo', 2),
    ('dave_wilson', '$2a$12$Vz5tI4SfDBnCQH5k01lkluYg7NFleN/Cmk21/5IaSoFPxkjYLnVWW', 'dave@example.com', '0765678901', 'Lake Street', '8', 'Matara', 3),
    ('eve_martin', '$2a$12$G9Y00Vl33T4avYxnGtrcfewCF4I7ff3D3WCpKZHuTy9RRvOLl.UCC', 'eve@example.com', '0716789012', 'Ocean Road', '15', 'Jaffna', 3),
    ('frank_taylor', '$2a$12$6S75kBqssWlJ4Q1pqcAAYutfIhjaqzbzxvalM3JV4XTBuUUnxn6fO', 'frank@example.com', '0727890123', 'Garden Lane', '3', 'Batticaloa', 4),
    ('grace_clark', '$2a$12$qlo64pauPYqUmTp3j.U58.Ev3aOh22ZsA1G1MB5cKOXU2OfHmJfZO', 'grace@example.com', '0778901234', 'Forest Street', '7C', 'Trincomalee', 4),
    ('henry_moore', '$2a$12$fZFAWFGaumLuMcUVEXAlnOscxhU7fEhezSeJLF8S.m2KUJMjPynae', 'henry@example.com', '0759012345', 'Hilltop Road', '9', 'Ratnapura', 5),
    ('iris_wright', '$2a$12$wrvZ71htQyrapGRYgaDs6.W/DW2KOTvpBB/3Nvm.AEZiOBNqYWvCi', 'iris@example.com', '0760123456', 'Sunset Blvd', '11', 'Anuradhapura', 5),
    ('dev_account', '$2a$12$D6NjZLUDJoA1.AeWyE7FneWJdXY1WBIVh1nQ65EuDlGD3yiFZfNU6', 'dev@utility.com', '0000000000', 'System Drive', '00', 'Root', 6);

INSERT INTO Meter (serialNumber, utilityTypeID, installationDate, status, userID)
VALUES
    ('E-HEN-101', 1, '2024-01-01', 'Live', 9),
    ('W-HEN-102', 2, '2024-01-01', 'Live', 9),
    ('G-HEN-103', 3, '2024-01-01', 'Under Repair', 9),
    ('E-IRI-201', 1, '2024-02-01', 'Live', 10),
    ('W-IRI-202', 2, '2024-02-01', 'Suspended', 10),
    ('G-IRI-203', 3, '2024-02-01', 'Suspended', 10),
    ('MTR-EXT-1', 1, '2023-05-10', 'Live', NULL),
    ('MTR-EXT-2', 2, '2023-06-15', 'Live', NULL),
    ('MTR-EXT-3', 3, '2023-07-01', 'Suspended', NULL),
    ('MTR-EXT-4', 1, '2023-08-01', 'Under Repair', NULL);

INSERT INTO Tariff (rate, effectiveFrom, effectiveTo, slabFrom, slabTo, fixedCharge, subsidiaryPercentage, utilityTypeID)
VALUES
    (15.0, '2025-01-01', '2025-12-31', 0, 30, 50, 5, 1),
    (20.0, '2025-01-01', '2025-12-31', 31, 60, 50, 5, 1),
    (30.0, '2025-01-01', '2025-12-31', 61, 999, 100, 0, 1),
    (25.0, '2025-01-01', '2025-12-31', 0, 20, 30, 3, 2),
    (35.0, '2025-01-01', '2025-12-31', 21, 50, 30, 3, 2),
    (10.0, '2025-01-01', '2025-12-31', 0, 100, 20, 2, 3),
    (12.0, '2026-01-01', '2026-12-31', 0, 100, 25, 2, 3),
    (18.0, '2026-01-01', '2026-12-31', 0, 30, 55, 5, 1),
    (28.0, '2026-01-01', '2026-12-31', 0, 20, 35, 3, 2),
    (15.0, '2024-01-01', '2024-12-31', 0, 30, 45, 5, 1);

INSERT INTO Bill (totalAmount, totalConsumption, billingPeriodStart, billingPeriodEnd, dueDate, userID)
VALUES
    (500.00, 32, '2025-10-01', '2025-10-31', '2025-11-10', 9),
    (450.00, 28, '2025-11-01', '2025-11-30', '2025-12-10', 9),
    (520.00, 34, '2025-12-01', '2025-12-31', '2026-01-10', 9),
    (120.00, 10, '2025-10-01', '2025-10-31', '2025-11-10', 9),
    (150.00, 12, '2025-11-01', '2025-11-30', '2025-12-10', 9),
    (600.00, 40, '2025-10-01', '2025-10-31', '2025-11-10', 10),
    (550.00, 35, '2025-11-01', '2025-11-30', '2025-12-10', 10),
    (580.00, 38, '2025-12-01', '2025-12-31', '2026-01-10', 10),
    (200.00, 15, '2025-10-01', '2025-10-31', '2025-11-10', 10),
    (210.00, 16, '2025-11-01', '2025-11-30', '2025-12-10', 10);

INSERT INTO Complaint (userID, meterID, complaintText, complaintDate, status)
VALUES
    (9, 1, '[Electricity] High bill concern', '2025-11-21', 'Pending'),
    (10, 5, '[Water] Low pressure', '2024-01-21', 'Pending'),
    (1, 7, '[General] System login issue', '2024-08-23', 'Resolved'),
    (9, 2, '[Water] Meter lid broken', '2025-09-13', 'Pending'),
    (10, 4, '[Electricity] Power fluctuations', '2025-01-11', 'Pending'),
    (3, 1, '[Staff Report] Meter tampering suspected', '2025-01-02', 'Resolved'),
    (9, 3, '[Gas] Smell of gas near valve', '2024-04-22', 'Resolved'),
    (10, 6, '[Gas] Monthly reading not updated', '2025-01-11', 'Pending'),
    (2, 8, '[Maintenance] Area-wide outage', '2026-01-03', 'Resolved'),
    (9, 1, '[Support] Request for historical data', '2025-10-10', 'Pending');

INSERT INTO Meter_Reading (readingValue, readingDate, remarks, userID, meterID)
VALUES
    (1032, '2025-10-31', 'Oct Electricity Reading', 9, 1),
    (1060, '2025-11-30', 'Nov Electricity Reading', 9, 1),
    (1094, '2025-12-31', 'Dec Electricity Reading', 9, 1),
    (510,  '2025-10-31', 'Oct Water Reading', 9, 2),
    (522,  '2025-11-30', 'Nov Water Reading', 9, 2),
    (2040, '2025-10-31', 'Oct Electricity Reading', 10, 4),
    (2075, '2025-11-30', 'Nov Electricity Reading', 10, 4),
    (2113, '2025-12-31', 'Dec Electricity Reading', 10, 4),
    (815,  '2025-10-31', 'Oct Gas Reading', 10, 6),
    (831,  '2025-11-30', 'Nov Gas Reading', 10, 6);

INSERT INTO Payment (billID, userID, amount, paymentDate, paymentMethod, receiptNo)
VALUES
    (1, 9, 500.00, '2025-11-05', 'Card', 'REC-001'),
    (2, 9, 450.00, '2025-12-05', 'Cash', 'REC-002'),
    (4, 9, 120.00, '2025-11-05', 'Online', 'REC-005'),
    (6, 10, 600.00, '2025-11-06', 'Online', 'REC-003'),
    (7, 10, 550.00, '2025-12-06', 'Card', 'REC-004');