INSERT INTO Utility_Type (TypeName, Description)
VALUES
('Electricity', 'Electricity utility service'),
('Water', 'Water supply service'),
('Gas', 'Gas utility service');

INSERT INTO [Role] (RoleName, Description)
VALUES
('Admin', 'System administrator'),
('Technician', 'Handles meter servicing'),
('Customer', 'Regular system user');

INSERT INTO Meter (SerialNumber, UtilityTypeID, InstallationDate, Status)
VALUES
('MTR-1001', 1, '2023-05-10', 'Active'),
('MTR-1002', 2, '2023-06-15', 'Active'),
('MTR-1003', 3, '2023-07-01', 'Inactive');

INSERT INTO Complaint (MeterID, ComplaintText, ComplaintDate, Status)
VALUES
(1, 'Meter not recording usage correctly', DEFAULT, 'Pending'),
(2, 'Water leakage near meter', DEFAULT, 'Pending'),
(3, 'Burnt smell coming from meter box', DEFAULT, 'Pending');

INSERT INTO Payment (MeterID, Amount, PaymentDate, Method, ReferenceNo)
VALUES
(1, 4500.00, DEFAULT, 'Card', 'PAY-001'),
(2, 3200.50, DEFAULT, 'Cash', 'PAY-002'),
(3, 5000.75, DEFAULT, 'Online', 'PAY-003');
