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






