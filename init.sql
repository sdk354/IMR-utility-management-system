/* --------------------------------------------------------------
   UTILITY MANAGEMENT SYSTEM - INITIALIZATION SCRIPT
   Designed for MS SQL Server (Docker/Production)
   Updated: 2026-01-11
   --------------------------------------------------------------
*/

USE master;
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'UtilityDB')
BEGIN
    CREATE DATABASE UtilityDB;
END;
GO

USE UtilityDB;
GO

/* =============================================
   1. LOOKUP TABLES
   ============================================= */

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Role]') AND type in (N'U'))
BEGIN
CREATE TABLE Role (
                      roleID      INT IDENTITY(1,1) PRIMARY KEY,
                      roleName    VARCHAR(50) NOT NULL UNIQUE,
                      description VARCHAR(MAX)
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Utility_Type]') AND type in (N'U'))
BEGIN
CREATE TABLE Utility_Type (
                              utilityTypeID INT IDENTITY(1,1) PRIMARY KEY,
                              utilityName   VARCHAR(100) NOT NULL UNIQUE,
                              unit          VARCHAR(20),
                              description   VARCHAR(MAX)
    );
END;

/* =============================================
   2. CORE ENTITY TABLES
   ============================================= */

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[User]') AND type in (N'U'))
BEGIN
CREATE TABLE [User] (
                        userID       INT IDENTITY(1,1) PRIMARY KEY,
    username     VARCHAR(50) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    email        VARCHAR(100) UNIQUE,
    contactNo    VARCHAR(15),
    street       VARCHAR(100),
    streetNo     VARCHAR(20),
    city         VARCHAR(50),
    status       VARCHAR(20) DEFAULT 'Active',
    roleID       INT NOT NULL,
    CONSTRAINT FK_User_Role FOREIGN KEY (roleID) REFERENCES Role (roleID)
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Tariff]') AND type in (N'U'))
BEGIN
CREATE TABLE Tariff (
                        tariffID             INT IDENTITY(1,1) PRIMARY KEY,
                        rate                 DECIMAL(10, 4),
                        effectiveFrom        DATE,
                        effectiveTo          DATE,
                        slabFrom             DECIMAL(18, 4),
                        slabTo               DECIMAL(18, 4),
                        fixedCharge          DECIMAL(10, 2),
                        subsidiaryPercentage DECIMAL(5, 2),
                        utilityTypeID        INT NOT NULL,
                        CONSTRAINT FK_Tariff_UtilityType FOREIGN KEY (utilityTypeID) REFERENCES Utility_Type (utilityTypeID)
);
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Meter]') AND type in (N'U'))
BEGIN
CREATE TABLE Meter (
                       meterID          INT IDENTITY(1,1) PRIMARY KEY,
                       serialNumber     VARCHAR(100) NOT NULL UNIQUE,
                       utilityTypeID    INT          NOT NULL,
                       userID           INT NULL,
                       installationDate DATE,
                       status           VARCHAR(50) DEFAULT 'Active',
                       CONSTRAINT FK_Meter_UtilityType FOREIGN KEY (utilityTypeID) REFERENCES Utility_Type (utilityTypeID),
                       CONSTRAINT FK_Meter_User FOREIGN KEY (userID) REFERENCES [User](userID)
);
END;

/* =============================================
   3. TRANSACTIONAL TABLES
   ============================================= */

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Meter_Reading]') AND type in (N'U'))
BEGIN
CREATE TABLE Meter_Reading (
                               readingID    INT IDENTITY(1,1) PRIMARY KEY,
                               readingValue DECIMAL(18, 4) NOT NULL,
                               readingDate  DATETIME2      NOT NULL,
                               remarks      VARCHAR(255),
                               userID       INT NULL,
                               meterID      INT            NOT NULL,
                               CONSTRAINT FK_Reading_User FOREIGN KEY (userID) REFERENCES [User](userID),
                               CONSTRAINT FK_Reading_Meter FOREIGN KEY (meterID) REFERENCES Meter (meterID)
);
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Bill]') AND type in (N'U'))
BEGIN
CREATE TABLE Bill (
                      billID             INT IDENTITY(1,1) PRIMARY KEY,
                      totalAmount        DECIMAL(12, 2) NOT NULL,
                      totalConsumption   DECIMAL(18, 4),
                      billingPeriodStart DATE,
                      billingPeriodEnd   DATE,
                      billDate           DATE           DEFAULT CAST(GETDATE() AS DATE),
                      status             VARCHAR(50)    DEFAULT 'Unpaid',
                      dueDate            DATE,
                      lateFee            DECIMAL(12, 2) DEFAULT 0,
                      userID             INT            NOT NULL,
                      CONSTRAINT FK_Bill_User FOREIGN KEY (userID) REFERENCES [User](userID)
);
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Bill_Tariff]') AND type in (N'U'))
BEGIN
CREATE TABLE Bill_Tariff (
                             billTariffID INT IDENTITY(1,1) PRIMARY KEY,
                             billID       INT NOT NULL,
                             tariffID     INT NOT NULL,
                             CONSTRAINT FK_BillTariff_Bill FOREIGN KEY (billID) REFERENCES Bill (billID),
                             CONSTRAINT FK_BillTariff_Tariff FOREIGN KEY (tariffID) REFERENCES Tariff (tariffID)
);
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Complaint]') AND type in (N'U'))
BEGIN
CREATE TABLE Complaint (
                           complaintID   INT IDENTITY(1,1) PRIMARY KEY,
                           userID        INT NOT NULL,
                           meterID       INT NULL,
                           complaintText VARCHAR(MAX) NOT NULL,
        complaintDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        status        VARCHAR(50) DEFAULT 'Pending',
        CONSTRAINT FK_Complaint_User FOREIGN KEY (userID) REFERENCES [User](userID),
        CONSTRAINT FK_Complaint_Meter FOREIGN KEY (meterID) REFERENCES Meter(meterID)
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Payment]') AND type in (N'U'))
BEGIN
CREATE TABLE Payment (
                         paymentID     INT IDENTITY(1,1) PRIMARY KEY,
                         billID        INT            NOT NULL,
                         userID        INT NULL,
                         amount        DECIMAL(12, 2) NOT NULL,
                         paymentDate   DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
                         paymentMethod VARCHAR(50),
                         receiptNo     VARCHAR(100),
                         CONSTRAINT FK_Payment_Bill FOREIGN KEY (billID) REFERENCES Bill (billID),
                         CONSTRAINT FK_Payment_User FOREIGN KEY (userID) REFERENCES [User](userID)
);
END;
GO

/* =============================================
   4. INDEXES
   ============================================= */
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'Meter_userID') CREATE INDEX Meter_userID ON Meter (userID);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'Meter_utilityTypeID') CREATE INDEX Meter_utilityTypeID ON Meter (utilityTypeID);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'Reading_meterID') CREATE INDEX Reading_meterID ON Meter_Reading (meterID);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'Bill_userID') CREATE INDEX Bill_userID ON Bill (userID);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'Payment_billID') CREATE INDEX Payment_billID ON Payment (billID);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'BillTariff_tariffID') CREATE INDEX BillTariff_tariffID ON Bill_Tariff (tariffID);
GO

/* =============================================
   5. FUNCTIONS
   ============================================= */
CREATE OR ALTER FUNCTION GetFullAddress(@userID INT)
    RETURNS VARCHAR(300) AS
BEGIN
    DECLARE @fullAddress VARCHAR(300);
SELECT @fullAddress = street + ' ' + streetNo + ', ' + city FROM [User] WHERE userID = @userID;
RETURN @fullAddress;
END;
GO

CREATE OR ALTER FUNCTION FindUserByName(@username VARCHAR(50))
    RETURNS TABLE AS
    RETURN (
    SELECT userID, username, email, contactNo FROM [User] WHERE username LIKE '%' + @username + '%'
    );
GO

CREATE OR ALTER FUNCTION CalculateCharge(@tariffID INT, @units DECIMAL(18,4))
    RETURNS DECIMAL(18, 2) AS
BEGIN
    DECLARE @rate DECIMAL(10,4), @fixedCharge DECIMAL(10,2), @total DECIMAL(18,2);
SELECT @rate = rate, @fixedCharge = fixedCharge FROM Tariff WHERE tariffID = @tariffID;
SET @total = (@units * @rate) + @fixedCharge;
RETURN @total;
END;
GO

CREATE OR ALTER FUNCTION GetLastReading(@meterID INT)
    RETURNS DECIMAL(18, 4) AS
BEGIN
    DECLARE @value DECIMAL(18,4);
SELECT TOP 1 @value = readingValue FROM Meter_Reading WHERE meterID = @meterID ORDER BY readingDate DESC;
RETURN @value;
END;
GO

CREATE OR ALTER FUNCTION GetBillStatus(@billID INT)
    RETURNS VARCHAR(50) AS
BEGIN
    DECLARE @status VARCHAR(50);
SELECT @status = status FROM Bill WHERE billID = @billID;
RETURN @status;
END;
GO

CREATE OR ALTER FUNCTION TotalConsumptionByUser(@userID INT)
    RETURNS TABLE AS
    RETURN (
    SELECT b.billID, b.totalConsumption, b.totalAmount, b.billDate FROM Bill b WHERE b.userID = @userID
    );
GO

CREATE OR ALTER FUNCTION GetTariffsByBill(@billID INT)
    RETURNS TABLE AS
    RETURN (
    SELECT t.tariffID, t.rate, t.slabFrom, t.slabTo, t.fixedCharge
    FROM Bill_Tariff bt JOIN Tariff t ON bt.tariffID = t.tariffID WHERE bt.billID = @billID
    );
GO

CREATE OR ALTER FUNCTION CalculateLateFee(@billID INT, @asOfDate DATE)
    RETURNS DECIMAL(12, 2) AS
BEGIN
    DECLARE @dueDate DATE, @totalAmount DECIMAL(12,2), @monthsLate INT, @lateFee DECIMAL(12,2);
SELECT @dueDate = dueDate, @totalAmount = totalAmount FROM Bill WHERE billID = @billID;
SET @monthsLate = DATEDIFF(MONTH, @dueDate, @asOfDate);
    SET @lateFee = CASE WHEN @monthsLate > 0 THEN @totalAmount * 0.02 * @monthsLate ELSE 0 END;
RETURN @lateFee;
END;
GO

CREATE OR ALTER FUNCTION TotalPaymentsByUser(@userID INT)
    RETURNS DECIMAL(12, 2) AS
BEGIN
    DECLARE @total DECIMAL(12,2);
SELECT @total = SUM(amount) FROM Payment WHERE userID = @userID;
RETURN ISNULL(@total, 0);
END;
GO

CREATE OR ALTER FUNCTION GetUtilityTypeName(@utilityTypeID INT)
    RETURNS VARCHAR(100) AS
BEGIN
    DECLARE @name VARCHAR(100);
SELECT @name = utilityName FROM Utility_Type WHERE utilityTypeID = @utilityTypeID;
RETURN @name;
END;
GO

CREATE OR ALTER FUNCTION ComplaintCountByMeter(@meterID INT)
    RETURNS INT AS
BEGIN
    DECLARE @cnt INT;
SELECT @cnt = COUNT(*) FROM Complaint WHERE meterID = @meterID;
RETURN ISNULL(@cnt, 0);
END;
GO

/* =============================================
   6. TRIGGERS
   ============================================= */
CREATE OR ALTER TRIGGER Tariff_NoOverlap ON Tariff
AFTER INSERT, UPDATE AS
BEGIN
    IF EXISTS (
        SELECT 1 FROM Tariff t JOIN inserted i ON t.utilityTypeID = i.utilityTypeID
        AND t.tariffID <> i.tariffID
        AND ((i.effectiveFrom BETWEEN t.effectiveFrom AND t.effectiveTo) OR
             (i.effectiveTo BETWEEN t.effectiveFrom AND t.effectiveTo) OR
             (t.effectiveFrom BETWEEN i.effectiveFrom AND i.effectiveTo) OR
             (t.effectiveTo BETWEEN i.effectiveFrom AND i.effectiveTo))
    )
BEGIN
        RAISERROR ('Tariff date range overlaps with an existing tariff', 16, 1);
ROLLBACK TRANSACTION;
END
END;
GO

CREATE OR ALTER TRIGGER MeterReading_Validate ON Meter_Reading AFTER INSERT AS
BEGIN
    IF EXISTS (
        SELECT 1 FROM inserted i JOIN Meter_Reading mr ON mr.meterID = i.meterID
        AND mr.readingID <> i.readingID WHERE i.readingValue < mr.readingValue
    )
BEGIN
        RAISERROR ('Reading value cannot be lower than previous readings.', 16, 1);
ROLLBACK TRANSACTION;
END
END;
GO

CREATE OR ALTER TRIGGER Bill_AutoStatus ON Payment AFTER INSERT AS
BEGIN
UPDATE b SET status = 'Paid' FROM Bill b JOIN inserted i ON b.billID = i.billID
WHERE b.totalAmount <= (SELECT SUM(amount) FROM Payment WHERE billID = b.billID) AND b.status <> 'Paid';
END;
GO

CREATE OR ALTER TRIGGER BillTariff_NoDuplicate ON Bill_Tariff AFTER INSERT AS
BEGIN
    IF EXISTS (SELECT billID, tariffID FROM Bill_Tariff GROUP BY billID, tariffID HAVING COUNT(*) > 1)
BEGIN
        RAISERROR ('This bill already has this tariff assigned.', 16, 1);
ROLLBACK TRANSACTION;
END
END;
GO

CREATE OR ALTER TRIGGER NoDeleteUtilityType ON Utility_Type INSTEAD OF DELETE AS
BEGIN
    IF EXISTS (SELECT 1 FROM Meter WHERE utilityTypeID IN (SELECT utilityTypeID FROM deleted))
BEGIN
        RAISERROR ('Cannot delete Utility Type: It is used by a Meter.', 16, 1);
        RETURN;
END
DELETE FROM Utility_Type WHERE utilityTypeID IN (SELECT utilityTypeID FROM deleted);
END;
GO

CREATE OR ALTER TRIGGER AutoReceiptNo ON Payment AFTER INSERT AS
BEGIN
UPDATE Payment SET receiptNo = 'RCPT-' + CAST(paymentID AS VARCHAR(20))
WHERE paymentID IN (SELECT paymentID FROM inserted);
END;
GO

/* =============================================
   7. VIEWS
   ============================================= */
CREATE OR ALTER VIEW get_UserInfo AS
SELECT u.userID, u.username, u.email, u.contactNo, u.street, u.streetNo, u.city, u.status, r.roleName
FROM [User] u JOIN Role r ON u.roleID = r.roleID;
GO

CREATE OR ALTER VIEW get_fulladdress AS
SELECT u.userID, u.username, u.email, u.contactNo, (u.streetNo + ' ' + u.street + ', ' + u.city) AS fullAddress, u.status, r.roleName
FROM [User] u JOIN Role r ON u.roleID = r.roleID;
GO

CREATE OR ALTER VIEW get_Tariffs AS
SELECT t.tariffID, u.utilityName, t.rate, t.effectiveFrom, t.effectiveTo, t.slabFrom, t.slabTo, t.fixedCharge, t.subsidiaryPercentage
FROM Tariff t JOIN Utility_Type u ON t.utilityTypeID = u.utilityTypeID;
GO

CREATE OR ALTER VIEW get_MeterReadings AS
SELECT mr.readingID, mr.readingValue, mr.readingDate, mr.remarks, m.serialNumber AS meterSerial, u.username AS enteredBy
FROM Meter_Reading mr JOIN Meter m ON mr.meterID = m.meterID LEFT JOIN [User] u ON mr.userID = u.userID;
GO

CREATE OR ALTER VIEW get_Bills AS
SELECT b.billID, u.username AS customer, b.totalAmount, b.totalConsumption, b.billingPeriodStart, b.billingPeriodEnd, b.billDate, b.status, b.dueDate
FROM Bill b JOIN [User] u ON b.userID = u.userID;
GO

CREATE OR ALTER VIEW get_BillTariffs AS
SELECT bt.billTariffID, b.billID, u.username AS customer, t.tariffID, ut.utilityName, t.rate, t.fixedCharge, t.subsidiaryPercentage
FROM Bill_Tariff bt JOIN Bill b ON bt.billID = b.billID JOIN [User] u ON b.userID = u.userID
    JOIN Tariff t ON bt.tariffID = t.tariffID JOIN Utility_Type ut ON t.utilityTypeID = ut.utilityTypeID;
GO

CREATE OR ALTER VIEW get_MonthlyRevenue AS
SELECT YEAR(b.billDate) AS BillYear, MONTH(b.billDate) AS BillMonth, u.utilityName, SUM(b.totalAmount) AS TotalRevenue
FROM Bill b JOIN Bill_Tariff bt ON b.billID = bt.billID JOIN Tariff t ON bt.tariffID = t.tariffID
    JOIN Utility_Type u ON t.utilityTypeID = u.utilityTypeID
GROUP BY YEAR(b.billDate), MONTH(b.billDate), u.utilityName;
GO

CREATE OR ALTER VIEW UserPayments AS
SELECT p.paymentID, p.amount, p.paymentDate, p.paymentMethod, p.receiptNo, p.userID FROM Payment p;
GO

CREATE OR ALTER VIEW ComplaintSummary AS
SELECT c.complaintID, c.complaintText, c.status, c.complaintDate, c.userID, c.meterID FROM Complaint c;
GO

CREATE OR ALTER VIEW MeterDetails AS
SELECT m.meterID, m.serialNumber, m.status, u.utilityName AS UtilityType, m.installationDate
FROM Meter m JOIN Utility_Type u ON m.utilityTypeID = u.utilityTypeID;
GO

/* =============================================
   8. STORED PROCEDURES
   ============================================= */
CREATE OR ALTER PROCEDURE p_InsertUser @username VARCHAR(50), @passwordHash VARCHAR(255), @email VARCHAR(100), @contactNo VARCHAR(20),
    @street VARCHAR(100), @streetNo VARCHAR(10), @city VARCHAR(50), @roleID INT AS
BEGIN
INSERT INTO [User] (username, passwordHash, email, contactNo, street, streetNo, city, roleID)
VALUES (@username, @passwordHash, @email, @contactNo, @street, @streetNo, @city, @roleID);
END;
GO

CREATE OR ALTER PROCEDURE p_UpdateUser @userID INT, @email VARCHAR(100), @contactNo VARCHAR(20), @street VARCHAR(100),
    @streetNo VARCHAR(10), @city VARCHAR(50), @status VARCHAR(20) AS
BEGIN
UPDATE [User] SET email = @email, contactNo = @contactNo, street = @street, streetNo = @streetNo, city = @city, status = @status
WHERE userID = @userID;
END;
GO

CREATE OR ALTER PROCEDURE p_DeleteUser @userID INT AS BEGIN DELETE FROM [User] WHERE userID = @userID; END;
GO

CREATE OR ALTER PROCEDURE p_GetUserByID @userID INT AS BEGIN SELECT * FROM [User] WHERE userID = @userID; END;
GO

CREATE OR ALTER PROCEDURE p_InsertTariff @rate DECIMAL(10,4), @effectiveFrom DATE, @effectiveTo DATE, @slabFrom DECIMAL(18,4), @slabTo DECIMAL(18,4),
    @fixedCharge DECIMAL(10,2), @subsidiaryPercentage DECIMAL(5,2), @utilityTypeID INT AS
BEGIN
INSERT INTO Tariff (rate, effectiveFrom, effectiveTo, slabFrom, slabTo, fixedCharge, subsidiaryPercentage, utilityTypeID)
VALUES (@rate, @effectiveFrom, @effectiveTo, @slabFrom, @slabTo, @fixedCharge, @subsidiaryPercentage, @utilityTypeID);
END;
GO

CREATE OR ALTER PROCEDURE p_UpdateTariff @tariffID INT, @rate DECIMAL(10,4), @effectiveTo DATE AS
BEGIN
UPDATE Tariff SET rate = @rate, effectiveTo = @effectiveTo WHERE tariffID = @tariffID;
END;
GO

CREATE OR ALTER PROCEDURE p_DeleteTariff @tariffID INT AS BEGIN DELETE FROM Tariff WHERE tariffID = @tariffID; END;
GO

CREATE OR ALTER PROCEDURE p_InsertMeterReading @readingValue DECIMAL(18,4), @readingDate DATETIME2, @remarks VARCHAR(255), @userID INT, @meterID INT AS
BEGIN
INSERT INTO Meter_Reading (readingValue, readingDate, remarks, userID, meterID)
VALUES (@readingValue, @readingDate, @remarks, @userID, @meterID);
END;
GO

CREATE OR ALTER PROCEDURE p_GetReadingsByMeter @meterID INT AS BEGIN SELECT * FROM Meter_Reading WHERE meterID = @meterID; END;
GO

CREATE OR ALTER PROCEDURE p_InsertBill @totalAmount DECIMAL(12,2), @totalConsumption DECIMAL(18,4), @billingPeriodStart DATE, @billingPeriodEnd DATE, @dueDate DATE, @userID INT AS
BEGIN
INSERT INTO Bill (totalAmount, totalConsumption, billingPeriodStart, billingPeriodEnd, dueDate, userID)
VALUES (@totalAmount, @totalConsumption, @billingPeriodStart, @billingPeriodEnd, @dueDate, @userID);
END;
GO

CREATE OR ALTER PROCEDURE p_UpdateBillStatus @billID INT, @status VARCHAR(50) AS BEGIN UPDATE Bill SET status = @status WHERE billID = @billID; END;
GO

CREATE OR ALTER PROCEDURE p_InsertBillTariff @billID INT, @tariffID INT AS BEGIN INSERT INTO Bill_Tariff (billID, tariffID) VALUES (@billID, @tariffID); END;
GO

CREATE OR ALTER PROCEDURE p_UpdateLateFees AS
BEGIN
UPDATE Bill SET lateFee = dbo.CalculateLateFee(billID, GETDATE())
WHERE status <> 'Paid' AND dueDate < GETDATE();
END;
GO

CREATE OR ALTER PROCEDURE AddUtilityType @typeName VARCHAR(100), @unit VARCHAR(20), @description VARCHAR(MAX) AS
BEGIN
INSERT INTO Utility_Type (utilityName, unit, description) VALUES (@typeName, @unit, @description);
END;
GO

CREATE OR ALTER PROCEDURE AddComplaint @userID INT, @meterID INT, @complaintText VARCHAR(MAX) AS
BEGIN
INSERT INTO Complaint (userID, meterID, complaintText) VALUES (@userID, @meterID, @complaintText);
END;
GO

CREATE OR ALTER PROCEDURE UpdatePaymentMethod @paymentID INT, @method VARCHAR(50) AS
BEGIN
UPDATE Payment SET paymentMethod = @method WHERE paymentID = @paymentID;
END;
GO

/* =============================================
   9. SAMPLE DATA SEEDING (Option B: Strict Control)
   ============================================= */

-- 9.1 Lookup Tables
IF NOT EXISTS (SELECT 1 FROM Utility_Type)
BEGIN
    SET IDENTITY_INSERT Utility_Type ON;
INSERT INTO Utility_Type (utilityTypeID, utilityName, unit, description) VALUES
                                                                             (1, 'Electricity', 'kWh', 'Electricity utility service'),
                                                                             (2, 'Water', 'm³', 'Water supply service'),
                                                                             (3, 'Gas', 'm³', 'Gas utility service');
SET IDENTITY_INSERT Utility_Type OFF;
END;

IF NOT EXISTS (SELECT 1 FROM Role)
BEGIN
    SET IDENTITY_INSERT Role ON;
INSERT INTO Role (roleID, roleName, description)
VALUES (1, 'Administrative Staff', 'Management of customers and complaints.'),
       (2, 'Field Officer', 'Meter reading entry.'),
       (3, 'Billing Clerk', 'Bill and payment processing.'),
       (4, 'Manager', 'Reporting and analytics.'),
       (5, 'Customer', 'End user dashboard access.'),
       (6, 'Developer', 'System super-user.');
SET IDENTITY_INSERT Role OFF;
END;

-- 9.2 Users
IF NOT EXISTS (SELECT 1 FROM [User])
BEGIN
    SET IDENTITY_INSERT [User] ON;
INSERT INTO [User] (userID, username, passwordHash, email, contactNo, street, streetNo, city, roleID)
VALUES
    (1, 'john_doe', '$2a$12$4LFWUyjNLIM13znJlpk2UepqVhnLSZ1BbmogEfXkBrFBBVQdLW45q', 'john@example.com', '0711234567', 'Main Street', '12A', 'Colombo', 1),
    (2, 'alice_smith', '$2a$12$9GU7hkHKlVSWGcTe9VNaoe4yeLligHmbV71pFsTSYLV4FXIAlTapy', 'alice@example.com', '0722345678', 'Park Road', '5', 'Kandy', 1),
    (3, 'bob_jones', '$2a$12$BkBik4HT1lvQ6ISSHQ6UaeXWmcDgruTN.olr4H5raXYSrGfsiMeme', 'bob@example.com', '0773456789', 'River Street', '101', 'Galle', 2),
    (4, 'carol_lee', '$2a$12$OYL8zY603VACY8w1whm8wO6mP7zvvhs0ozDAMGlfkPzaS0vmtdiW.', 'carol@example.com', '0754567890', 'Hill Road', '22B', 'Negombo', 2),
    (5, 'dave_wilson', '$2a$12$Vz5tI4SfDBnCQH5k01lkluYg7NFleN/Cmk21/5IaSoFPxkjYLnVWW', 'dave@example.com', '0765678901', 'Lake Street', '8', 'Matara', 3),
    (6, 'eve_martin', '$2a$12$G9Y00Vl33T4avYxnGtrcfewCF4I7ff3D3WCpKZHuTy9RRvOLl.UCC', 'eve@example.com', '0716789012', 'Ocean Road', '15', 'Jaffna', 3),
    (7, 'frank_taylor', '$2a$12$6S75kBqssWlJ4Q1pqcAAYutfIhjaqzbzxvalM3JV4XTBuUUnxn6fO', 'frank@example.com', '0727890123', 'Garden Lane', '3', 'Batticaloa', 4),
    (8, 'grace_clark', '$2a$12$qlo64pauPYqUmTp3j.U58.Ev3aOh22ZsA1G1MB5cKOXU2OfHmJfZO', 'grace@example.com', '0778901234', 'Forest Street', '7C', 'Trincomalee', 4),
    (9, 'henry_moore', '$2a$12$fZFAWFGaumLuMcUVEXAlnOscxhU7fEhezSeJLF8S.m2KUJMjPynae', 'henry@example.com', '0759012345', 'Hilltop Road', '9', 'Ratnapura', 5),
    (10, 'iris_wright', '$2a$12$wrvZ71htQyrapGRYgaDs6.W/DW2KOTvpBB/3Nvm.AEZiOBNqYWvCi', 'iris@example.com', '0760123456', 'Sunset Blvd', '11', 'Anuradhapura', 5),
    (11, 'dev_account', '$2a$12$D6NjZLUDJoA1.AeWyE7FneWJdXY1WBIVh1nQ65EuDlGD3yiFZfNU6', 'dev@utility.com', '0000000000', 'System Drive', '00', 'Root', 6);
SET IDENTITY_INSERT [User] OFF;
END;

-- 9.3 Tariffs
IF NOT EXISTS (SELECT 1 FROM Tariff)
BEGIN
    SET IDENTITY_INSERT Tariff ON;
INSERT INTO Tariff (tariffID, rate, effectiveFrom, effectiveTo, slabFrom, slabTo, fixedCharge, subsidiaryPercentage, utilityTypeID)
VALUES (1, 15.0, '2025-01-01', '2025-12-31', 0, 30, 50, 5, 1),
       (2, 20.0, '2025-01-01', '2025-12-31', 31, 60, 50, 5, 1),
       (3, 30.0, '2025-01-01', '2025-12-31', 61, 999, 100, 0, 1),
       (4, 25.0, '2025-01-01', '2025-12-31', 0, 20, 30, 3, 2),
       (5, 35.0, '2025-01-01', '2025-12-31', 21, 50, 30, 3, 2),
       (6, 10.0, '2025-01-01', '2025-12-31', 0, 100, 20, 2, 3),
       (7, 12.0, '2026-01-01', '2026-12-31', 0, 100, 25, 2, 3),
       (8, 18.0, '2026-01-01', '2026-12-31', 0, 30, 55, 5, 1),
       (9, 28.0, '2026-01-01', '2026-12-31', 0, 20, 35, 3, 2),
       (10, 15.0, '2024-01-01', '2024-12-31', 0, 30, 45, 5, 1);
SET IDENTITY_INSERT Tariff OFF;
END;

-- 9.4 Meters
IF NOT EXISTS (SELECT 1 FROM Meter)
BEGIN
    SET IDENTITY_INSERT Meter ON;
INSERT INTO Meter (meterID, serialNumber, utilityTypeID, installationDate, status, userID)
VALUES (1, 'E-HEN-101', 1, '2024-01-01', 'Live', 9),
       (2, 'W-HEN-102', 2, '2024-01-01', 'Live', 9),
       (3, 'G-HEN-103', 3, '2024-01-01', 'Under Repair', 9),
       (4, 'E-IRI-201', 1, '2024-02-01', 'Live', 10),
       (5, 'W-IRI-202', 2, '2024-02-01', 'Suspended', 10),
       (6, 'G-IRI-203', 3, '2024-02-01', 'Suspended', 10),
       (7, 'MTR-EXT-1', 1, '2023-05-10', 'Live', NULL),
       (8, 'MTR-EXT-2', 2, '2023-06-15', 'Live', NULL),
       (9, 'MTR-EXT-3', 3, '2023-07-01', 'Suspended', NULL),
       (10, 'MTR-EXT-4', 1, '2023-08-01', 'Under Repair', NULL);
SET IDENTITY_INSERT Meter OFF;
END;

-- 9.5 Transactions (Complaints, Readings, Bills)
IF NOT EXISTS (SELECT 1 FROM Complaint)
BEGIN
    SET IDENTITY_INSERT Complaint ON;
INSERT INTO Complaint (complaintID, userID, meterID, complaintText, complaintDate, status)
VALUES (1, 9, 1, '[Electricity] High bill concern', '2025-11-21', 'Pending'),
       (2, 10, 5, '[Water] Low pressure', '2024-01-21', 'Pending'),
       (3, 1, 7, '[General] System login issue', '2024-08-23', 'Resolved'),
       (4, 9, 2, '[Water] Meter lid broken', '2025-09-13', 'Pending'),
       (5, 10, 4, '[Electricity] Power fluctuations', '2025-01-11', 'Pending');
SET IDENTITY_INSERT Complaint OFF;
END;

IF NOT EXISTS (SELECT 1 FROM Meter_Reading)
BEGIN
    SET IDENTITY_INSERT Meter_Reading ON;
INSERT INTO Meter_Reading (readingID, readingValue, readingDate, remarks, userID, meterID)
VALUES (1, 1032, '2025-10-31', 'Oct Electricity Reading', 9, 1),
       (2, 1060, '2025-11-30', 'Nov Electricity Reading', 9, 1),
       (3, 1094, '2025-12-31', 'Dec Electricity Reading', 9, 1);
SET IDENTITY_INSERT Meter_Reading OFF;
END;

IF NOT EXISTS (SELECT 1 FROM Bill)
BEGIN
    SET IDENTITY_INSERT Bill ON;
INSERT INTO Bill (billID, totalAmount, totalConsumption, billingPeriodStart, billingPeriodEnd, dueDate, userID)
VALUES (1, 500.00, 32, '2025-10-01', '2025-10-31', '2025-11-10', 9),
       (2, 450.00, 28, '2025-11-01', '2025-11-30', '2025-12-10', 9);
SET IDENTITY_INSERT Bill OFF;
END;

IF NOT EXISTS (SELECT 1 FROM Bill_Tariff)
BEGIN
    SET IDENTITY_INSERT Bill_Tariff ON;
INSERT INTO Bill_Tariff (billTariffID, billID, tariffID)
VALUES (1, 1, 1), (2, 1, 2), (3, 2, 1);
SET IDENTITY_INSERT Bill_Tariff OFF;
END;

IF NOT EXISTS (SELECT 1 FROM Payment)
BEGIN
    SET IDENTITY_INSERT Payment ON;
INSERT INTO Payment (paymentID, billID, userID, amount, paymentDate, paymentMethod, receiptNo)
VALUES (1, 1, 9, 500.00, '2025-11-05', 'Card', 'REC-001');
SET IDENTITY_INSERT Payment OFF;
END;
GO