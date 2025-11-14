import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate('/');
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <span className="admin-icon-lightning"></span>
        <span>Admin Portal</span>
      </div>

      <nav className="admin-nav">
        <div className="admin-nav-section">MAIN</div>
        <NavLink to="/admin/dashboard" className="admin-nav-link">
          <span className="admin-icon-grid"></span> Dashboard
        </NavLink>

        <div className="admin-nav-section">MANAGEMENT</div>
        <NavLink to="/admin/customers" className="admin-nav-link">
          <span className="admin-icon-users"></span> Customers
        </NavLink>
        <NavLink to="/admin/meters" className="admin-nav-link">
          <span className="admin-icon-gauge"></span> Meters
        </NavLink>
        <NavLink to="/admin/billing" className="admin-nav-link">
          <span className="admin-icon-receipt"></span> Billing
        </NavLink>
        <NavLink to="/admin/payments" className="admin-nav-link">
          <span className="admin-icon-credit-card"></span> Payments
        </NavLink>
        <NavLink to="/admin/tariffs" className="admin-nav-link">
          <span className="admin-icon-tag"></span> Tariffs
        </NavLink>
        <NavLink to="/admin/complaints" className="admin-nav-link">
          <span className="admin-icon-message-alert"></span> Complaints
        </NavLink>

        <div className="admin-nav-section">ANALYTICS</div>
        <NavLink to="/admin/reports" className="admin-nav-link">
          <span className="admin-icon-chart"></span> Reports
        </NavLink>
      </nav>

      <button onClick={handleLogout} className="admin-logout-btn">
        <span className="admin-icon-arrow"></span>Back to Portal Selection
      </button>
    </aside>
  );
}

export default Sidebar;