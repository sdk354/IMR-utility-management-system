# IMR Utility Management System - Project Overview

## Project Information
- **Name**: IMR Utility Management System
- **Type**: Full-stack web application for utility billing and management
- **Database**: Microsoft SQL Server
- **Frontend**: React (Multiple portals)
- **Backend**: Java Spring Boot (Planned/Skeleton structure)

## Purpose
This system is designed to manage utility services (electricity, water, etc.) for utility companies. It handles customer management, meter readings, billing, payments, tariff management, and complaint handling.

## Architecture Overview

### Project Structure
```
IMR-utility-management-system/
├── backend/                    # Java Spring Boot backend (skeleton)
│   └── src/main/java/coms/ums/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── exception/
│       ├── model/
│       ├── repository/
│       └── service/
├── frontend/
│   └── frontend-admin-draft/   # Admin portal (Vite + React)
├── src/                        # Customer portal (Create React App)
├── database/                   # Database scripts and schemas
└── docs/                       # Documentation
```

## Key Components

### 1. Database Layer (SQL Server)
- Comprehensive database schema with 8+ core tables
- Views for data aggregation
- Stored procedures for business logic
- Triggers for data validation
- Functions for calculations

### 2. Frontend Applications

#### Customer Portal (React - Create React App)
- Customer login and dashboard
- Bill viewing and details
- Payment processing
- Complaint submission
- Profile management

#### Admin Portal (React - Vite)
- Dashboard with analytics
- Customer management
- Meter management and readings
- Billing operations
- Payment recording
- Tariff management
- Complaint handling
- Reports generation

### 3. Backend API (Java Spring Boot - Skeleton)
- RESTful API structure (planned)
- MVC architecture with:
  - Controllers for endpoints
  - Services for business logic
  - Repositories for data access
  - DTOs for data transfer
  - Exception handling

## Technology Stack

### Frontend
- **Customer Portal**: React 19.2.0, React Router 6.30.2, Create React App
- **Admin Portal**: React 19.2.0, React Router 7.9.5, Vite 7.2.2
- **Styling**: Custom CSS

### Backend
- **Framework**: Java Spring Boot (structure only)
- **Package**: coms.ums

### Database
- **DBMS**: Microsoft SQL Server
- **Features**: Tables, Views, Stored Procedures, Triggers, Functions

## Core Features

### Customer Features
- View consumption statistics
- Access billing history
- Make payments online
- Submit meter readings
- File complaints
- Manage profile information

### Admin Features
- Monitor system-wide metrics
- Manage customer accounts
- Register and manage utility meters
- Record meter readings
- Generate and manage bills
- Process payments
- Configure tariff structures
- Handle customer complaints
- Generate reports

## Development Status
- **Database**: Fully implemented with schema, views, procedures, triggers, and functions
- **Customer Portal**: Functional UI with routing and components
- **Admin Portal**: Complete UI implementation with all major features
- **Backend**: Skeleton structure only (placeholder Test files)
- **Integration**: Backend-to-frontend integration pending

## Getting Started

### Customer Portal
```bash
npm install
npm start
# Runs on http://localhost:3000
```

### Admin Portal
```bash
cd frontend/frontend-admin-draft
npm install
npm run dev
# Runs on Vite development server
```

### Database Setup
1. Execute `database/ddl/create_tables(new).sql` to create schema
2. Run `database/ddl/tables.sql` for additional tables
3. Execute views from `database/views/views.sql`
4. Load procedures from `database/procedures/`
5. Load triggers from `database/triggers/triggers.sql`
6. Load functions from `database/functions/`
7. Optionally load sample data from `database/dml/sample_data.sql`

## Future Development
- Complete backend API implementation
- Connect frontend to backend APIs
- Implement authentication and authorization
- Add real-time data updates
- Implement payment gateway integration
- Add email/SMS notifications
- Implement advanced reporting features
