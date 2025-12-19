import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar({ isCustomer = false }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate('/');
    }
  };

  const sidebarClass = isCustomer ? 'customer-sidebar' : 'admin-sidebar';
  const navClass = isCustomer ? 'customer-nav' : 'admin-nav';
  const navLinkClass = isCustomer ? 'customer-nav-link' : 'admin-nav-link';
  const navSectionClass = isCustomer ? 'customer-nav-section' : 'admin-nav-section';
  const logoClass = isCustomer ? 'customer-logo' : 'admin-logo';
  const iconClass = isCustomer ? 'customer-icon-lightning' : 'admin-icon-lightning';
  const logoutBtnClass = isCustomer ? 'customer-logout-btn' : 'admin-logout-btn';
  const iconArrowClass = isCustomer ? 'customer-icon-arrow' : 'admin-icon-arrow';
  const portalTitle = isCustomer ? 'Customer Portal' : 'Admin Portal';
  const basePath = isCustomer ? '/customer' : '/admin';

  if (isCustomer) {
    return (
      <aside className={sidebarClass}>
        <div className={logoClass}>
          <span className={iconClass}></span>
          <span>{portalTitle}</span>
        </div>

        <nav className={navClass}>
          <div className={navSectionClass}>ACCOUNT</div>
          <NavLink to={`${basePath}/dashboard`} className={navLinkClass}>
            <span className="customer-icon-grid"></span> Dashboard
          </NavLink>
          <NavLink to={`${basePath}/bills`} className={navLinkClass}>
            <span className="customer-icon-receipt"></span> My Bills
          </NavLink>
          <NavLink to={`${basePath}/payment`} className={navLinkClass}>
            <span className="customer-icon-credit-card"></span> Payments
          </NavLink>

          <div className={navSectionClass}>SUPPORT</div>
          <NavLink to={`${basePath}/support`} className={navLinkClass}>
            <span className="customer-icon-message-alert"></span> Complaints
          </NavLink>
          <NavLink to={`${basePath}/profile`} className={navLinkClass}>
            <span className="customer-icon-users"></span> Profile
          </NavLink>
        </nav>

        <button onClick={handleLogout} className={logoutBtnClass}>
          <span className={iconArrowClass}></span>Back to Portal Selection
        </button>
      </aside>
    );
  }

  return (
    <aside className={sidebarClass}>
      <div className={logoClass}>
        <span className={iconClass}></span>
        <span>{portalTitle}</span>
      </div>

      <nav className={navClass}>
        <div className={navSectionClass}>MAIN</div>
        <NavLink to={`${basePath}/dashboard`} className={navLinkClass}>
          <span className="admin-icon-grid"></span> Dashboard
        </NavLink>

        <div className={navSectionClass}>MANAGEMENT</div>
        <NavLink to={`${basePath}/customers`} className={navLinkClass}>
          <span className="admin-icon-users"></span> Customers
        </NavLink>
        <NavLink to={`${basePath}/meters`} className={navLinkClass}>
          <span className="admin-icon-gauge"></span> Meters
        </NavLink>
        <NavLink to={`${basePath}/billing`} className={navLinkClass}>
          <span className="admin-icon-receipt"></span> Billing
        </NavLink>
        <NavLink to={`${basePath}/payments`} className={navLinkClass}>
          <span className="admin-icon-credit-card"></span> Payments
        </NavLink>
        <NavLink to={`${basePath}/tariffs`} className={navLinkClass}>
          <span className="admin-icon-tag"></span> Tariffs
        </NavLink>
        <NavLink to={`${basePath}/complaints`} className={navLinkClass}>
          <span className="admin-icon-message-alert"></span> Complaints
        </NavLink>
	  	<NavLink to={`${basePath}/reports`} className={navLinkClass}>
		  <span className="admin-icon-chart"></span> Reports
	  	</NavLink>
      </nav>

      <button onClick={handleLogout} className={logoutBtnClass}>
        <span className={iconArrowClass}></span>Back to Portal Selection
      </button>
    </aside>
  );
}

export default Sidebar;
