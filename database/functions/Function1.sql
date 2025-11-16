CREATE FUNCTION TotalPaymentsByUser (@userID INT)
RETURNS DECIMAL(12,2)
AS
BEGIN
    DECLARE @total DECIMAL(12,2);
    SELECT @total = SUM(amount) FROM Payment WHERE userID = @userID;
    RETURN ISNULL(@total, 0);
END;
GO
