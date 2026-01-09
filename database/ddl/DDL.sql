CREATE TABLE Role (
    roleID INT IDENTITY(1,1) PRIMARY KEY,
    roleName VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(MAX)
);

CREATE TABLE Utility_Type (
    utilityTypeID INT IDENTITY(1,1) PRIMARY KEY,
    utilityName VARCHAR(100) NOT NULL UNIQUE,
    unit VARCHAR(20),
    description VARCHAR(MAX)
);

CREATE TABLE [User] (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    contactNo VARCHAR(20),
    street VARCHAR(100),
    streetNo VARCHAR(10),
    city VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    roleID INT NOT NULL,
    CONSTRAINT FK_User_Role FOREIGN KEY (roleID) REFERENCES Role(roleID)
);

CREATE TABLE Meter (
    meterID INT IDENTITY(1,1) PRIMARY KEY,
    serialNumber VARCHAR(100) NOT NULL UNIQUE,
    utilityTypeID INT NOT NULL,
    customerID INT NULL,
    installationDate DATE,
    status VARCHAR(50) DEFAULT 'Active',
    CONSTRAINT FK_Meter_UtilityType FOREIGN KEY (utilityTypeID) REFERENCES Utility_Type(utilityTypeID),
    CONSTRAINT FK_Meter_User FOREIGN KEY (customerID) REFERENCES [User](userID)
);

CREATE TABLE Tariff (
    tariffID INT IDENTITY(1,1) PRIMARY KEY,
    rate DECIMAL(10,4),
    effectiveFrom DATE,
    effectiveTo DATE,
    slabFrom DECIMAL(18,4),
    slabTo DECIMAL(18,4),
    fixedCharge DECIMAL(10,2),
    subsidiaryPercentage DECIMAL(5,2),
    utilityTypeID INT NOT NULL,
    CONSTRAINT FK_Tariff_UtilityType FOREIGN KEY (utilityTypeID) REFERENCES Utility_Type(utilityTypeID)
);

CREATE TABLE Bill (
    billID INT IDENTITY(1,1) PRIMARY KEY,
    totalAmount DECIMAL(12,2) NOT NULL,
    totalConsumption DECIMAL(18,4),
    billingPeriodStart DATE,
    billingPeriodEnd DATE,
    billDate DATE DEFAULT CAST(GETDATE() AS DATE),
    status VARCHAR(50) DEFAULT 'Unpaid',
    dueDate DATE,
    userID INT NOT NULL,
    CONSTRAINT FK_Bill_User FOREIGN KEY (userID) REFERENCES [User](userID)
);

CREATE TABLE Bill_Tariff (
    billTariffID INT IDENTITY(1,1) PRIMARY KEY,
    billID INT NOT NULL,
    tariffID INT NOT NULL,
    CONSTRAINT FK_BillTariff_Bill FOREIGN KEY (billID) REFERENCES Bill(billID),
    CONSTRAINT FK_BillTariff_Tariff FOREIGN KEY (tariffID) REFERENCES Tariff(tariffID)
);

CREATE TABLE Meter_Reading (
    readingID INT IDENTITY(1,1) PRIMARY KEY,
    readingValue DECIMAL(18,4) NOT NULL,
    readingDate DATETIME2 NOT NULL,
    remarks VARCHAR(255),
    userID INT NULL,
    meterID INT NOT NULL,
    CONSTRAINT FK_Reading_User FOREIGN KEY (userID) REFERENCES [User](userID),
    CONSTRAINT FK_Reading_Meter FOREIGN KEY (meterID) REFERENCES Meter(meterID)
);

CREATE TABLE Complaint (
    complaintID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT NOT NULL,
    meterID INT NULL,
    complaintText VARCHAR(MAX) NOT NULL,
    complaintDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    status VARCHAR(50) DEFAULT 'Pending',
    CONSTRAINT FK_Complaint_User FOREIGN KEY (userID) REFERENCES [User](userID),
    CONSTRAINT FK_Complaint_Meter FOREIGN KEY (meterID) REFERENCES Meter(meterID)
);

CREATE TABLE Payment (
    paymentID INT IDENTITY(1,1) PRIMARY KEY,
    billID INT NOT NULL,
    userID INT NULL,
    amount DECIMAL(12,2) NOT NULL,
    paymentDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    paymentMethod VARCHAR(50),
    receiptNo VARCHAR(100),
    CONSTRAINT FK_Payment_Bill FOREIGN KEY (billID) REFERENCES Bill(billID),
    CONSTRAINT FK_Payment_User FOREIGN KEY (userID) REFERENCES [User](userID)
);

ALTER TABLE [User] ALTER COLUMN contactNo VARCHAR(15);
ALTER TABLE [User] ALTER COLUMN streetNo VARCHAR(20);
ALTER TABLE Bill ADD lateFee DECIMAL(12,2) DEFAULT 0;