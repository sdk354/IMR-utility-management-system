CREATE FUNCTION GetUtilityTypeName (@utilityTypeID INT)
RETURNS VARCHAR(100)
AS
BEGIN
    DECLARE @name VARCHAR(100);
    SELECT @name = utilityName FROM Utility_Type WHERE utilityTypeID = @utilityTypeID;
    RETURN @name;
END;
GO.