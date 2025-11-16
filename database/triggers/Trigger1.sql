CREATE TRIGGER ComplaintMeterStatus
ON Complaint
AFTER INSERT
AS
BEGIN
    UPDATE Meter
    SET status = 'Under Review'
    WHERE meterID IN (SELECT meterID FROM inserted WHERE meterID IS NOT NULL);
END;
GO

