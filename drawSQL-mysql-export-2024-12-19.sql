CREATE TABLE EmployeeTypes (
    TypeID INT NOT NULL PRIMARY KEY,
    TypeName NVARCHAR(100) NULL
);

CREATE TABLE Departments (
    DepartmentID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
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

INSERT INTO Departments (DepartmentName, Description, ActiveFrom, ActiveTo)
VALUES
('IT Department', 'Handles all IT-related tasks', '2020-01-01', '2025-01-01'),
('HR Department', 'Handles human resources and employee welfare', '2020-01-01', '2025-01-01'),
('Marketing Department', 'Handles marketing and client relations', '2020-01-01', '2025-01-01');

SET IDENTITY_INSERT EmployeeTypes ON;
INSERT INTO EmployeeTypes (TypeID, TypeName)
VALUES
(1, 'Full-Time'),
(2, 'Part-Time'),
(3, 'Intern'),
(4, 'Contract');
SET IDENTITY_INSERT EmployeeTypes OFF;


SET IDENTITY_INSERT Employees ON;

INSERT INTO Employees (EmployeeID, FirstName, LastName, DepartmentID, Position, Email, PhoneNumber, TypeID, DayOfBirth, Address)
VALUES
(1, 'Nguyen', 'Anh Tu', 1, 'Software Engineer', 'tu.nguyen@example.com', '0912345678', 1, '1990-01-01', 'Hanoi, Vietnam'),
(2, 'Tran', 'Thi Lan', 2, 'Project Manager', 'lan.tran@example.com', '0912345679', 2, '1985-03-15', 'Hanoi, Vietnam'),
(3, 'Le', 'Hoang Nam', 3, 'Designer', 'nam.le@example.com', '0912345680', 3, '1992-06-20', 'Hanoi, Vietnam'),
(4, 'Pham', 'Ngoc Mai', 1, 'HR Specialist', 'mai.pham@example.com', '0912345681', 1, '1988-11-10', 'Hanoi, Vietnam'),
(5, 'Vu', 'Minh Tu', 2, 'Marketing Manager', 'tu.vu@example.com', '0912345682', 2, '1991-09-30', 'Hanoi, Vietnam'),
(6, 'Hoang', 'Thi Lan', 1, 'QA Engineer', 'lan.hoang@example.com', '0912345683', 1, '1987-12-05', 'Hanoi, Vietnam'),
(7, 'Phan', 'Hong Anh', 3, 'Product Owner', 'anh.phan@example.com', '0912345684', 3, '1990-04-18', 'Hanoi, Vietnam'),
(8, 'Bui', 'Quoc Hieu', 2, 'Data Analyst', 'hieu.bui@example.com', '0912345685', 2, '1986-07-25', 'Hanoi, Vietnam'),
(9, 'Nguyen', 'Thi Lan', 1, 'Customer Support', 'lan.nguyen@example.com', '0912345686', 1, '1993-05-30', 'Hanoi, Vietnam'),
(10, 'Dang', 'Minh Tam', 3, 'Business Analyst', 'tam.dang@example.com', '0912345687', 3, '1995-02-22', 'Hanoi, Vietnam');

SET IDENTITY_INSERT Employees OFF;

SET IDENTITY_INSERT Projects ON;
INSERT INTO Projects (ProjectId, ProjectName, StartDate, EndDate, Status, ManagerID)
VALUES
(1, 'Employee Management System', '2023-01-01', '2023-06-30', 'Completed', 2),
(2, 'Customer Relationship Management', '2023-03-15', '2023-10-15', 'Ongoing', 7),
(3, 'E-Commerce Platform', '2022-11-01', '2023-05-31', 'Completed', 5),
(4, 'Mobile App Development', '2024-01-01', '2024-12-31', 'Planning', 8),
(5, 'Data Analytics Dashboard', '2023-05-01', '2023-12-31', 'Ongoing', 8),
(6, 'Website Redesign', '2023-09-01', '2024-02-28', 'Ongoing', 3),
(7, 'HR Automation System', '2023-06-01', '2023-12-15', 'Completed', 4),
(8, 'Marketing Campaign Tool', '2023-07-01', '2024-01-31', 'Ongoing', 5),
(9, 'Cloud Migration Project', '2022-12-01', '2023-12-01', 'Completed', 2),
(10, 'Cybersecurity Implementation', '2023-10-01', '2024-03-31', 'Ongoing', 6);
SET IDENTITY_INSERT Projects OFF;

-- Bật chế độ IDENTITY_INSERT cho bảng Clients
SET IDENTITY_INSERT Clients ON;

-- Bật chế độ IDENTITY_INSERT cho bảng Clients
SET IDENTITY_INSERT Clients ON;

-- Chèn dữ liệu vào bảng Clients
INSERT INTO Clients (ClientID, CompanyName, ContactName, ContactEmail, PhoneNumber)
VALUES
(1, 'Tech Solutions', 'John Doe', 'john.doe@techsol.com', '123-456-7890'),
(2, 'Global Enterprises', 'Jane Smith', 'jane.smith@globent.com', '234-567-8901'),
(3, 'Innovative Designs', 'Michael Lee', 'michael.lee@innodesign.com', '345-678-9012'),
(4, 'Marketing Pros', 'Emily Clark', 'emily.clark@marketpros.com', '456-789-0123'),
(5, 'Creative Solutions', 'Chris Johnson', 'chris.johnson@creativesol.com', '567-890-1234'),
(6, 'IT Services Inc.', 'David Brown', 'david.brown@itservices.com', '678-901-2345'),
(7, 'Business Consulting', 'Sarah Davis', 'sarah.davis@bizconsult.com', '789-012-3456'),
(8, 'Digital Strategies', 'Kevin Moore', 'kevin.moore@digitalstrat.com', '890-123-4567'),
(9, 'Financial Experts', 'Laura Wilson', 'laura.wilson@finexperts.com', '901-234-5678'),
(10, 'Engineering Solutions', 'James Taylor', 'james.taylor@engsolutions.com', '012-345-6789');

-- Tắt chế độ IDENTITY_INSERT cho bảng Clients
SET IDENTITY_INSERT Clients OFF;


-- Bật chế độ IDENTITY_INSERT cho bảng ProjectDetails
SET IDENTITY_INSERT ProjectDetails ON;

-- Chèn dữ liệu vào bảng ProjectDetails
INSERT INTO ProjectDetails (DetailsId, ClientID, DetailedDescription, EstimatedBudget, ActualBudget, ProjectId, SRS)
VALUES
(1, 1, 'This project focuses on managing employee records...', 100000.00, 95000.00, 1, 'System Requirements Specification for Employee Management System'),
(2, 2, 'This project involves developing a customer relationship...', 200000.00, 190000.00, 2, 'System Requirements Specification for CRM System'),
(3, 3, 'An e-commerce platform that supports product listings...', 300000.00, 280000.00, 3, 'System Requirements Specification for E-Commerce Platform'),
(4, 4, 'The project involves designing and developing a mobile app...', 150000.00, 140000.00, 4, 'System Requirements Specification for Mobile App Development'),
(5, 5, 'Creating an interactive dashboard for visualizing data...', 120000.00, 110000.00, 5, 'System Requirements Specification for Data Analytics Dashboard'),
(6, 6, 'Website redesign project with a focus on UX...', 100000.00, 95000.00, 6, 'System Requirements Specification for Website Redesign'),
(7, 7, 'Automating HR tasks including payroll and employee management...', 130000.00, 125000.00, 7, 'System Requirements Specification for HR Automation System'),
(8, 8, 'Marketing campaign tool for tracking social media campaigns...', 80000.00, 75000.00, 8, 'System Requirements Specification for Marketing Campaign Tool'),
(9, 9, 'Migrating data and services to the cloud...', 250000.00, 240000.00, 9, 'System Requirements Specification for Cloud Migration Project'),
(10, 10, 'Implementing cybersecurity infrastructure...', 350000.00, 330000.00, 10, 'System Requirements Specification for Cybersecurity Implementation');

-- Tắt chế độ IDENTITY_INSERT cho bảng ProjectDetails
SET IDENTITY_INSERT ProjectDetails OFF;




INSERT INTO employee_project (ProjectId, EmployeeId)
VALUES
(1, 1),
(1, 4),
(2, 7),
(2, 8),
(3, 5),
(3, 7),
(4, 8),
(5, 8),
(6, 3),
(7, 2);


-- Bảng Insurances

INSERT INTO Insurances (EmployeeID, Type, Status, StartDate, EndDate, CoverageAmount, Created_at, Updated_at)
VALUES
(1, 'Health', 1, '2023-01-01', '2025-01-01', 50000.00, GETDATE(), GETDATE()),
(2, 'Life', 1, '2023-03-01', '2025-03-01', 100000.00, GETDATE(), GETDATE()),
(3, 'Dental', 1, '2023-06-01', '2025-06-01', 30000.00, GETDATE(), GETDATE()),
(4, 'Health', 1, '2023-09-01', '2025-09-01', 45000.00, GETDATE(), GETDATE()),
(5, 'Health', 1, '2023-02-01', '2025-02-01', 50000.00, GETDATE(), GETDATE()),
(6, 'Life', 1, '2023-04-01', '2025-04-01', 120000.00, GETDATE(), GETDATE()),
(7, 'Health', 1, '2023-07-01', '2025-07-01', 55000.00, GETDATE(), GETDATE()),
(8, 'Dental', 1, '2023-05-01', '2025-05-01', 35000.00, GETDATE(), GETDATE()),
(9, 'Health', 1, '2023-08-01', '2025-08-01', 50000.00, GETDATE(), GETDATE()),
(10, 'Life', 1, '2023-10-01', '2025-10-01', 150000.00, GETDATE(), GETDATE());



-- Bảng Leaves
INSERT INTO Leaves (EmployeeID, StartDate, EndDate, Reason, Status, Created_at, Updated_at)
VALUES
(1, '2023-05-01', '2023-05-05', 'Vacation', 1, GETDATE(), GETDATE()),
(2, '2023-06-15', '2023-06-18', 'Sick Leave', 1, GETDATE(), GETDATE()),
(3, '2023-08-01', '2023-08-03', 'Personal', 1, GETDATE(), GETDATE()),
(4, '2023-09-01', '2023-09-04', 'Vacation', 1, GETDATE(), GETDATE()),
(5, '2023-10-10', '2023-10-15', 'Medical', 1, GETDATE(), GETDATE()),
(6, '2023-12-01', '2023-12-03', 'Sick Leave', 1, GETDATE(), GETDATE()),
(7, '2023-07-20', '2023-07-22', 'Family Emergency', 1, GETDATE(), GETDATE()),
(8, '2023-11-01', '2023-11-05', 'Vacation', 1, GETDATE(), GETDATE()),
(9, '2023-12-10', '2023-12-15', 'Medical', 1, GETDATE(), GETDATE()),
(10, '2023-11-15', '2023-11-18', 'Sick Leave', 1, GETDATE(), GETDATE());


-- Bảng LeaveBalances

INSERT INTO LeaveBalances (EmployeeId, TotalLeaveDays, UsedLeaveDays, UpdatedAt)
VALUES
(1, 20, 5, GETDATE()),
(2, 20, 7, GETDATE()),
(3, 20, 3, GETDATE()),
(4, 20, 4, GETDATE()),
(5, 20, 6, GETDATE()),
(6, 20, 2, GETDATE()),
(7, 20, 1, GETDATE()),
(8, 20, 8, GETDATE()),
(9, 20, 5, GETDATE()),
(10, 20, 9, GETDATE());


INSERT INTO Users (EmployeeId, Email, PassWord, Role, Created_at, Updated_at)
VALUES
(1, 'tu.nguyen@example.com', 'password1', 1, GETDATE(), GETDATE()),
(2, 'lan.tran@example.com', 'password2', 2, GETDATE(), GETDATE()),
(3, 'nam.le@example.com', 'password3', 3, GETDATE(), GETDATE()),
(4, 'mai.pham@example.com', 'password4', 4, GETDATE(), GETDATE()),
(5, 'tu.vu@example.com', 'password5', 2, GETDATE(), GETDATE()),
(6, 'lan.hoang@example.com', 'password6', 3, GETDATE(), GETDATE()),
(7, 'anh.phan@example.com', 'password7', 1, GETDATE(), GETDATE()),
(8, 'hieu.bui@example.com', 'password8', 3, GETDATE(), GETDATE()),
(9, 'lan.nguyen@example.com', 'password9', 4, GETDATE(), GETDATE()),
(10, 'tam.dang@example.com', 'password10', 2, GETDATE(), GETDATE());


-- Bật IDENTITY_INSERT cho bảng EmploymentContracts
SET IDENTITY_INSERT EmploymentContracts ON;

-- Chèn dữ liệu vào bảng EmploymentContracts
INSERT INTO EmploymentContracts (ContractID, EmployeeID, ContractType, StartDate, EndDate)
VALUES
(1, 1, 'Permanent', '2020-01-01', '2025-01-01'),
(2, 2, 'Permanent', '2020-03-01', '2025-03-01'),
(3, 3, 'Internship', '2023-06-01', '2024-06-01'),
(4, 4, 'Contract', '2023-01-01', '2023-12-31'),
(5, 5, 'Permanent', '2020-05-01', '2025-05-01'),
(6, 6, 'Permanent', '2021-04-01', '2026-04-01'),
(7, 7, 'Permanent', '2020-07-01', '2025-07-01'),
(8, 8, 'Contract', '2023-01-01', '2023-12-31'),
(9, 9, 'Permanent', '2022-05-01', '2027-05-01'),
(10, 10, 'Internship', '2023-09-01', '2024-09-01');

-- Tắt IDENTITY_INSERT cho bảng EmploymentContracts
SET IDENTITY_INSERT EmploymentContracts OFF;

-- Bật IDENTITY_INSERT cho bảng Salaries
SET IDENTITY_INSERT Salaries ON;

-- Chèn dữ liệu vào bảng Salaries
INSERT INTO Salaries (EmployeeID, Salary, Bonus, PaymentDate)
VALUES
(1, 50000.00, 5000.00, '2023-12-31'),
(2, 60000.00, 6000.00, '2023-12-31'),
(3, 30000.00, 3000.00, '2023-12-31'),
(4, 45000.00, 4500.00, '2023-12-31'),
(5, 55000.00, 5500.00, '2023-12-31'),
(6, 50000.00, 5000.00, '2023-12-31'),
(7, 52000.00, 5200.00, '2023-12-31'),
(8, 47000.00, 4700.00, '2023-12-31'),
(9, 48000.00, 4800.00, '2023-12-31'),
(10, 32000.00, 3200.00, '2023-12-31');

-- Tắt IDENTITY_INSERT cho bảng Salaries
SET IDENTITY_INSERT Salaries OFF;

-- Bật IDENTITY_INSERT cho bảng PerformanceKPIs
SET IDENTITY_INSERT PerformanceKPIs ON;

-- Chèn dữ liệu vào bảng PerformanceKPIs
INSERT INTO PerformanceKPIs (KPIID, EmployeeID, KPIValue, KPIMonth)
VALUES
(1, 1, 90.5, '2023-12-01'),
(2, 2, 88.2, '2023-12-01'),
(3, 3, 75.3, '2023-12-01'),
(4, 4, 85.4, '2023-12-01'),
(5, 5, 92.1, '2023-12-01'),
(6, 6, 89.7, '2023-12-01'),
(7, 7, 80.5, '2023-12-01'),
(8, 8, 87.4, '2023-12-01'),
(9, 9, 78.8, '2023-12-01'),
(10, 10, 83.2, '2023-12-01');

-- Tắt IDENTITY_INSERT cho bảng PerformanceKPIs
SET IDENTITY_INSERT PerformanceKPIs OFF;
ALTER TABLE Salaries
ALTER COLUMN EmployeeID1 INT NULL;


-- Bật IDENTITY_INSERT cho bảng TimeTracking
SET IDENTITY_INSERT TimeTracking ON;

-- Chèn dữ liệu vào bảng TimeTracking
INSERT INTO TimeTracking (EntryID, EmployeeID, Date, HoursWorked)
VALUES
(1, 1, '2023-12-01', 8.0),
(2, 2, '2023-12-01', 7.5),
(3, 3, '2023-12-01', 6.5),
(4, 4, '2023-12-01', 8.0),
(5, 5, '2023-12-01', 7.0),
(6, 6, '2023-12-01', 8.0),
(7, 7, '2023-12-01', 8.0),
(8, 8, '2023-12-01', 7.5),
(9, 9, '2023-12-01', 6.0),
(10, 10, '2023-12-01', 8.0);

-- Tắt IDENTITY_INSERT cho bảng TimeTracking
SET IDENTITY_INSERT TimeTracking OFF;


-- Bảng employee_project
INSERT INTO employee_project (ProjectId, EmployeeId)
VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 7),
(5, 8),
(6, 9),
(6, 10);
