-- Each trigger should be run separately, without GO, if not using SSMS or sqlcmd.

CREATE OR ALTER TRIGGER NoDeleteUtilityType
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

CREATE OR ALTER TRIGGER ComplaintMeterStatus
ON Complaint
AFTER INSERT
AS
BEGIN
UPDATE Meter
SET status = 'Under Review'
WHERE meterID IN (SELECT meterID FROM inserted WHERE meterID IS NOT NULL);
END;
GO

CREATE OR ALTER TRIGGER MeterReading_Validate
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

CREATE OR ALTER TRIGGER BillTariff_NoDuplicate
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

CREATE OR ALTER TRIGGER AutoReceiptNo
ON Payment
AFTER INSERT
AS
BEGIN
UPDATE Payment
SET receiptNo = 'RCPT-' + CAST(paymentID AS VARCHAR(20))
WHERE paymentID IN (SELECT paymentID FROM inserted);
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
