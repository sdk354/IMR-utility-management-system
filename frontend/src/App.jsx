import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layout & Public Components
import AdminLayout from './components/layout/AdminLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import CustomerLogin from './pages/auth/CustomerLogin';
import AdminLogin from './pages/auth/AdminLogin';

// --- ADDED MISSING CUSTOMER IMPORTS ---
import CustomerDashboard from './pages/customer/Dashboard';
import BillsList from './pages/customer/BillsList';
import BillDetails from './pages/customer/BillDetails';
import CustomerPayments from './pages/customer/Payments';
import CustomerComplaints from './pages/customer/Complaints';
import Profile from './pages/customer/Profile';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Customers from './pages/admin/Customers';
import AddEditCustomer from './pages/admin/AddEditCustomer';
import PastPayments from './pages/admin/PastPayments';
import Meters from './pages/admin/Meters';
import RegisterMeter from './pages/admin/RegisterMeter';
import AddMeterReading from './pages/admin/AddMeterReading';
import Billing from './pages/admin/Billing';
import AddEditBill from './pages/admin/AddEditBill';
import Payments from './pages/admin/Payments';
import RecordPayment from './pages/admin/RecordPayment';
import Tariffs from './pages/admin/Tariffs';
import AddTariff from './pages/admin/AddTariff';
import Complaints from './pages/admin/Complaints';
import Reports from './pages/admin/Reports';

const ROLES = {
	ADMIN: "Administrative Staff",
	FIELD: "Field Officer",
	CLERK: "Billing Clerk",
	MANAGER: "Manager",
	DEV: "Developer",
	CUSTOMER: "Customer"
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<Landing />} />
				<Route path="/customer/login" element={<CustomerLogin />} />
				<Route path="/admin/login" element={<AdminLogin />} />

				{/* Customer Routes */}
				<Route
					path="/customer"
					element={
						<ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.DEV]}>
							<CustomerLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path="dashboard" element={<CustomerDashboard />} />
					<Route path="bills" element={<BillsList />} />
					<Route path="bills/:id" element={<BillDetails />} />
					<Route path="payment" element={<CustomerPayments />} />
					<Route path="support" element={<CustomerComplaints />} />
					<Route path="profile" element={<Profile />} />
				</Route>

				{/* Admin Routes with granular protection */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.FIELD, ROLES.CLERK, ROLES.MANAGER, ROLES.DEV]}>
							<AdminLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path="dashboard" element={<Dashboard />} />

					{/* Administrative Staff Sections */}
					<Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.DEV]} />}>
						<Route path="customers" element={<Customers />} />
						<Route path="customers/add" element={<AddEditCustomer />} />
						<Route path="customers/view/:id" element={<PastPayments />} />
						<Route path="tariffs" element={<Tariffs />} />
						<Route path="tariffs/add" element={<AddTariff />} />
						<Route path="complaints" element={<Complaints />} />
					</Route>

					{/* Field Officer Sections */}
					<Route element={<ProtectedRoute allowedRoles={[ROLES.FIELD, ROLES.ADMIN, ROLES.DEV]} />}>
						<Route path="meters" element={<Meters />} />
						<Route path="meters/register" element={<RegisterMeter />} />
						<Route path="meters/newreading" element={<AddMeterReading />} />
					</Route>

					{/* Billing Clerk Sections */}
					<Route element={<ProtectedRoute allowedRoles={[ROLES.CLERK, ROLES.DEV]} />}>
						<Route path="billing" element={<Billing />} />
						<Route path="billing/add" element={<AddEditBill />} />
						<Route path="payments" element={<Payments />} />
						<Route path="payments/recordpayment" element={<RecordPayment />} />
					</Route>

					{/* Manager Sections */}
					<Route element={<ProtectedRoute allowedRoles={[ROLES.MANAGER, ROLES.DEV]} />}>
						<Route path="reports" element={<Reports />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;