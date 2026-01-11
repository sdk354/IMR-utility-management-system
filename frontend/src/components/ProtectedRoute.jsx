import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {authService} from '../services/authService';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({allowedRoles, children}) => {
	const user = authService.getCurrentUser();

	console.log("Protected Route Check:", {
		hasUser: !!user, role: user?.role, allowed: allowedRoles
	});

	if (!user) {
		return <Navigate to="/" replace/>;
	}

	const userRole = user?.role;
	const isAllowed = allowedRoles.includes(userRole);

	if (!isAllowed) {
		return <NotFound/>;
	}

	return children ? children : <Outlet/>;
};

export default ProtectedRoute;