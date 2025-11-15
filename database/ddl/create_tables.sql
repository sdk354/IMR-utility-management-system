CREATE TABLE Utility_Type (
    UtilityTypeID INT PRIMARY KEY IDENTITY(1,1),
    TypeName VARCHAR(100) NOT NULL UNIQUE,
    Description VARCHAR(MAX)
);

CREATE TABLE [Role] (
    RoleID INT PRIMARY KEY IDENTITY(1,1),
    RoleName VARCHAR(50) NOT NULL UNIQUE,
    Description VARCHAR(MAX)
);

CREATE TABLE Meter (
    MeterID INT PRIMARY KEY IDENTITY(1,1),
    SerialNumber VARCHAR(100) NOT NULL UNIQUE,
    UtilityTypeID INT NOT NULL REFERENCES Utility_Type(UtilityTypeID),
    InstallationDate DATE,
    Status VARCHAR(50) DEFAULT 'Active'
);

CREATE TABLE Complaint (
    ComplaintID INT PRIMARY KEY IDENTITY(1,1),
    MeterID INT NOT NULL REFERENCES Meter(MeterID),
    ComplaintText VARCHAR(MAX) NOT NULL,
    ComplaintDate DATETIME2 DEFAULT SYSUTCDATETIME(),
    Status VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY IDENTITY(1,1),
    MeterID INT NOT NULL REFERENCES Meter(MeterID),
    Amount DECIMAL(12,2) NOT NULL,
    PaymentDate DATETIME2 DEFAULT SYSUTCDATETIME(),
    Method VARCHAR(50),
    ReferenceNo VARCHAR(100)
);
