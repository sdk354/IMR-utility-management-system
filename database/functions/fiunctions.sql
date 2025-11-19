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



