CREATE INDEX Meter_customerID ON Meter(customerID);
CREATE INDEX Meter_utilityTypeID ON Meter(utilityTypeID);
CREATE INDEX Reading_meterID ON Meter_Reading(meterID);
CREATE INDEX Bill_userID ON Bill(userID);
CREATE INDEX Payment_billID ON Payment(billID);
CREATE INDEX BillTariff_tariffID ON Bill_Tariff(tariffID);