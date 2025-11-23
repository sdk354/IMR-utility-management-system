import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

// Auth Pages
import CustomerLogin from './pages/auth/CustomerLogin';
import AdminLogin from './pages/auth/AdminLogin';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import BillsList from './pages/customer/BillsList';
import BillDetails from './pages/customer/BillDetails';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />

        {/* Auth Routes */}
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/bills" element={<BillsList />} />
        <Route path="/customer/bills/:id" element={<BillDetails />} />
        <Route path="/customer/profile" element={<Profile />} />

        {/* Admin Routes - wrapped in AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/add" element={<AddEditCustomer />} />
          <Route path="customers/view" element={<PastPayments />} />
          <Route path="meters" element={<Meters />} />
          <Route path="meters/register" element={<RegisterMeter />} />
          <Route path="meters/newreading" element={<AddMeterReading />} />
          <Route path="billing" element={<Billing />} />
          <Route path="billing/add" element={<AddEditBill />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payments/recordpayment" element={<RecordPayment />} />
          <Route path="tariffs" element={<Tariffs />} />
          <Route path="tariffs/add" element={<AddTariff />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="reports" element={<Reports />} />
          {/* Default redirect for /admin to /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
