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
