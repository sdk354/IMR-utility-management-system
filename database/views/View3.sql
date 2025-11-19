CREATE VIEW ComplaintSummary AS
SELECT
    c.complaintID,
    c.complaintText,
    c.status,
    c.complaintDate,
    c.userID,
    c.meterID
FROM Complaint c;
GO
