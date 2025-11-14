import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './components/AdminLayout';
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
import RecordPayments from './pages/admin/RecordPayment';

import Tariffs from './pages/admin/Tariffs';
import AddTariff from './pages/admin/AddTariff';

import Complaints from './pages/admin/Complaints';
import Reports from './pages/admin/Reports';

function App() {
  return (
    <Routes>
      {/* ADMIN PORTAL */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/customers/add" element={<AddEditCustomer />} />
        <Route path="/admin/customers/view" element={<PastPayments />} />

        <Route path="/admin/meters" element={<Meters />} />
        <Route path="/admin/meters/register" element={<RegisterMeter />} />
        <Route path="/admin/meters/newreading" element={<AddMeterReading />} />
        
        <Route path="/admin/billing" element={<Billing />} />
        <Route path="/admin/billing/add" element={<AddEditBill />} />

        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/payments/recordpayment" element={<RecordPayments />} />

        <Route path="/admin/tariffs" element={<Tariffs />} />
        <Route path="/admin/tariffs/add" element={<AddTariff />} />

        <Route path="/admin/complaints" element={<Complaints />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;