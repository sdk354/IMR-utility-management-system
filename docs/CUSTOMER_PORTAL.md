# Customer Portal Documentation

## Overview
The customer portal is a React-based web application built with Create React App that allows utility customers to manage their accounts, view bills, make payments, and submit complaints.

## Technology Stack
- **React**: 19.2.0
- **React Router**: 6.30.2
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: Jest, React Testing Library

## Location
```
/src/                 # Customer portal root
├── pages/           # Page components
├── data/           # Static/mock data
├── App.js          # Main routing component
├── App.css         # Global styles
└── index.js        # Entry point
```

## Routing Structure

### Main Routes (src/App.js:21-31)
```
/ - Landing page (portal selection)
/customer/login - Customer login
/customer/dashboard - Main dashboard
/customer/bills - Bills list
/customer/bills/:id - Bill details
/customer/profile - User profile
* - 404 Not Found page
```

## Page Components

### 1. Landing Page
**File**: `src/pages/Landing.js`
**Route**: `/`
**Purpose**: Portal selection page - entry point for customers and admins

---

### 2. Customer Login
**File**: `src/pages/CustomerLogin.js`
**Route**: `/customer/login`
**Purpose**: Customer authentication page
**Features**:
- Username/password input
- Login form submission
- Redirect to dashboard after login

---

### 3. Dashboard
**File**: `src/pages/Dashboard.js:9-185`
**Route**: `/customer/dashboard`
**Purpose**: Main customer interface with navigation and data views

#### Features:
1. **Sidebar Navigation**
   - Home
   - My Bills
   - Payments
   - Complaints
   - Profile
   - Back to portal selection

2. **Home View** (Default)
   - Welcome banner with customer name
   - Quick action buttons (View Bills, Make Payment, Submit Reading, Get Support)
   - Statistics cards:
     - Current month usage (kWh)
     - Last bill amount
     - Average daily usage
     - Account status
   - Monthly consumption trend chart (bar graph)

3. **Bills View**
   - Integrated bills table
   - Shows Bill ID, Period, Amount, Due Date, Status
   - Sample data displayed inline

4. **Payment View**
   - Embedded CustomerPayments component

5. **Support View**
   - Embedded CustomerComplaints component

6. **Profile View**
   - Embedded Profile component

#### State Management:
- `view` state: Controls which section is displayed ('home', 'bills', 'payment', 'support', 'profile')

#### Styling:
- Custom CSS in `src/pages/Dashboard.css`
- Color scheme: Orange primary (#ea580c), blue accents

---

### 4. Bills List
**File**: `src/pages/BillsList.js`
**Route**: `/customer/bills`
**Purpose**: Standalone bills listing page
**Features**:
- Table of all customer bills
- Filtering and sorting (planned)
- Click to view bill details

---

### 5. Bill Details
**File**: `src/pages/BillDetails.js`
**Route**: `/customer/bills/:id`
**Purpose**: Detailed view of individual bill
**Features**:
- Bill metadata (period, amount, status)
- Consumption breakdown
- Tariff details
- Payment history for this bill
- Download/print options (planned)

---

### 6. Customer Payments
**File**: `src/pages/CustomerPayments.jsx:3-76`
**Purpose**: Payment processing interface
**Features**:
- Account number input
- Amount input (number field)
- "Pay Now" button
- Orange theme (#ea580c)

**UI Elements**:
- Form with account number and amount fields
- Submit button for payment processing
- Simple card-based layout

---

### 7. Customer Complaints
**File**: `src/pages/CustomerComplaints.jsx:3-161`
**Purpose**: Support ticket submission and tracking
**Features**:

1. **Complaint Submission Form**
   - Issue type dropdown (Billing Issue, Meter Reading, General Inquiry)
   - Subject field
   - Description textarea
   - Submit button

2. **My Support Tickets Table**
   - Ticket ID
   - Subject
   - Type
   - Date
   - Status (In Progress, Resolved)
   - Color-coded status indicators

**Accessibility**:
- Proper label associations (htmlFor/id)
- ARIA labels on form elements
- Semantic HTML

---

### 8. Profile
**File**: `src/pages/Profile.js`
**Purpose**: User profile and account information
**Features** (typical):
- Personal information display
- Contact details
- Address information
- Account settings
- Password change

---

### 9. Not Found (404)
**File**: `src/pages/NotFound.js`
**Route**: `*` (catch-all)
**Purpose**: Handle invalid routes

---

## Common Components

### CustomerBills
**File**: `src/pages/CustomerBills.js` and `src/pages/CustomerBills.jsx`
Multiple implementations for bills display
- Reusable bills component
- Can be embedded in dashboard or standalone

---

## Data Flow

### Current Implementation:
- **Static/Mock Data**: Currently using hardcoded data in components
- **No API Integration**: Backend integration pending
- **Sample Data**: Located in `src/data/` directory

### Future Implementation:
- API calls to backend
- State management (Redux/Context API)
- Real-time data updates
- Authentication tokens

---

## Styling Approach

### CSS Organization:
- **Global Styles**: `src/App.css`
- **Component Styles**: `src/pages/Dashboard.css`
- **Inline Styles**: Used in CustomerPayments, CustomerComplaints

### Design System:
- **Primary Color**: #ea580c (Orange)
- **Secondary Color**: #0C2D55 (Dark Blue)
- **Background**: #F5F7FA (Light Gray)
- **Success**: #11A763 (Green)
- **Warning**: #E09E00 (Yellow/Gold)
- **Cards**: White with shadow and border-radius

### Layout:
- Sidebar navigation (Dashboard)
- Card-based content areas
- Responsive design patterns
- Table layouts for data display

---

## Key Features by Priority

### Implemented:
1. Dashboard with statistics and navigation
2. Bills viewing (inline in dashboard)
3. Payment form interface
4. Complaint submission and tracking
5. Profile access
6. Routing between pages

### Pending Implementation:
1. Backend API integration
2. Authentication/authorization
3. Real data from database
4. Form validation and error handling
5. Payment gateway integration
6. Real-time updates
7. PDF bill generation
8. Receipt downloads
9. Notifications

---

## User Flows

### View Bills Flow:
1. Login → Dashboard
2. Click "My Bills" in sidebar
3. View bills table
4. (Future) Click bill to see details

### Make Payment Flow:
1. Login → Dashboard
2. Click "Payments" in sidebar
3. Enter account number and amount
4. Click "Pay Now"
5. (Future) Payment confirmation

### Submit Complaint Flow:
1. Login → Dashboard
2. Click "Complaints" in sidebar
3. Select issue type
4. Fill subject and description
5. Click "Submit Request"
6. View ticket in "My Support Tickets" table

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Configuration

### Package.json Scripts:
```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

### Environment:
- Development: `http://localhost:3000`
- Production build: `build/` directory

---

## Future Enhancements

1. **Authentication**:
   - JWT token management
   - Session handling
   - Auto-logout on timeout

2. **Data Integration**:
   - Connect to backend APIs
   - Real-time data updates
   - Error handling

3. **Advanced Features**:
   - Bill payment history graphs
   - Usage comparison with neighbors
   - Budget alerts
   - Autopay setup
   - Email/SMS notifications

4. **UX Improvements**:
   - Loading states
   - Error messages
   - Success notifications
   - Form validation
   - Accessibility enhancements

5. **Mobile Optimization**:
   - Responsive breakpoints
   - Mobile-first design
   - Touch-friendly interfaces
