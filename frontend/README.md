# IMR Unified Frontend

This is the **unified frontend** for the IMR Utility Management System, combining the customer portal and admin portal into a single React application built with Vite.

## Overview

This project consolidates three separate frontend projects into one unified codebase:
- **Customer Portal** (originally at `/src/`)
- **Admin Portal** (originally at `/frontend/frontend-admin-draft/`)
- **Admin Login** (originally at `/frontend/`)

## Technology Stack

- **React**: 19.2.0
- **React Router DOM**: 6.30.2
- **Build Tool**: Vite 7.2.2
- **Linting**: ESLint 9.39.1
- **Node.js**: Recommended version 18+

## Project Structure

```
frontend-combined/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx       # Admin portal layout wrapper
│   │   │   ├── Header.jsx            # Admin header component
│   │   │   └── Sidebar.jsx           # Admin sidebar navigation
│   │   └── shared/                   # Shared components (future use)
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── CustomerLogin.jsx     # Customer login page
│   │   │   └── AdminLogin.jsx        # Admin login page
│   │   ├── customer/
│   │   │   ├── Dashboard.jsx         # Customer dashboard
│   │   │   ├── BillsList.jsx         # Bills list page
│   │   │   ├── BillDetails.jsx       # Bill details page
│   │   │   ├── Profile.jsx           # Customer profile
│   │   │   ├── Payments.jsx          # Payment form
│   │   │   └── Complaints.jsx        # Support/Complaints page
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx         # Admin dashboard
│   │   │   ├── Customers.jsx         # Customer management
│   │   │   ├── AddEditCustomer.jsx   # Add/Edit customer
│   │   │   ├── PastPayments.jsx      # Payment history
│   │   │   ├── Meters.jsx            # Meter management
│   │   │   ├── RegisterMeter.jsx     # Register new meter
│   │   │   ├── AddMeterReading.jsx   # Add meter reading
│   │   │   ├── Billing.jsx           # Billing management
│   │   │   ├── AddEditBill.jsx       # Add/Edit bill
│   │   │   ├── Payments.jsx          # Payment management
│   │   │   ├── RecordPayment.jsx     # Record payment
│   │   │   ├── Tariffs.jsx           # Tariff management
│   │   │   ├── AddTariff.jsx         # Add tariff
│   │   │   ├── Complaints.jsx        # Complaints management
│   │   │   └── Reports.jsx           # Reports & analytics
│   │   ├── Landing.jsx               # Portal selection page
│   │   └── NotFound.jsx              # 404 page
│   ├── data/
│   │   └── mock.js                   # Mock data (bills, profile)
│   ├── styles/
│   │   └── globals.css               # Unified global styles
│   ├── App.jsx                       # Main routing component
│   └── main.jsx                      # Vite entry point
├── public/                           # Static assets
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## Installation

### Prerequisites
- Node.js 18+ and npm installed

### Steps

1. **Navigate to the project directory:**
   ```bash
   cd frontend-combined
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

### Start the development server:
```bash
npm run dev
```

The application will start at `http://localhost:3000` by default.

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot module replacement (HMR) |
| `npm run build` | Build for production (output to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Auto-fix linting issues where possible |

## Routes

### Public Routes
- `/` - Landing page (portal selection)

### Authentication Routes
- `/customer/login` - Customer login
- `/admin/login` - Admin login

### Customer Routes
- `/customer/dashboard` - Customer dashboard with stats and navigation
- `/customer/bills` - Bills list page
- `/customer/bills/:id` - Individual bill details
- `/customer/profile` - Customer profile management

### Admin Routes (wrapped in AdminLayout)
- `/admin/dashboard` - Admin dashboard with metrics
- `/admin/customers` - Customer management
- `/admin/customers/add` - Add/edit customer
- `/admin/customers/view` - Past payment history
- `/admin/meters` - Meter management
- `/admin/meters/register` - Register new meter
- `/admin/meters/newreading` - Add meter reading
- `/admin/billing` - Billing management
- `/admin/billing/add` - Add/edit bill
- `/admin/payments` - Payment management
- `/admin/payments/recordpayment` - Record payment
- `/admin/tariffs` - Tariff management
- `/admin/tariffs/add` - Add tariff
- `/admin/complaints` - Complaints management
- `/admin/reports` - Reports & analytics

### 404
- `*` - Not Found page for invalid routes

## Styling

The project uses a unified CSS system with CSS custom properties (variables) located in `src/styles/globals.css`.

### Color Themes
- **Customer Portal**: Orange (#ea580c)
- **Admin Portal**: Navy Blue (#1e3a8a)

### CSS Structure
- CSS variables for consistent theming
- Component-specific class names prefixed with `admin-` or `customer-`
- Shared utility classes
- Responsive design patterns

## Build for Production

### Build the project:
```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### Preview the production build:
```bash
npm run preview
```

## Key Features

### Customer Portal
- Dashboard with consumption statistics
- Bill viewing and details
- Online payment form
- Support ticket submission
- Profile management

### Admin Portal
- Comprehensive admin dashboard
- Customer CRUD operations
- Meter management and readings
- Billing generation and management
- Payment processing and recording
- Tariff configuration
- Complaint handling
- Reports and analytics

## Migration Notes

This unified frontend was created by combining three separate React projects:

1. **Top-level Customer Portal** (`/src/`) - Built with Create React App
2. **Admin Portal** (`/frontend/frontend-admin-draft/`) - Built with Vite
3. **Frontend Directory** (`/frontend/`) - Extracted AdminLogin component

### Key Changes
- Migrated from Create React App to Vite for faster builds
- Unified React Router DOM to version 6.30.2
- Consolidated styling into single globals.css file
- Standardized color themes (#ea580c for customer, #1e3a8a for admin)
- Removed duplicate components

## Development Status

- ✅ UI Components: Complete
- ✅ Routing: Implemented
- ✅ Styling: Unified
- ⚠️ Backend Integration: Pending
- ⚠️ Authentication: Mock only
- ⚠️ API Calls: Not yet implemented

## Future Enhancements

- Connect to backend REST API
- Implement JWT authentication
- Add state management (Context API or Redux)
- Implement form validation
- Add loading states and error handling
- Integrate payment gateway
- Add real-time data updates
- Implement notifications (toast, email, SMS)
- Add data export features (PDF, Excel)
- Mobile responsive improvements

## Troubleshooting

### Port already in use
If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.).

### Build errors
Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### ESLint errors
Fix linting issues automatically:
```bash
npm run lint:fix
```

## License

This project is part of the IMR Utility Management System.

## Contributing

1. Follow the existing code structure
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Run linting before committing
5. Test all routes after making changes

## Support

For issues or questions, please contact the development team or create an issue in the project repository.
