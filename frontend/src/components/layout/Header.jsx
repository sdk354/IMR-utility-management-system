import { useNavigate } from 'react-router-dom';

function Header({ title, isCustomer = false }) {
	const navigate = useNavigate();

	// 1. Retrieve user data from localStorage
	const userData = localStorage.getItem('user');
	const user = userData ? JSON.parse(userData) : null;

	// 2. Role mapping based on your database string values
	const roleMapping = {
		"Administrative Staff": "Administrative Staff",
		"Field Officer": "Field Officer",
		"Customer": "Customer",
		"Billing Clerk": "Billing Clerk",
		"Manager": "Manager",
		"ROLE_USER": "User"
	};

	// 3. Logic for initials (e.g., "carol_lee" -> CL)
	const getInitials = (name) => {
		if (!name || name === 'Guest') return "GU";
		const parts = name.split(/[_\s]/);
		if (parts.length >= 2 && parts[1][0]) {
			return (parts[0][0] + parts[1][0]).toUpperCase();
		}
		return name.slice(0, 2).toUpperCase();
	};

	// 4. Formatting the Display Name (e.g., "carol_lee" -> "Carol Lee")
	const formatDisplayName = (name) => {
		if (!name) return "Guest";
		return name
			.split(/[_\s]/)
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	};

	// 5. Resolve display values
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

	// Style classes
	const headerClass = isCustomer ? 'customer-header' : 'admin-header';
	const titleClass = isCustomer ? 'customer-page-title' : 'admin-page-title';
	const profileClass = isCustomer ? 'customer-user-profile' : 'admin-user-profile';
	const avatarClass = isCustomer ? 'customer-user-avatar' : 'admin-user-avatar';
	const nameClass = isCustomer ? 'customer-user-name' : 'admin-user-name';
	const roleClass = isCustomer ? 'customer-user-role' : 'admin-user-role';

	return (
		<header className={headerClass}>
			<h1 className={titleClass}>{title}</h1>
			<div className={profileClass} onClick={handleLogout}>
				<div className={avatarClass}>{userInitials}</div>
				<div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
					<div className={nameClass}>{displayName}</div>
					<div className={roleClass}>
						@{username} • {displayRole}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;