CREATE VIEW MeterDetails AS
SELECT 
    m.meterID,
    m.serialNumber,
    m.status,
    u.utilityName AS UtilityType,
    m.installationDate
FROM Meter m
JOIN Utility_Type u ON m.utilityTypeID = u.utilityTypeID;
GO
