CREATE TABLE EmployeeTypes (
    TypeID INT NOT NULL PRIMARY KEY,
    TypeName NVARCHAR(100) NULL
);

CREATE TABLE Departments (
    DepartmentID INT NOT NULL PRIMARY KEY,
    DepartmentName NVARCHAR(100) NULL,
    Description NVARCHAR(MAX) NULL,
    ActiveFrom DATE NULL,
    ActiveTo DATE NULL
);

CREATE TABLE Employees (
    EmployeeID INT NOT NULL PRIMARY KEY,
    FirstName NVARCHAR(50) NULL,
    LastName NVARCHAR(50) NULL,
    DepartmentID INT NULL,
    Position NVARCHAR(100) NULL,
    Email NVARCHAR(100) NULL,
    PhoneNumber NVARCHAR(15) NULL,
    TypeID INT NULL,
    DayOfBirth DATETIME NOT NULL,
    Address NVARCHAR(MAX) NOT NULL,
    CONSTRAINT FK_Employees_Departments FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

CREATE TABLE EmploymentContracts (
    ContractID INT NOT NULL PRIMARY KEY,
    EmployeeID INT NULL,
    ContractType NVARCHAR(50) NULL,
    StartDate DATE NULL,
    EndDate DATE NULL,
    CONSTRAINT FK_EmploymentContracts_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Salaries (
    EmployeeID INT NOT NULL PRIMARY KEY,
    Salary DECIMAL(10, 2) NULL,
    Bonus DECIMAL(10, 2) NULL,
    PaymentDate DATE NOT NULL,
    CONSTRAINT FK_Salaries_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE PerformanceKPIs (
    KPIID INT NOT NULL PRIMARY KEY,
    EmployeeID INT NULL,
    KPIValue DECIMAL(10, 2) NULL,
    KPIMonth DATE NULL,
    CONSTRAINT FK_PerformanceKPIs_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Projects (
    ProjectId INT NOT NULL PRIMARY KEY,
    ProjectName NVARCHAR(255) NULL,
    StartDate DATE NULL,
    EndDate DATE NULL,
    Status NVARCHAR(50) NULL,
    ManagerID INT NULL
);

CREATE TABLE TimeTracking (
    EntryID INT NOT NULL PRIMARY KEY,
    EmployeeID INT NULL,
    Date DATE NULL,
    HoursWorked DECIMAL(5, 2) NULL,
    CONSTRAINT FK_TimeTracking_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Clients (
    ClientID INT NOT NULL PRIMARY KEY,
    CompanyName NVARCHAR(255) NULL,
    ContactName NVARCHAR(100) NULL,
    ContactEmail NVARCHAR(100) NULL,
    PhoneNumber NVARCHAR(15) NULL
);

CREATE TABLE ProjectDetails (
    DetailsId INT NOT NULL PRIMARY KEY,
    ClientID INT NULL,
    DetailedDescription NVARCHAR(MAX) NULL,
    EstimatedBudget DECIMAL(10, 2) NULL,
    ActualBudget DECIMAL(10, 2) NULL,
    ProjectId INT NOT NULL,
    SRS NVARCHAR(MAX) NOT NULL,
    CONSTRAINT FK_ProjectDetails_Clients FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    CONSTRAINT FK_ProjectDetails_Projects FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId)
);

CREATE TABLE employee_project (
    ProjectId INT NOT NULL,
    EmployeeId INT NOT NULL,
    CONSTRAINT FK_employee_project_Projects FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
    CONSTRAINT FK_employee_project_Employees FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Insurances (
    InsuranceCode INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    EmployeeID INT NOT NULL,
    Type NVARCHAR(255) NOT NULL,
    Status INT NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    Created_at DATETIME NOT NULL DEFAULT GETDATE(),
    Updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    CoverageAmount DECIMAL(8, 2) NOT NULL,
    CONSTRAINT FK_Insurances_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Leaves (
    LeaveId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    EmployeeID INT NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    Reason NVARCHAR(255) NOT NULL,
    Status INT NOT NULL,
    Created_at DATETIME NOT NULL DEFAULT GETDATE(),
    Updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Leaves_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE LeaveBalances (
    EmployeeId INT NOT NULL PRIMARY KEY,
    TotalLeaveDays INT NOT NULL,
    UsedLeaveDays INT NOT NULL,
    RemainingLeaveDays AS (TotalLeaveDays - UsedLeaveDays) PERSISTED,
    Updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_LeaveBalances_Employees FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Users (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    Email NVARCHAR(191) NOT NULL,
    PassWord NVARCHAR(255) NOT NULL,
    Created_at DATETIME NOT NULL DEFAULT GETDATE(),
    Updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    Role INT NOT NULL,
    CONSTRAINT FK_Users_Employees FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeID)
);
 --drop table Users