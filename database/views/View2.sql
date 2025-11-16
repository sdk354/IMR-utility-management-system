CREATE VIEW UserPayments AS
SELECT
    p.paymentID,
    p.amount,
    p.paymentDate,
    p.paymentMethod,
    p.receiptNo,
    p.userID
FROM Payment p;
GO
