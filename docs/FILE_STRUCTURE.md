# File Structure Documentation

## Complete Project Structure

```
IMR-utility-management-system/
├── .git/                           # Git version control
├── .gitignore                      # Git ignore rules
├── .idea/                          # IDE configuration files
├── README.md                       # Basic project information
├── package.json                    # Customer portal dependencies
├── package-lock.json               # Locked customer portal dependencies
│
├── backend/                        # Java Spring Boot backend
│   └── src/
│       └── main/
│           └── java/
│               └── coms/
│                   └── ums/
│                       ├── config/
│                       │   └── Test1.java          # Placeholder config
│                       ├── controller/
│                       │   └── Test2.java          # Placeholder controller
│                       ├── dto/
│                       │   └── Test3.java          # Placeholder DTO
│                       ├── exception/
│                       │   └── Test4.java          # Placeholder exception
│                       ├── model/
│                       │   └── Test5.java          # Placeholder model
│                       ├── repository/
│                       │   └── Test6.java          # Placeholder repository
│                       └── service/
│                           └── Test7.java          # Placeholder service
│
├── build/                          # Build output directory
│
├── database/                       # Database scripts and schemas
│   ├── backup/
│   │   ├── backup.sql             # Database backup
│   │   └── fullDBMS.sql           # Full database backup
│   ├── ddl/                       # Data Definition Language
│   │   ├── create_tables(new).sql # Main table creation script
│   │   ├── ddl.sql                # DDL statements
│   │   └── tables.sql             # Additional table definitions
│   ├── dml/                       # Data Manipulation Language
│   │   ├── dml.sql                # DML statements
│   │   ├── insert_data.sql        # Data insertion scripts
│   │   └── sample_data.sql        # Sample/test data
│   ├── functions/                 # SQL Server Functions
│   │   ├── fiunctions.sql         # (typo in original)
│   │   ├── Function1.sql          # TotalPaymentsByUser
│   │   ├── Function2.sql          # GetUtilityTypeName
│   │   ├── Function3.sql          # ComplaintCountByMeter
│   │   └── functions.sql          # Combined functions
│   ├── procedures/                # Stored Procedures
│   │   ├── proceduers.sql         # (typo in original)
│   │   ├── Procedure1.sql         # AddUtilityType
│   │   ├── Procedure2.sql         # AddComplaint
│   │   ├── Procedure3.sql         # UpdatePaymentMethod
│   │   └── procedures.sql         # Combined procedures
│   ├── triggers/                  # Database Triggers
│   │   ├── Trigger1.sql           # Individual trigger
│   │   ├── Trigger2.sql           # Individual trigger
│   │   ├── Trigger3.sql           # Individual trigger
│   │   └── triggers.sql           # Combined triggers file
│   ├── views/                     # Database Views
│   │   ├── View2.sql              # Individual view
│   │   ├── View3.sql              # Individual view
│   │   ├── Views1.sql             # Individual view
│   │   └── views.sql              # All views combined
│   ├── indexes.sql                # Database indexes
│   └── seeds/
│       └── seeds.sql              # Seed data
│
├── docs/                          # Documentation (this folder)
│   ├── PROJECT_OVERVIEW.md        # High-level project overview
│   ├── DATABASE_SCHEMA.md         # Database documentation
│   ├── CUSTOMER_PORTAL.md         # Customer frontend docs
│   ├── ADMIN_PORTAL.md            # Admin frontend docs
│   ├── BACKEND_API.md             # Backend API documentation
│   ├── FEATURES_AND_WORKFLOWS.md  # Feature workflows
│   └── FILE_STRUCTURE.md          # This file
│
├── frontend/                      # Frontend applications
│   ├── .gitignore                 # Frontend-specific git ignore
│   ├── package.json               # Admin portal dependencies
│   ├── package-lock.json          # Locked admin portal dependencies
│   ├── README.md                  # Frontend README
│   ├── node_modules/              # Admin portal dependencies
│   ├── build/                     # Admin portal build output
│   ├── public/                    # Admin portal public assets
│   │
│   └── frontend-admin-draft/      # Admin Portal (Vite)
│       ├── .gitignore
│       ├── eslint.config.js       # ESLint configuration
│       ├── index.html             # HTML entry point
│       ├── package.json           # Admin dependencies
│       ├── package-lock.json
│       ├── README.md
│       ├── vite.config.js         # Vite build configuration
│       ├── node_modules/          # Admin dependencies
│       ├── public/                # Public assets
│       └── src/
│           ├── main.jsx           # Admin entry point
│           ├── App.jsx            # Admin main routing
│           ├── index.css          # Global admin styles (18KB)
│           ├── assets/            # Static assets
│           ├── Components/        # Shared components
│           │   ├── AdminLayout.jsx    # Main admin layout
│           │   ├── Header.jsx         # Top navigation
│           │   └── Sidebar.jsx        # Left sidebar menu
│           └── Pages/
│               └── Admin/         # Admin page components
│                   ├── Dashboard.jsx          # Admin dashboard
│                   ├── Customers.jsx          # Customer list
│                   ├── AddEditCustomer.jsx   # Add/edit customer
│                   ├── PastPayments.jsx      # Payment history
│                   ├── Meters.jsx            # Meter list
│                   ├── RegisterMeter.jsx     # Register meter
│                   ├── AddMeterReading.jsx   # Add reading
│                   ├── Billing.jsx           # Bills list
│                   ├── AddEditBill.jsx       # Add/edit bill
│                   ├── Payments.jsx          # Payments list
│                   ├── RecordPayment.jsx     # Record payment
│                   ├── Tariffs.jsx           # Tariffs list
│                   ├── AddTariff.jsx         # Add tariff
│                   ├── Complaints.jsx        # Complaints queue
│                   └── Reports.jsx           # Reports page
│
├── node_modules/                  # Customer portal dependencies
│
├── public/                        # Customer portal public assets
│
└── src/                           # Customer Portal (Create React App)
    ├── index.js                   # Customer entry point
    ├── App.js                     # Customer main routing
    ├── App.css                    # Customer global styles
    ├── App.test.js                # App tests
    ├── setupTests.js              # Test configuration
    ├── reportWebVitals.js         # Performance monitoring
    ├── logo.svg                   # React logo
    ├── index.css                  # Root styles
    ├── data/                      # Static/mock data
    └── pages/                     # Customer page components
        ├── Landing.js             # Portal selection landing
        ├── CustomerLogin.js       # Customer login
        ├── Dashboard.js           # Customer dashboard
        ├── Dashboard.css          # Dashboard styles
        ├── BillsList.js           # Bills list page
        ├── BillDetails.js         # Bill details page
        ├── CustomerBills.js       # Bills component
        ├── CustomerBills.jsx      # Bills component (alternate)
        ├── CustomerPayments.jsx   # Payments page
        ├── CustomerComplaints.jsx # Complaints page
        ├── Profile.js             # User profile
        ├── CustomerProfile.js     # Customer profile
        ├── NotFound.js            # 404 page
        └── AdminLogin.jsx         # Admin login (misplaced)
```

---

## Key Directories Explained

### `/backend/`
**Purpose**: Java Spring Boot REST API
**Status**: Skeleton structure with placeholder files only
**Contents**: Empty package structure for MVC architecture
**Next Steps**: Implement actual controllers, services, repositories, and models

### `/database/`
**Purpose**: All database-related scripts
**Organization**:
- **ddl/**: Table schemas and structure
- **dml/**: Data manipulation and sample data
- **procedures/**: Stored procedures for business logic
- **functions/**: Reusable SQL functions
- **triggers/**: Automated data validation
- **views/**: Pre-joined data views
- **backup/**: Database backups
- **seeds/**: Initial seed data

### `/docs/`
**Purpose**: Comprehensive project documentation
**Contents**: Context documentation for future development sessions
**Files**:
- PROJECT_OVERVIEW.md - System overview and architecture
- DATABASE_SCHEMA.md - Complete database documentation
- CUSTOMER_PORTAL.md - Customer frontend documentation
- ADMIN_PORTAL.md - Admin frontend documentation
- BACKEND_API.md - Backend API specification
- FEATURES_AND_WORKFLOWS.md - Feature workflows
- FILE_STRUCTURE.md - This file

### `/frontend/frontend-admin-draft/`
**Purpose**: Admin portal built with Vite
**Tech Stack**: React 19.2, Vite 7.2, React Router 7.9
**Entry Point**: src/main.jsx
**Routing**: src/App.jsx
**Build**: `npm run dev` for development

### `/src/` (Root level)
**Purpose**: Customer portal built with Create React App
**Tech Stack**: React 19.2, React Router 6.30, CRA 5.0
**Entry Point**: index.js
**Routing**: App.js
**Build**: `npm start` for development

### `/public/`
**Purpose**: Static assets for customer portal
**Contents**: HTML template, images, icons, manifest

---

## Important Files

### Configuration Files

#### Root Level
- **package.json**: Customer portal dependencies (React 19.2.0)
- **.gitignore**: Git ignore patterns
- **README.md**: Basic project info (has merge conflict)

#### Admin Portal
- **frontend/frontend-admin-draft/package.json**: Admin dependencies
- **frontend/frontend-admin-draft/vite.config.js**: Vite configuration
- **frontend/frontend-admin-draft/eslint.config.js**: Linting rules

### Entry Points

#### Customer Portal
- **src/index.js**: ReactDOM render, wraps App in BrowserRouter
- **src/App.js**: Main routing component with Routes

#### Admin Portal
- **frontend/frontend-admin-draft/src/main.jsx**: ReactDOM render
- **frontend/frontend-admin-draft/src/App.jsx**: Admin routing

### Database Core Files
- **database/ddl/create_tables(new).sql**: Main database schema
- **database/views/views.sql**: All database views
- **database/triggers/triggers.sql**: All database triggers
- **database/procedures/**: Stored procedures (multiple files)
- **database/functions/**: SQL functions (multiple files)

---

## File Naming Conventions

### Frontend (React)
- **Components**: PascalCase with .jsx or .js extension
  - Examples: Dashboard.jsx, CustomerLogin.js
- **Styles**: PascalCase with .css extension matching component
  - Example: Dashboard.css

### Backend (Java)
- **Classes**: PascalCase with .java extension
  - Examples: UserController.java, MeterService.java
- **Packages**: lowercase
  - Examples: controller, service, model

### Database (SQL)
- **Files**: lowercase with underscores or PascalCase
  - Examples: create_tables(new).sql, Procedure1.sql
- **Objects**: PascalCase (tables) or snake_case (columns)
  - Tables: User, Meter_Reading
  - Views: get_UserInfo

---

## Build Artifacts

### Customer Portal
- **build/**: Production build output
- **node_modules/**: Installed dependencies

### Admin Portal
- **frontend/frontend-admin-draft/dist/**: Vite build output (after build)
- **frontend/frontend-admin-draft/node_modules/**: Dependencies

---

## Source Control

### Tracked Files
- All source code (.js, .jsx, .java, .sql)
- Configuration files
- Documentation
- Package manifests (package.json)

### Ignored Files (.gitignore)
- node_modules/
- build/
- .DS_Store
- IDE-specific files (.idea/)
- Environment variables (.env)
- Compiled code

---

## Development Workflow Files

### Customer Portal Scripts (package.json)
```json
{
  "start": "react-scripts start",      // Dev server
  "build": "react-scripts build",      // Production build
  "test": "react-scripts test",        // Run tests
  "eject": "react-scripts eject"       // Eject CRA config
}
```

### Admin Portal Scripts (frontend-admin-draft/package.json)
```json
{
  "dev": "vite",                       // Dev server
  "build": "vite build",               // Production build
  "lint": "eslint .",                  // Run linter
  "preview": "vite preview"            // Preview build
}
```

---

## File Size Notes

### Large Files
- **frontend/frontend-admin-draft/src/index.css**: 18,709 bytes
  - Comprehensive styling for entire admin portal
  - Includes all component styles, utilities, and layout classes

### Small/Placeholder Files
- All backend Java files (Test1-Test7.java): Minimal placeholders
- Some database files: Single line or minimal content

---

## File Dependencies

### Customer Portal Dependencies
```
src/App.js
├── src/pages/Landing.js
├── src/pages/CustomerLogin.js
├── src/pages/Dashboard.js
│   ├── src/pages/Dashboard.css
│   ├── src/pages/CustomerPayments.jsx
│   ├── src/pages/CustomerComplaints.jsx
│   ├── src/pages/Profile.js
│   └── src/pages/CustomerBills.js
├── src/pages/BillsList.js
├── src/pages/BillDetails.js
└── src/pages/NotFound.js
```

### Admin Portal Dependencies
```
frontend-admin-draft/src/App.jsx
├── Components/AdminLayout.jsx
│   ├── Components/Header.jsx
│   └── Components/Sidebar.jsx
└── Pages/Admin/
    ├── Dashboard.jsx
    ├── Customers.jsx
    ├── AddEditCustomer.jsx
    ├── (... all other admin pages)
    └── Reports.jsx
```

---

## Database Script Execution Order

1. **DDL - Create Tables**:
   - database/ddl/create_tables(new).sql
   - database/ddl/tables.sql

2. **Views**:
   - database/views/views.sql

3. **Functions**:
   - database/functions/Function1.sql
   - database/functions/Function2.sql
   - database/functions/Function3.sql

4. **Procedures**:
   - database/procedures/Procedure1.sql
   - database/procedures/Procedure2.sql
   - database/procedures/Procedure3.sql

5. **Triggers**:
   - database/triggers/triggers.sql

6. **Sample Data** (optional):
   - database/dml/sample_data.sql

7. **Indexes**:
   - database/indexes.sql

---

## Notes on File Organization

### Duplicate/Alternate Files
- **src/pages/CustomerBills.js** and **src/pages/CustomerBills.jsx**: Two implementations
- Multiple procedure/function/trigger files: Both individual and combined versions

### Misplaced Files
- **src/pages/AdminLogin.jsx**: Should be in admin portal, not customer portal

### Empty/Minimal Files
- **database/procedures/procedures.sql**: Nearly empty
- **database/functions/functions.sql**: Nearly empty
- All backend Test*.java files: Placeholders only

### File Naming Typos
- **database/functions/fiunctions.sql**: Typo in filename
- **database/procedures/proceduers.sql**: Typo in filename

---

## Recommended Cleanup Tasks

1. Remove duplicate CustomerBills files
2. Move AdminLogin.jsx to admin portal
3. Consolidate database script files (remove empty versions)
4. Fix filename typos in database folder
5. Remove or implement backend placeholder files
6. Resolve README.md merge conflict
