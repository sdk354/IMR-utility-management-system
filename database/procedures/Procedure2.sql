CREATE PROCEDURE AddComplaint
    @userID INT,
    @meterID INT,
    @complaintText VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Complaint (userID, meterID, complaintText)
    VALUES (@userID, @meterID, @complaintText);
END;
GO
