CREATE TRIGGER AutoReceiptNo
ON Payment
AFTER INSERT
AS
BEGIN
    UPDATE Payment
    SET receiptNo = 'RCPT-' + CAST(paymentID AS VARCHAR(20))
    WHERE paymentID IN (SELECT paymentID FROM inserted);
END;
GO
