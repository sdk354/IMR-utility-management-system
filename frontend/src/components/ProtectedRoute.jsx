import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/authService';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({ allowedRoles, children }) => {
	const user = authService.getCurrentUser();

	// Debugging: This will show up in your Mac's Terminal/Inspector
	console.log("Protected Route Check:", {
		hasUser: !!user,
		role: user?.role,
		allowed: allowedRoles
	});

	// 1. If no user, send them back to start
	if (!user) {
		return <Navigate to="/" replace />;
	}

	// 2. Check if the role exists and is allowed
	// We use ?. to prevent "Cannot read property of undefined" white screens
	const userRole = user?.role;
	const isAllowed = allowedRoles.includes(userRole);

	if (!isAllowed) {
		return <NotFound />;
	}

	// 3. Render children (the Layout) or an Outlet if used as a wrapper
	return children ? children : <Outlet />;
};

export default ProtectedRoute;