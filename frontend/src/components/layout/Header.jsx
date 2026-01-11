import {useNavigate} from 'react-router-dom';

function Header({title, isCustomer = false}) {
	const navigate = useNavigate();

	const userData = localStorage.getItem('user');
	const user = userData ? JSON.parse(userData) : null;

	const roleMapping = {
		"Administrative Staff": "Administrative Staff",
		"Field Officer": "Field Officer",
		"Customer": "Customer",
		"Billing Clerk": "Billing Clerk",
		"Manager": "Manager",
		"ROLE_USER": "User"
	};

	const getInitials = (name) => {
		if (!name || name === 'Guest') return "GU";
		const parts = name.split(/[_\s]/);
		if (parts.length >= 2 && parts[1][0]) {
			return (parts[0][0] + parts[1][0]).toUpperCase();
		}
		return name.slice(0, 2).toUpperCase();
	};

	const formatDisplayName = (name) => {
		if (!name) return "Guest";
		return name
			.split(/[_\s]/)
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	};

	const username = user?.username || 'Guest';
	const displayName = formatDisplayName(username);
	const userInitials = getInitials(username);
	const displayRole = roleMapping[user?.role] || user?.role || 'Unknown Role';

	const handleLogout = () => {
		if (window.confirm("Are you sure you want to logout?")) {
			localStorage.removeItem('user');
			navigate('/');
		}
	};

	const headerClass = isCustomer ? 'customer-header' : 'admin-header';
	const titleClass = isCustomer ? 'customer-page-title' : 'admin-page-title';
	const profileClass = isCustomer ? 'customer-user-profile' : 'admin-user-profile';
	const avatarClass = isCustomer ? 'customer-user-avatar' : 'admin-user-avatar';
	const nameClass = isCustomer ? 'customer-user-name' : 'admin-user-name';
	const roleClass = isCustomer ? 'customer-user-role' : 'admin-user-role';

	return (<header className={headerClass}>
		<h1 className={titleClass}>{title}</h1>
		<div className={profileClass} onClick={handleLogout}>
			<div className={avatarClass}>{userInitials}</div>
			<div style={{display: 'flex', flexDirection: 'column', lineHeight: '1.2'}}>
				<div className={nameClass}>{displayName}</div>
				<div className={roleClass}>
					@{username} • {displayRole}
				</div>
			</div>
		</div>
	</header>);
}

export default Header;