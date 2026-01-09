CREATE DATABASE UtilityDB;
CREATE TABLE Utility_Type (
    utilityTypeID INT IDENTITY(1,1) PRIMARY KEY,
    utilityName VARCHAR(100) NOT NULL UNIQUE,
    unit VARCHAR(20),
    description VARCHAR(MAX)
);

CREATE TABLE Role (
    roleID INT IDENTITY(1,1) PRIMARY KEY,
    roleName VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(MAX)
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
