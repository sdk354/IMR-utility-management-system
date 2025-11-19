CREATE TRIGGER NoDeleteUtilityType
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
