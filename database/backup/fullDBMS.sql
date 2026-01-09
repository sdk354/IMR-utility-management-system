CREATE DATABASE UtilityDB;

CREATE TABLE [User] (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,         
    email VARCHAR(100) UNIQUE,
    contactNo VARCHAR(20),
    street VARCHAR(100),
    streetNo VARCHAR(10),
    city VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    roleID INT NOT NULL,
    CONSTRAINT FK_User_Role FOREIGN KEY (roleID) REFERENCES Role(roleID)
);

CREATE TABLE Tariff (
    tariffID INT IDENTITY(1,1) PRIMARY KEY,
    rate DECIMAL(10,4),
    effectiveFrom DATE,
    effectiveTo DATE,
    slabFrom DECIMAL(18,4),
    slabTo DECIMAL(18,4),
    fixedCharge DECIMAL(10,2),
    subsidiaryPercentage DECIMAL(5,2),
    utilityTypeID INT NOT NULL,
    CONSTRAINT FK_Tariff_UtilityType FOREIGN KEY (utilityTypeID) REFERENCES Utility_Type(utilityTypeID)
);

CREATE TABLE Meter_Reading (
    readingID INT IDENTITY(1,1) PRIMARY KEY,
    readingValue DECIMAL(18,4) NOT NULL,
    readingDate DATETIME2 NOT NULL,
    remarks VARCHAR(255),
    userID INT NULL,         
    meterID INT NOT NULL,
    CONSTRAINT FK_Reading_User FOREIGN KEY (userID) REFERENCES [User](userID),
    CONSTRAINT FK_Reading_Meter FOREIGN KEY (meterID) REFERENCES Meter(meterID)
);

CREATE TABLE Bill (
    billID INT IDENTITY(1,1) PRIMARY KEY,
    totalAmount DECIMAL(12,2) NOT NULL,
    totalConsumption DECIMAL(18,4),
    billingPeriodStart DATE,
    billingPeriodEnd DATE,
    billDate DATE DEFAULT CAST(GETDATE() AS DATE),
    status VARCHAR(50) DEFAULT 'Unpaid',
    dueDate DATE,
    userID INT NOT NULL,     
    CONSTRAINT FK_Bill_User FOREIGN KEY (userID) REFERENCES [User](userID)
);

CREATE TABLE Bill_Tariff (
    billTariffID INT IDENTITY(1,1) PRIMARY KEY,
    billID INT NOT NULL,
    tariffID INT NOT NULL,
    CONSTRAINT FK_BillTariff_Bill FOREIGN KEY (billID) REFERENCES Bill(billID),
    CONSTRAINT FK_BillTariff_Tariff FOREIGN KEY (tariffID) REFERENCES Tariff(tariffID)
);


ALTER TABLE [User]
ALTER COLUMN contactNo VARCHAR(15);


ALTER TABLE [User]
ALTER COLUMN streetNo VARCHAR(20);


ALTER TABLE Bill
ADD lateFee DECIMAL(12,2) DEFAULT 0;


CREATE TABLE Utility_Type (
    utilityTypeID INT IDENTITY(1,1) PRIMARY KEY,
    utilityName VARCHAR(100) NOT NULL UNIQUE,
    unit VARCHAR(20),
    description VARCHAR(MAX)
);

CREATE TABLE Role (
    roleID INT IDENTITY(1,1) PRIMARY KEY,
    roleName VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(MAX)
);

CREATE TABLE Meter (
    meterID INT IDENTITY(1,1) PRIMARY KEY,
    serialNumber VARCHAR(100) NOT NULL UNIQUE,
    utilityTypeID INT NOT NULL,
    customerID INT NULL,
    installationDate DATE,
    status VARCHAR(50) DEFAULT 'Active',
    CONSTRAINT FK_Meter_UtilityType FOREIGN KEY (utilityTypeID) REFERENCES Utility_Type(utilityTypeID),
    CONSTRAINT FK_Meter_User FOREIGN KEY (customerID) REFERENCES [User](userID)
);

CREATE TABLE Complaint (
    complaintID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT NOT NULL,
    meterID INT NULL,
    complaintText VARCHAR(MAX) NOT NULL,
    complaintDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    status VARCHAR(50) DEFAULT 'Pending',
    CONSTRAINT FK_Complaint_User FOREIGN KEY (userID) REFERENCES [User](userID),
    CONSTRAINT FK_Complaint_Meter FOREIGN KEY (meterID) REFERENCES Meter(meterID)
);

CREATE TABLE Payment (
    paymentID INT IDENTITY(1,1) PRIMARY KEY,
    billID INT NOT NULL,
    userID INT NULL,
    amount DECIMAL(12,2) NOT NULL,
    paymentDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    paymentMethod VARCHAR(50),
    receiptNo VARCHAR(100),
    CONSTRAINT FK_Payment_Bill FOREIGN KEY (billID) REFERENCES Bill(billID),
    CONSTRAINT FK_Payment_User FOREIGN KEY (userID) REFERENCES [User](userID)
);
--INDEX
CREATE INDEX Meter_customerID ON Meter(customerID);

CREATE INDEX Meter_utilityTypeID ON Meter(utilityTypeID);

CREATE INDEX Reading_meterID ON Meter_Reading(meterID);

CREATE INDEX Bill_userID ON Bill(userID);

CREATE INDEX Payment_billID ON Payment(billID);

CREATE INDEX BillTariff_tariffID ON Bill_Tariff(tariffID);

--functions
GO
CREATE FUNCTION GetFullAddress
(
    @userID INT
)
RETURNS VARCHAR(300)
AS
BEGIN
    DECLARE @fullAddress VARCHAR(300);

    SELECT @fullAddress = street + ' ' + streetNo + ', ' + city
    FROM [User]
    WHERE userID = @userID;

    RETURN @fullAddress;
END;
GO

CREATE FUNCTION FindUserByName
(
    @username VARCHAR(50)
)
RETURNS TABLE
AS
RETURN
(
    SELECT userID, username, email, contactNo
    FROM [User]
    WHERE username LIKE '%' + @username + '%'
);
GO

CREATE FUNCTION CalculateCharge
(
    @tariffID INT,
    @units DECIMAL(18,4)
)
RETURNS DECIMAL(18,2)
AS
BEGIN
    DECLARE @rate DECIMAL(10,4);
    DECLARE @fixedCharge DECIMAL(10,2);
    DECLARE @total DECIMAL(18,2);

    SELECT @rate = rate,
           @fixedCharge = fixedCharge
    FROM Tariff
    WHERE tariffID = @tariffID;

    SET @total = (@units * @rate) + @fixedCharge;

    RETURN @total;
END;
GO

CREATE FUNCTION GetLastReading
(
    @meterID INT
)
RETURNS DECIMAL(18,4)
AS
BEGIN
    DECLARE @value DECIMAL(18,4);

    SELECT TOP 1 @value = readingValue
    FROM Meter_Reading
    WHERE meterID = @meterID
    ORDER BY readingDate DESC;

    RETURN @value;
END;
GO

CREATE FUNCTION GetBillStatus
(
    @billID INT
)
RETURNS VARCHAR(50)
AS
BEGIN
    DECLARE @status VARCHAR(50);

    SELECT @status = status
    FROM Bill
    WHERE billID = @billID;

    RETURN @status;
END;
GO

CREATE FUNCTION TotalConsumptionByUser
(
    @userID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        b.billID,
        b.totalConsumption,
        b.totalAmount,
        b.billDate
    FROM Bill b
    WHERE b.userID = @userID
);
GO

CREATE FUNCTION GetTariffsByBill
(
    @billID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        t.tariffID,
        t.rate,
        t.slabFrom,
        t.slabTo,
        t.fixedCharge
    FROM Bill_Tariff bt
    JOIN Tariff t ON bt.tariffID = t.tariffID
    WHERE bt.billID = @billID
);
GO

CREATE FUNCTION CalculateLateFee
(
    @billID INT,
    @asOfDate DATE
)
RETURNS DECIMAL(12,2)
AS
BEGIN
    DECLARE @dueDate DATE;
    DECLARE @totalAmount DECIMAL(12,2);
    DECLARE @monthsLate INT;
    DECLARE @lateFee DECIMAL(12,2);

    SELECT @dueDate = dueDate, @totalAmount = totalAmount
    FROM Bill
    WHERE billID = @billID;

    SET @monthsLate = DATEDIFF(MONTH, @dueDate, @asOfDate);

    IF @monthsLate > 0
        SET @lateFee = @totalAmount * 0.02 * @monthsLate;
    ELSE
        SET @lateFee = 0;

    RETURN @lateFee;
END;
GO

CREATE FUNCTION TotalPaymentsByUser (@userID INT)
RETURNS DECIMAL(12,2)
AS
BEGIN
    DECLARE @total DECIMAL(12,2);
    SELECT @total = SUM(amount) FROM Payment WHERE userID = @userID;
    RETURN ISNULL(@total, 0);
END;
GO

CREATE FUNCTION GetUtilityTypeName (@utilityTypeID INT)
RETURNS VARCHAR(100)
AS
BEGIN
    DECLARE @name VARCHAR(100);
    SELECT @name = utilityName FROM Utility_Type WHERE utilityTypeID = @utilityTypeID;
    RETURN @name;
END;
GO.

CREATE FUNCTION ComplaintCountByMeter (@meterID INT)
RETURNS INT
AS
BEGIN
    DECLARE @cnt INT;
    SELECT @cnt = COUNT(*) FROM Complaint WHERE meterID = @meterID;
    RETURN ISNULL(@cnt, 0);
END;
GO
--TRIGGERS
GO
CREATE OR ALTER TRIGGER Tariff_NoOverlap
ON Tariff
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Tariff t
        JOIN inserted i
            ON t.utilityTypeID = i.utilityTypeID
           AND t.tariffID <> i.tariffID
           AND (
                (i.effectiveFrom BETWEEN t.effectiveFrom AND t.effectiveTo) OR
                (i.effectiveTo BETWEEN t.effectiveFrom AND t.effectiveTo) OR
                (t.effectiveFrom BETWEEN i.effectiveFrom AND i.effectiveTo) OR
                (t.effectiveTo BETWEEN i.effectiveFrom AND i.effectiveTo)
           )
    )
    BEGIN
        RAISERROR ('Tariff date range overlaps with an existing tariff', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE TRIGGER MeterReading_Validate
ON Meter_Reading
AFTER INSERT
AS
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM inserted i
        JOIN Meter_Reading mr
            ON mr.meterID = i.meterID
           AND mr.readingID <> i.readingID
        WHERE i.readingValue < mr.readingValue
    )
    BEGIN
        RAISERROR ('Reading value cannot be lower than previous readings.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE OR ALTER TRIGGER Bill_AutoStatus
ON Payment
AFTER INSERT
AS
BEGIN
    UPDATE b
    SET status = 'Paid'
    FROM Bill b
    JOIN inserted i ON b.billID = i.billID
    WHERE 
        b.totalAmount <= (
            SELECT SUM(amount) 
            FROM Payment 
            WHERE billID = b.billID
        )
        AND b.status <> 'Paid'; 
END;
GO

CREATE TRIGGER BillTariff_NoDuplicate
ON Bill_Tariff
AFTER INSERT
AS
BEGIN
    IF EXISTS (
        SELECT billID, tariffID
        FROM Bill_Tariff
        GROUP BY billID, tariffID
        HAVING COUNT(*) > 1
    )
    BEGIN
        RAISERROR ('This bill already has this tariff assigned.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE TRIGGER NoDeleteUtilityType
ON Utility_Type
INSTEAD OF DELETE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Meter WHERE utilityTypeID IN (SELECT utilityTypeID FROM deleted))
    BEGIN
        RAISERROR ('Cannot delete Utility Type: It is used by a Meter.', 16, 1);
        RETURN;
    END

    DELETE FROM Utility_Type WHERE utilityTypeID IN (SELECT utilityTypeID FROM deleted);
END;
GO

CREATE TRIGGER AutoReceiptNo
ON Payment
AFTER INSERT
AS
BEGIN
    UPDATE Payment
    SET receiptNo = 'RCPT-' + CAST(paymentID AS VARCHAR(20))
    WHERE paymentID IN (SELECT paymentID FROM inserted);
END;
GO
--VIEW

GO
CREATE VIEW get_UserInfo AS
SELECT 
    [User].userID,
    [User].username,
    [User].email,
    [User].contactNo,
    [User].street,
    [User].streetNo,
    [User].city,
    [User].status,
    Role.roleName
FROM [User]
JOIN Role 
    ON [User].roleID = Role.roleID;

GO

CREATE OR ALTER VIEW get_fulladdress AS
SELECT 
    [User].userID,
    [User].username,
    [User].email,
    [User].contactNo,
    ([User].streetNo + ' ' + [User].street + ', ' + [User].city) AS fullAddress,
    [User].status,
    Role.roleName
FROM [User]
JOIN Role 
    ON [User].roleID = Role.roleID;

GO

CREATE VIEW get_Tariffs AS
SELECT
    Tariff.tariffID,
    Utility_Type.utilityName,
    Tariff.rate,
    Tariff.effectiveFrom,
    Tariff.effectiveTo,
    Tariff.slabFrom,
    Tariff.slabTo,
    Tariff.fixedCharge,
    Tariff.subsidiaryPercentage
FROM Tariff
JOIN Utility_Type 
    ON Tariff.utilityTypeID = Utility_Type.utilityTypeID;

GO

CREATE VIEW get_MeterReadings AS
SELECT
    Meter_Reading.readingID,
    Meter_Reading.readingValue,
    Meter_Reading.readingDate,
    Meter_Reading.remarks,
    Meter.serialNumber AS meterSerial,
    [User].username AS enteredBy
FROM Meter_Reading
JOIN Meter 
    ON Meter_Reading.meterID = Meter.meterID
LEFT JOIN [User] 
    ON Meter_Reading.userID = [User].userID;

GO

CREATE VIEW get_Bills AS
SELECT
    Bill.billID,
    [User].username AS customer,
    Bill.totalAmount,
    Bill.totalConsumption,
    Bill.billingPeriodStart,
    Bill.billingPeriodEnd,
    Bill.billDate,
    Bill.status,
    Bill.dueDate
FROM Bill
JOIN [User] 
    ON Bill.userID = [User].userID;

GO

CREATE VIEW get_BillTariffs AS
SELECT

    Bill_Tariff.billTariffID,
    Bill.billID,
    [User].username AS customer,
    Tariff.tariffID,
    Utility_Type.utilityName,
    Tariff.rate,
    Tariff.fixedCharge,
    Tariff.subsidiaryPercentage

FROM Bill_Tariff
JOIN Bill 
    ON Bill_Tariff.billID = Bill.billID
JOIN [User] 
    ON Bill.userID = [User].userID
JOIN Tariff 
    ON Bill_Tariff.tariffID = Tariff.tariffID
JOIN Utility_Type 
    ON Tariff.utilityTypeID = Utility_Type.utilityTypeID;

GO

CREATE VIEW get_MonthlyRevenue AS
SELECT 

    YEAR(b.billDate) AS BillYear,
    MONTH(b.billDate) AS BillMonth,
    u.utilityName,
    SUM(b.totalAmount) AS TotalRevenue

FROM Bill b
JOIN Bill_Tariff bt ON b.billID = bt.billID
JOIN Tariff t ON bt.tariffID = t.tariffID
JOIN Utility_Type u ON t.utilityTypeID = u.utilityTypeID
GROUP BY YEAR(b.billDate), MONTH(b.billDate), u.utilityName
ORDER BY BillYear, BillMonth, u.utilityName;

GO

CREATE VIEW UserPayments AS
SELECT
    p.paymentID,
    p.amount,
    p.paymentDate,
    p.paymentMethod,
    p.receiptNo,
    p.userID
FROM Payment p;
GO

CREATE VIEW ComplaintSummary AS
SELECT
    c.complaintID,
    c.complaintText,
    c.status,
    c.complaintDate,
    c.userID,
    c.meterID
FROM Complaint c;
GO

CREATE VIEW MeterDetails AS
SELECT 
    m.meterID,
    m.serialNumber,
    m.status,
    u.utilityName AS UtilityType,
    m.installationDate
FROM Meter m
JOIN Utility_Type u ON m.utilityTypeID = u.utilityTypeID;
GO
--proceduers
CREATE PROCEDURE p_InsertUser

    @username VARCHAR(50),
    @passwordHash VARCHAR(255),
    @email VARCHAR(100),
    @contactNo VARCHAR(20),
    @street VARCHAR(100),
    @streetNo VARCHAR(10),
    @city VARCHAR(50),
    @roleID INT
AS
BEGIN

    INSERT INTO [User] (username, passwordHash, email, contactNo, street, streetNo, city, roleID)
    VALUES (@username, @passwordHash, @email, @contactNo, @street, @streetNo, @city, @roleID);

END;
GO

CREATE PROCEDURE p_UpdateUser

    @userID INT,
    @email VARCHAR(100),
    @contactNo VARCHAR(20),
    @street VARCHAR(100),
    @streetNo VARCHAR(10),
    @city VARCHAR(50),
    @status VARCHAR(20)

AS
BEGIN

    UPDATE [User]
    SET email = @email,
        contactNo = @contactNo,
        street = @street,
        streetNo = @streetNo,
        city = @city,
        status = @status
    WHERE userID = @userID;

END;
GO

CREATE PROCEDURE p_DeleteUser
    @userID INT
AS
BEGIN

    DELETE FROM [User]
    WHERE userID = @userID;

END;
GO

CREATE PROCEDURE p_GetUserByID
    @userID INT
AS
BEGIN
    SELECT *
    FROM [User]
    WHERE userID = @userID;
END;
GO

CREATE PROCEDURE p_InsertTariff

    @rate DECIMAL(10,4),
    @effectiveFrom DATE,
    @effectiveTo DATE,
    @slabFrom DECIMAL(18,4),
    @slabTo DECIMAL(18,4),
    @fixedCharge DECIMAL(10,2),
    @subsidiaryPercentage DECIMAL(5,2),
    @utilityTypeID INT
AS
BEGIN

    INSERT INTO Tariff (rate, effectiveFrom, effectiveTo, slabFrom, slabTo, fixedCharge, subsidiaryPercentage, utilityTypeID)
    VALUES (@rate, @effectiveFrom, @effectiveTo, @slabFrom, @slabTo, @fixedCharge, @subsidiaryPercentage, @utilityTypeID);

END;
GO

CREATE PROCEDURE p_UpdateTariff

    @tariffID INT,
    @rate DECIMAL(10,4),
    @effectiveTo DATE

AS
BEGIN

    UPDATE Tariff
    SET rate = @rate,
        effectiveTo = @effectiveTo
    WHERE tariffID = @tariffID;

END;
GO

CREATE PROCEDURE p_DeleteTariff
    @tariffID INT
AS
BEGIN

    DELETE FROM Tariff
    WHERE tariffID = @tariffID;

END;
GO

CREATE PROCEDURE p_InsertMeterReading

    @readingValue DECIMAL(18,4),
    @readingDate DATETIME2,
    @remarks VARCHAR(255),
    @userID INT,
    @meterID INT

AS
BEGIN

    INSERT INTO Meter_Reading (readingValue, readingDate, remarks, userID, meterID)
    VALUES (@readingValue, @readingDate, @remarks, @userID, @meterID);
END;
GO

CREATE PROCEDURE p_GetReadingsByMeter
    @meterID INT
AS
BEGIN

    SELECT *
    FROM Meter_Reading
    WHERE meterID = @meterID;

END;
GO

CREATE PROCEDURE p_InsertBill

    @totalAmount DECIMAL(12,2),
    @totalConsumption DECIMAL(18,4),
    @billingPeriodStart DATE,
    @billingPeriodEnd DATE,
    @dueDate DATE,
    @userID INT
AS
BEGIN

    INSERT INTO Bill (totalAmount, totalConsumption, billingPeriodStart, billingPeriodEnd, dueDate, userID)
    VALUES (@totalAmount, @totalConsumption, @billingPeriodStart, @billingPeriodEnd, @dueDate, @userID);

END;
GO

CREATE PROCEDURE p_UpdateBillStatus
    @billID INT,
    @status VARCHAR(50)
AS
BEGIN

    UPDATE Bill
    SET status = @status
    WHERE billID = @billID;

END;
GO

CREATE PROCEDURE p_InsertBillTariff
    @billID INT,
    @tariffID INT
AS
BEGIN

    INSERT INTO Bill_Tariff (billID, tariffID)
    VALUES (@billID, @tariffID);

END;
GO

CREATE PROCEDURE p_UpdateLateFees
AS
BEGIN

    UPDATE Bill
    SET lateFee = dbo.fn_CalculateLateFee(billID, GETDATE())
    WHERE status <> 'Paid' AND dueDate < GETDATE();
END;
GO

CREATE PROCEDURE AddUtilityType
    @typeName VARCHAR(100),
    @unit VARCHAR(20),
    @description VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Utility_Type (utilityName, unit, description)
    VALUES (@typeName, @unit, @description);
END;
GO

CREATE PROCEDURE AddComplaint
    @userID INT,
    @meterID INT,
    @complaintText VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Complaint (userID, meterID, complaintText)
    VALUES (@userID, @meterID, @complaintText);
END;
GO

CREATE PROCEDURE UpdatePaymentMethod
    @paymentID INT,
    @method VARCHAR(50)
AS
BEGIN
    UPDATE Payment
    SET paymentMethod = @method
    WHERE paymentID = @paymentID;
END;
GO
--sample data 
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

























