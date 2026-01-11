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


INSERT INTO Payment (billID, userID, amount, paymentDate, paymentMethod, receiptNo)
VALUES
    -- Henry Moore's Payments (3 Paid, 2 Unpaid)
    (1, 9, 500.00, '2025-11-05', 'Card', 'REC-001'),
    (2, 9, 450.00, '2025-12-05', 'Cash', 'REC-002'),
    (4, 9, 120.00, '2025-11-05', 'Online', 'REC-005'),
    (6, 10, 600.00, '2025-11-06', 'Online', 'REC-003'),
    (7, 10, 550.00, '2025-12-06', 'Card', 'REC-004');
