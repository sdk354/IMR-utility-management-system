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

