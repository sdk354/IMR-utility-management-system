# Admin Portal Documentation

## Overview
The admin portal is a comprehensive React-based web application built with Vite that provides administrative interfaces for managing the utility management system. It handles customers, meters, billing, payments, tariffs, complaints, and reporting.

## Technology Stack
- **React**: 19.2.0
- **React Router**: 7.9.5
- **Build Tool**: Vite 7.2.2
- **Dev Server**: Vite development server
- **Linting**: ESLint with React plugins

## Location
```
/frontend/frontend-admin-draft/
├── src/
│   ├── Pages/Admin/      # Admin page components
│   ├── Components/       # Shared components
│   ├── assets/          # Static assets
│   ├── App.jsx          # Main routing
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/              # Public assets
└── package.json         # Dependencies
```

## Routing Structure

### Main App Routes (src/App.jsx:28-55)
```
/admin/dashboard - Admin dashboard with metrics
/admin/customers - Customer list
/admin/customers/add - Add/edit customer
/admin/customers/view - Past payment history
/admin/meters - Meter list
/admin/meters/register - Register new meter
/admin/meters/newreading - Add meter reading
/admin/billing - Billing list
/admin/billing/add - Add/edit bill
/admin/payments - Payments list
/admin/payments/recordpayment - Record new payment
/admin/tariffs - Tariff list
/admin/tariffs/add - Add new tariff
/admin/complaints - View complaints
/admin/reports - Reports and analytics
* - Redirects to /admin/dashboard
```

### Layout Component
All admin routes wrapped in `<AdminLayout />` component providing:
- Header with navigation
- Sidebar menu
- Consistent layout structure

---

## Page Components

### 1. Dashboard
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Dashboard.jsx:3-127`
**Route**: `/admin/dashboard`
**Purpose**: Main admin interface with system overview

#### Features:

**Summary Cards** (Lines 8-51):
1. Total Customers: 24,567 (↑ 12% from last month)
2. Active Meters: 31,245 (↑ 8% from last month)
3. Outstanding Balance: Rs. 120M (↓ 5% from last month)
4. Today's Collections: Rs. 4,589,000 (↑ 23% from yesterday)

**Monthly Revenue Trend Chart** (Lines 54-66):
- Visual chart area with export functionality
- Placeholder for revenue trend visualization

**Recent Alerts Section** (Lines 72-85):
- High Consumption Alert (Customer #12345 exceeded 150% average)
- Payment Overdue (245 accounts 30+ days overdue)
- Meter Reading Due (1,234 meters pending reading)
- Color-coded by severity (orange, red, blue)

**Quick Actions** (Lines 88-122):
- Add New Customer → /admin/customers/add
- Register New Meter → /admin/meters/register
- Record Payment → /admin/payments/recordpayment
- Add Tariff → /admin/tariffs/add
- View Complaints → /admin/complaints
- View Reports → /admin/reports

#### Styling:
- Grid layout for summary cards
- Color-coded icons and metrics
- Responsive card design

---

### 2. Customers
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Customers.jsx`
**Route**: `/admin/customers`
**Purpose**: Customer list and management

**Features**:
- Searchable customer list
- Customer data table
- Add new customer button
- Edit/view customer details
- Customer status management

---

### 3. Add/Edit Customer
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/AddEditCustomer.jsx`
**Route**: `/admin/customers/add`
**Purpose**: Create or modify customer records

**Form Fields**:
- Username
- Email
- Contact number
- Address (street, street number, city)
- Role assignment
- Account status

---

### 4. Past Payments
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/PastPayments.jsx`
**Route**: `/admin/customers/view`
**Purpose**: View payment history for customers

**Features**:
- Payment transaction history
- Filter by customer
- Date range selection
- Payment method details

---

### 5. Meters
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Meters.jsx`
**Route**: `/admin/meters`
**Purpose**: Manage utility meters

**Features**:
- Meter inventory list
- Serial number tracking
- Installation status
- Customer assignments
- Utility type categorization
- Search and filter functionality

---

### 6. Register Meter
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/RegisterMeter.jsx`
**Route**: `/admin/meters/register`
**Purpose**: Register new meters in the system

**Form Fields**:
- Serial number
- Utility type selection
- Customer assignment
- Installation date
- Initial status

---

### 7. Add Meter Reading
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/AddMeterReading.jsx`
**Route**: `/admin/meters/newreading`
**Purpose**: Record new meter readings

**Form Fields**:
- Meter selection (by serial number)
- Reading value
- Reading date/time
- Remarks/notes
- Reader information

---

### 8. Billing
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Billing.jsx`
**Route**: `/admin/billing`
**Purpose**: View and manage bills

**Features**:
- Bills table with filters
- Bill status (Paid, Unpaid, Overdue)
- Billing period tracking
- Amount and consumption data
- Generate new bill button

---

### 9. Add/Edit Bill
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/AddEditBill.jsx`
**Route**: `/admin/billing/add`
**Purpose**: Create or modify billing records

**Form Fields**:
- Customer selection
- Billing period (start/end dates)
- Consumption amount
- Tariff selection
- Due date
- Additional charges (late fees)
- Total amount calculation

---

### 10. Payments
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Payments.jsx`
**Route**: `/admin/payments`
**Purpose**: View payment transactions

**Features**:
- Payment history table
- Filter by date, customer, status
- Payment method tracking
- Receipt number references
- Amount totals

---

### 11. Record Payment
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/RecordPayment.jsx`
**Route**: `/admin/payments/recordpayment`
**Purpose**: Record new payment transactions

**Form Fields**:
- Bill selection/lookup
- Customer information (auto-filled)
- Payment amount
- Payment date
- Payment method (cash, card, online, etc.)
- Receipt number generation

---

### 12. Tariffs
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Tariffs.jsx`
**Route**: `/admin/tariffs`
**Purpose**: Manage tariff structures

**Features**:
- Tariff list with effective dates
- Rate information
- Slab-based pricing display
- Utility type categorization
- Active/inactive tariffs

---

### 13. Add Tariff
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/AddTariff.jsx`
**Route**: `/admin/tariffs/add`
**Purpose**: Create new tariff structures

**Form Fields**:
- Utility type selection
- Rate per unit
- Effective from/to dates
- Slab from/to (consumption range)
- Fixed charges
- Subsidiary percentage
- Tariff description

---

### 14. Complaints
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Complaints.jsx`
**Route**: `/admin/complaints`
**Purpose**: Handle customer complaints

**Features**:
- Complaint queue
- Status tracking (Pending, In Progress, Resolved)
- Customer information
- Complaint details
- Assignment to staff
- Resolution notes
- Priority levels

---

### 15. Reports
**File**: `frontend/frontend-admin-draft/src/Pages/Admin/Reports.jsx`
**Route**: `/admin/reports`
**Purpose**: Generate system reports and analytics

**Report Types**:
- Revenue reports (monthly, yearly)
- Consumption analytics
- Payment collection reports
- Outstanding balance reports
- Customer growth statistics
- Meter reading compliance
- Complaint resolution metrics
- Export functionality (PDF, Excel)

---

## Shared Components

### 1. AdminLayout
**File**: `frontend/frontend-admin-draft/src/Components/AdminLayout.jsx`
**Purpose**: Wrapper layout for all admin pages

**Components**:
- Header component
- Sidebar component
- Main content area (`<Outlet />` for nested routes)
- Consistent styling across admin pages

---

### 2. Header
**File**: `frontend/frontend-admin-draft/src/Components/Header.jsx`
**Purpose**: Top navigation bar

**Features**:
- System branding
- User profile menu
- Notifications (planned)
- Logout functionality
- Search bar (planned)

---

### 3. Sidebar
**File**: `frontend/frontend-admin-draft/src/Components/Sidebar.jsx`
**Purpose**: Left navigation menu

**Navigation Items**:
- Dashboard
- Customers
- Meters
- Billing
- Payments
- Tariffs
- Complaints
- Reports

**Features**:
- Active route highlighting
- Collapsible sections
- Icon support
- Nested menu items

---

## Styling System

### Global Styles (index.css)
**File**: `frontend/frontend-admin-draft/src/index.css`
**Size**: 18,709 bytes of comprehensive styling

**CSS Structure**:
- CSS custom properties for theming
- Utility classes
- Component-specific styles
- Responsive breakpoints
- Admin-specific class prefixes (`admin-*`)

### Color Scheme:
- **Primary**: Blue (#0C2D55)
- **Secondary**: Orange (#ea580c)
- **Success**: Green (#11A763)
- **Warning**: Yellow/Gold (#E09E00)
- **Danger**: Red
- **Neutral**: Grays for backgrounds and borders

### Layout Classes:
- `.admin-page` - Page container
- `.admin-card` - Card component
- `.admin-dashboard-grid` - Dashboard grid layout
- `.admin-summary-card` - Metric cards
- `.admin-table` - Data tables
- `.admin-btn-*` - Button variants
- `.admin-alert` - Alert/notification boxes

---

## Data Management

### Current State:
- **Mock Data**: Hardcoded sample data in components
- **No Backend Integration**: API calls not yet implemented
- **Static Forms**: Form submissions not connected to backend

### Planned Implementation:
- API service layer for backend communication
- State management (Context API or Redux)
- Form validation
- Error handling
- Loading states

---

## Key Features Summary

### Customer Management:
- Add, edit, view customers
- Track customer status
- View payment history
- Manage customer accounts

### Meter Management:
- Register new meters
- Assign meters to customers
- Record readings
- Track meter status
- View reading history

### Billing Operations:
- Generate bills
- Apply tariffs
- Calculate consumption charges
- Manage billing periods
- Track bill status

### Payment Processing:
- Record payments
- Multiple payment methods
- Receipt generation
- Payment history
- Payment reconciliation

### Tariff Configuration:
- Create pricing structures
- Slab-based rates
- Time-based tariffs
- Fixed charges
- Subsidies

### Complaint Handling:
- View complaint queue
- Assign to staff
- Track resolution
- Update status
- Customer communication

### Reporting & Analytics:
- Revenue reports
- Consumption analytics
- Collection efficiency
- Customer metrics
- Export capabilities

---

## Development Setup

### Commands:
```bash
cd frontend/frontend-admin-draft

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

### Development Server:
- Runs on Vite dev server (typically `http://localhost:5173`)
- Hot module replacement (HMR)
- Fast refresh for React components

---

## Future Enhancements

### Authentication & Security:
- Admin login system
- Role-based permissions
- Session management
- Audit logging

### Backend Integration:
- Connect to REST APIs
- Real-time data updates
- WebSocket for notifications
- File upload for bulk operations

### Advanced Features:
- Advanced filtering and search
- Bulk operations
- Data export (CSV, Excel, PDF)
- Email notifications
- SMS alerts
- Dashboard customization
- Multi-language support

### UX Improvements:
- Loading spinners
- Toast notifications
- Form validation feedback
- Confirmation dialogs
- Keyboard shortcuts
- Accessibility enhancements

### Analytics:
- Interactive charts
- Custom report builder
- Data visualization
- Predictive analytics
- Trend analysis

---

## Performance Considerations

### Optimization Strategies:
1. Lazy loading for routes
2. Code splitting
3. Image optimization
4. Caching strategies
5. Pagination for large datasets
6. Virtual scrolling for long lists
7. Debounced search inputs

### Build Optimization:
- Vite's optimized build process
- Tree shaking
- Minification
- Asset compression
