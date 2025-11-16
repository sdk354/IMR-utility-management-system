CREATE PROCEDURE AddUtilityType
    @typeName VARCHAR(100),
    @unit VARCHAR(20),
    @description VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Utility_Type (utilityName, unit, description)
    VALUES (@typeName, @unit, @description);
END;
GO