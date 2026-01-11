import {NavLink, useNavigate} from 'react-router-dom';
import {authService} from '../../services/authService';

function Sidebar({isCustomer = false}) {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user')) || {};
	const userRole = user.role;

	const handleLogout = () => {
		if (window.confirm("Are you sure you want to logout?")) {
			authService.logout();
			navigate('/');
		}
	};

	const ROLES = {
		ADMIN: "Administrative Staff",
		FIELD: "Field Officer",
		CLERK: "Billing Clerk",
		MANAGER: "Manager",
		DEV: "Developer",
		CUSTOMER: "Customer"
	};

	const adminLinks = [{
		path: '/admin/dashboard',
		label: 'Dashboard',
		icon: 'admin-icon-grid',
		roles: [ROLES.ADMIN, ROLES.FIELD, ROLES.CLERK, ROLES.MANAGER, ROLES.DEV]
	}, {path: '/admin/customers', label: 'Customers', icon: 'admin-icon-users', roles: [ROLES.ADMIN, ROLES.DEV]}, {
		path: '/admin/meters', label: 'Meters', icon: 'admin-icon-gauge', roles: [ROLES.FIELD, ROLES.ADMIN, ROLES.DEV]
	}, {
		path: '/admin/billing', label: 'Billing', icon: 'admin-icon-receipt', roles: [ROLES.CLERK, ROLES.DEV]
	}, {
		path: '/admin/payments', label: 'Payments', icon: 'admin-icon-credit-card', roles: [ROLES.CLERK, ROLES.DEV]
	}, {path: '/admin/tariffs', label: 'Tariffs', icon: 'admin-icon-tag', roles: [ROLES.ADMIN, ROLES.DEV]}, {
		path: '/admin/complaints',
		label: 'Complaints',
		icon: 'admin-icon-message-alert',
		roles: [ROLES.ADMIN, ROLES.DEV]
	}, {path: '/admin/reports', label: 'Reports', icon: 'admin-icon-chart', roles: [ROLES.MANAGER, ROLES.DEV]}];

	return (<aside className={isCustomer ? 'customer-sidebar' : 'admin-sidebar'}>
		<div className={isCustomer ? 'customer-logo' : 'admin-logo'}>
			<span className={isCustomer ? 'customer-icon-lightning' : 'admin-icon-lightning'}></span>
			<span>{isCustomer ? 'Customer Portal' : 'Admin Portal'}</span>
		</div>

		<nav className={isCustomer ? 'customer-nav' : 'admin-nav'}>
			<div className={isCustomer ? 'customer-nav-section' : 'admin-nav-section'}>
				{isCustomer ? 'ACCOUNT' : 'MAIN'}
			</div>

			{isCustomer ? (<>
				<NavLink to="/customer/dashboard" className="customer-nav-link">
					<span className="customer-icon-grid"></span> Dashboard
				</NavLink>
				<NavLink to="/customer/bills" className="customer-nav-link">
					<span className="customer-icon-receipt"></span> My Bills
				</NavLink>
				<NavLink to="/customer/payment" className="customer-nav-link">
					<span className="customer-icon-credit-card"></span> Payments
				</NavLink>
				<div className="customer-nav-section">SUPPORT</div>
				<NavLink to="/customer/support" className="customer-nav-link">
					<span className="customer-icon-message-alert"></span> Complaints
				</NavLink>
				<NavLink to="/customer/profile" className="customer-nav-link">
					<span className="customer-icon-users"></span> Profile
				</NavLink>
			</>) : (<>
				{adminLinks.map((link) => {
					const hasAccess = link.roles.includes(userRole);
					return hasAccess ? (<NavLink key={link.path} to={link.path} className="admin-nav-link">
						<span className={link.icon}></span> {link.label}
					</NavLink>) : (<div key={link.path} className="admin-nav-link locked" title="Access Denied">
						<div className="locked-wrapper">
							<div className="locked-main">
								<span className={link.icon}></span>
								{link.label}
							</div>
							<span className="admin-icon-lock"></span>
						</div>
					</div>);
				})}
			</>)}
		</nav>

		<button onClick={handleLogout} className={isCustomer ? 'customer-logout-btn' : 'admin-logout-btn'}>
			<span className={isCustomer ? 'customer-icon-arrow' : 'admin-icon-arrow'}></span>
			<span className="btn-text">Back to Portal Selection</span>
		</button>
	</aside>);
}

export default Sidebar;