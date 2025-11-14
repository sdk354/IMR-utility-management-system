// src/components/AdminLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AdminLayout() {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/admin/dashboard': 'Dashboard',
      '/admin/customers': 'Customer Management',
      '/admin/meters': 'Meter Management',
      '/admin/billing': 'Billing Management',
      '/admin/payments': 'Payment Management',
      '/admin/tariffs': 'Tariff Management',
      '/admin/complaints': 'Complaints Management',
      '/admin/reports': 'Reports & Analytics',
    };
    return titles[path] || 'Admin Portal';
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header title={getPageTitle()} />
        <main className="admin-content">
          <div className="admin-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;