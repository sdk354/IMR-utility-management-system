import { Link } from "react-router-dom";

export default function NotFound() {
	// 1. Check for logged-in user
	const userData = localStorage.getItem('user');
	const user = userData ? JSON.parse(userData) : null;

	// 2. Determine the dynamic path and label
	let destinationPath = "/";
	let destinationLabel = "Go back";

	if (user) {
		destinationLabel = "Go to Dashboard";
		// Check role to determine which dashboard to link to
		destinationPath = user.role === "Customer" ? "/customer/dashboard" : "/admin/dashboard";
	}

	return (
		<div className="app-center">
			<div className="card center">
				{/* Visual indicator for a 404 error */}
				<h1 style={{ fontSize: '4rem', margin: 0, color: '#6b7280' }}>404</h1>
				<h3>Page not found</h3>
				<div className="mt-2 small">
					{user
						? "The page you are looking for doesn't exist or you don't have permission."
						: "Try returning to the portal selection."}
				</div>

				<div className="mt-4">
					<Link to={destinationPath} className="link">
						{destinationLabel}
					</Link>
				</div>
			</div>
		</div>
	);
}