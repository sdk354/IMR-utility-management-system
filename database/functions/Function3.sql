CREATE FUNCTION ComplaintCountByMeter (@meterID INT)
RETURNS INT
AS
BEGIN
    DECLARE @cnt INT;
    SELECT @cnt = COUNT(*) FROM Complaint WHERE meterID = @meterID;
    RETURN ISNULL(@cnt, 0);
END;
GO
