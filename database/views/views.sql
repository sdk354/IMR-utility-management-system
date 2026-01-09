-- Each view should be run separately, without GO, if not using SSMS or sqlcmd.

CREATE OR ALTER VIEW get_UserInfo AS
SELECT
    u.userID,
    u.username,
    u.email,
    u.contactNo,
    u.street,
    u.streetNo,
    u.city,
    u.status,
    r.roleName
FROM [User] u
    JOIN Role r ON u.roleID = r.roleID;
GO

CREATE OR ALTER VIEW get_fulladdress AS
SELECT
    u.userID,
    u.username,
    u.email,
    u.contactNo,
    (u.streetNo + ' ' + u.street + ', ' + u.city) AS fullAddress,
    u.status,
    r.roleName
FROM [User] u
    JOIN Role r ON u.roleID = r.roleID;
GO

CREATE OR ALTER VIEW get_Tariffs AS
SELECT
    t.tariffID,
    ut.utilityName,
    t.rate,
    t.effectiveFrom,
    t.effectiveTo,
    t.slabFrom,
    t.slabTo,
    t.fixedCharge,
    t.subsidiaryPercentage
FROM Tariff t
         JOIN Utility_Type ut ON t.utilityTypeID = ut.utilityTypeID;
GO

CREATE OR ALTER VIEW get_MeterReadings AS
SELECT
    mr.readingID,
    mr.readingValue,
    mr.readingDate,
    mr.remarks,
    m.serialNumber AS meterSerial,
    u.username AS enteredBy
FROM Meter_Reading mr
         JOIN Meter m ON mr.meterID = m.meterID
         LEFT JOIN [User] u ON mr.userID = u.userID;
GO

CREATE OR ALTER VIEW get_Bills AS
SELECT
    b.billID,
    u.username AS customer,
    b.totalAmount,
    b.totalConsumption,
    b.billingPeriodStart,
    b.billingPeriodEnd,
    b.billDate,
    b.status,
    b.dueDate
FROM Bill b
         JOIN [User] u ON b.userID = u.userID;
GO

CREATE OR ALTER VIEW get_BillTariffs AS
SELECT
    bt.billTariffID,
    b.billID,
    u.username AS customer,
    t.tariffID,
    ut.utilityName,
    t.rate,
    t.fixedCharge,
    t.subsidiaryPercentage
FROM Bill_Tariff bt
         JOIN Bill b ON bt.billID = b.billID
         JOIN [User] u ON b.userID = u.userID
    JOIN Tariff t ON bt.tariffID = t.tariffID
    JOIN Utility_Type ut ON t.utilityTypeID = ut.utilityTypeID;
GO

CREATE OR ALTER VIEW get_MonthlyRevenue AS
SELECT TOP 100 PERCENT
    YEAR(b.billDate) AS BillYear,
    MONTH(b.billDate) AS BillMonth,
    ut.utilityName,
    SUM(b.totalAmount) AS TotalRevenue
FROM Bill b
    JOIN Bill_Tariff bt ON b.billID = bt.billID
    JOIN Tariff t ON bt.tariffID = t.tariffID
    JOIN Utility_Type ut ON t.utilityTypeID = ut.utilityTypeID
GROUP BY YEAR(b.billDate), MONTH(b.billDate), ut.utilityName
ORDER BY YEAR(b.billDate), MONTH(b.billDate), ut.utilityName;
GO

CREATE OR ALTER VIEW MeterDetails AS
SELECT
    m.meterID,
    m.serialNumber,
    m.status,
    ut.utilityName AS UtilityType,
    m.installationDate
FROM Meter m
         JOIN Utility_Type ut ON m.utilityTypeID = ut.utilityTypeID;
GO

CREATE OR ALTER VIEW UserPayments AS
SELECT
    p.paymentID,
    p.amount,
    p.paymentDate,
    p.paymentMethod,
    p.receiptNo,
    p.userID
FROM Payment p;
GO

CREATE OR ALTER VIEW ComplaintSummary AS
SELECT
    c.complaintID,
    c.complaintText,
    c.status,
    c.complaintDate,
    c.userID,
    c.meterID
FROM Complaint c;
GO