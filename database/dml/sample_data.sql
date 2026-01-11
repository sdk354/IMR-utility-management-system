INSERT INTO [User] (username, passwordHash, email, contactNo, street, streetNo, city, roleID)
VALUES
    ('john_doe', '$2a$12$4LFWUyjNLIM13znJlpk2UepqVhnLSZ1BbmogEfXkBrFBBVQdLW45q', 'john@example.com', '0711234567', 'Main Street', '12A', 'Colombo', 1), -- Password: pass1
    ('alice_smith', '$2a$12$9GU7hkHKlVSWGcTe9VNaoe4yeLligHmbV71pFsTSYLV4FXIAlTapy', 'alice@example.com', '0722345678', 'Park Road', '5', 'Kandy', 1), -- Password: pass2
    ('bob_jones', '$2a$12$BkBik4HT1lvQ6ISSHQ6UaeXWmcDgruTN.olr4H5raXYSrGfsiMeme', 'bob@example.com', '0773456789', 'River Street', '101', 'Galle', 2), -- Password: pass3
    ('carol_lee', '$2a$12$OYL8zY603VACY8w1whm8wO6mP7zvvhs0ozDAMGlfkPzaS0vmtdiW.', 'carol@example.com', '0754567890', 'Hill Road', '22B', 'Negombo', 2), -- Password: pass4
    ('dave_wilson', '$2a$12$Vz5tI4SfDBnCQH5k01lkluYg7NFleN/Cmk21/5IaSoFPxkjYLnVWW', 'dave@example.com', '0765678901', 'Lake Street', '8', 'Matara', 3), -- Password: pass5
    ('eve_martin', '$2a$12$G9Y00Vl33T4avYxnGtrcfewCF4I7ff3D3WCpKZHuTy9RRvOLl.UCC', 'eve@example.com', '0716789012', 'Ocean Road', '15', 'Jaffna', 3), -- Password: pass6
    ('frank_taylor', '$2a$12$6S75kBqssWlJ4Q1pqcAAYutfIhjaqzbzxvalM3JV4XTBuUUnxn6fO', 'frank@example.com', '0727890123', 'Garden Lane', '3', 'Batticaloa', 4), -- Password: pass7
    ('grace_clark', '$2a$12$qlo64pauPYqUmTp3j.U58.Ev3aOh22ZsA1G1MB5cKOXU2OfHmJfZO', 'grace@example.com', '0778901234', 'Forest Street', '7C', 'Trincomalee', 4), -- Password: pass8
    ('henry_moore', '$2a$12$fZFAWFGaumLuMcUVEXAlnOscxhU7fEhezSeJLF8S.m2KUJMjPynae', 'henry@example.com', '0759012345', 'Hilltop Road', '9', 'Ratnapura', 5), -- Password: pass9
    ('iris_wright', '$2a$12$wrvZ71htQyrapGRYgaDs6.W/DW2KOTvpBB/3Nvm.AEZiOBNqYWvCi', 'iris@example.com', '0760123456', 'Sunset Blvd', '11', 'Anuradhapura', 5), -- Password: pass10
    ('dev_account', '$2a$12$D6NjZLUDJoA1.AeWyE7FneWJdXY1WBIVh1nQ65EuDlGD3yiFZfNU6', 'dev@utility.com', '0000000000', 'System Drive', '00', 'Root', 6); -- Password: passdev

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

INSERT INTO Bill_Tariff (billID, tariffID)
VALUES
(1,1),(1,2),(2,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8);


ALTER TABLE [User]
ALTER COLUMN contactNo VARCHAR(15);


ALTER TABLE [User]
ALTER COLUMN streetNo VARCHAR(20);


ALTER TABLE Bill
ADD lateFee DECIMAL(12,2) DEFAULT 0;
