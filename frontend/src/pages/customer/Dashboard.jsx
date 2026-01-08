import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerPayments from "./Payments";
import CustomerComplaints from "./Complaints";
import Profile from "./Profile";

function Dashboard() {
	const [view] = useState("home");
	const navigate = useNavigate();

	// Define theme colors for easy consistency
	const colors = {
		primary: "#800000",      // Maroon
		primaryDark: "#4a0404",  // Darker Maroon
		bgLight: "#f2d4d4",      // Light Pink/Maroon for icon backgrounds
		textMuted: "#994d4d",    // Muted Maroon for labels
	};

	return (
		<div>
			{view === "home" && (
				<>
					<div className="customer-page-header">
						<h1 className="customer-section-title">Dashboard</h1>
					</div>

					{/* Welcome Banner - Updated to Maroon */}
					<div style={{
						background: colors.primary,
						padding: "2rem",
						borderRadius: "12px",
						color: "white",
						marginBottom: "2rem",
						boxShadow: "0 4px 12px rgba(128, 0, 0, 0.15)"
					}} className="customer-welcome-banner">
						<h2 style={{ marginBottom: "1.5rem" }}>Welcome back!</h2>

						<div style={{
							display: "flex",
							gap: "1rem",
							flexWrap: "wrap"
						}}>
							<button
								onClick={() => navigate("/customer/bills")}
								className="customer-btn-primary"
								style={{ background: "white", color: colors.primary, fontWeight: "bold" }}
							>
								View Bills
							</button>
							<button
								onClick={() => navigate("/customer/payment")}
								className="customer-btn-primary"
								style={{ background: "white", color: colors.primary, fontWeight: "bold" }}
							>
								Make Payment
							</button>
							<button
								onClick={() => navigate("/customer/support")}
								className="customer-btn-primary"
								style={{ background: "white", color: colors.primary, fontWeight: "bold" }}
							>
								Get Support
							</button>
						</div>
					</div>

					{/* Stats Cards */}
					<div className="customer-dashboard-grid">
						<div className="customer-summary-card">
							<div className="customer-summary-icon" style={{ background: colors.bgLight }}>
								<span style={{ fontSize: "1.5rem", color: colors.primary }}>⚡</span>
							</div>
							<div>
								<div className="customer-summary-title" style={{ color: colors.textMuted }}>Current Month Usage</div>
								<div className="customer-summary-value" style={{ color: colors.primaryDark }}>456 kWh</div>
								<div className="customer-summary-change up">↑ 8% from last month</div>
							</div>
						</div>

						<div className="customer-summary-card">
							<div className="customer-summary-icon" style={{ background: colors.bgLight }}>
								<span style={{ fontSize: "1.5rem", color: colors.primary }}>💳</span>
							</div>
							<div>
								<div className="customer-summary-title" style={{ color: colors.textMuted }}>Last Bill Amount</div>
								<div className="customer-summary-value" style={{ color: colors.primaryDark }}>Rs. 24,500</div>
								{/* Changed "Due" color to a dark red/brown instead of orange */}
								<div className="customer-summary-change" style={{ color: "#7f1d1d" }}>Due: Feb 15</div>
							</div>
						</div>

						<div className="customer-summary-card">
							<div className="customer-summary-icon" style={{ background: colors.bgLight }}>
								<span style={{ fontSize: "1.5rem", color: colors.primary }}>📊</span>
							</div>
							<div>
								<div className="customer-summary-title" style={{ color: colors.textMuted }}>Average Daily Usage</div>
								<div className="customer-summary-value" style={{ color: colors.primaryDark }}>15.2 kWh</div>
								<div className="customer-summary-change" style={{ color: "#6b7280" }}>Per day</div>
							</div>
						</div>

						<div className="customer-summary-card">
							<div className="customer-summary-icon" style={{ background: "#d1fae5" }}>
								<span style={{ fontSize: "1.5rem", color: "#065f46" }}>✓</span>
							</div>
							<div>
								<div className="customer-summary-title" style={{ color: colors.textMuted }}>Account Status</div>
								<div className="customer-summary-value" style={{ color: colors.primaryDark }}>Active</div>
								<div className="customer-summary-change up">All payments up to date</div>
							</div>
						</div>
					</div>

					{/* Graph Section */}
					<div className="customer-card" style={{ marginTop: "2rem" }}>
						<h3 style={{ marginBottom: "1.5rem", color: colors.primaryDark }}>Monthly Consumption Trend</h3>
						<div style={{
							display: "flex",
							alignItems: "flex-end",
							gap: "12px",
							height: "300px",
							paddingBottom: "1rem",
							overflow: "auto"
						}}>
							{[
								220, 250, 230, 260, 245, 270, 255, 265, 240, 250, 245, 255
							].map((height, i) => (
								<div key={i} style={{ textAlign: "center", flex: 1, minWidth: "30px" }}>
									<div
										style={{
											height: `${height}px`,
											background: colors.primary, // Maroon bars
											borderRadius: "5px 5px 0 0",
											margin: "0 auto",
											width: "80%",
											maxWidth: "40px",
											opacity: 0.9,
											transition: "opacity 0.2s"
										}}
										onMouseOver={(e) => e.target.style.opacity = 1}
										onMouseOut={(e) => e.target.style.opacity = 0.9}
									></div>
									<span style={{ fontSize: "0.75rem", color: colors.textMuted, marginTop: "0.5rem", display: "block" }}>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}
                  </span>
								</div>
							))}
						</div>
					</div>
				</>
			)}

			{view === "payment" && <CustomerPayments />}
			{view === "support" && <CustomerComplaints />}
			{view === "profile" && <Profile />}

			{view === "bills" && (
				<>
					<h2 className="customer-section-title">My Bills</h2>
					<div className="customer-table-container">
						<table className="customer-table">
							<thead>
							<tr>
								<th>Bill ID</th>
								<th>Period</th>
								<th>Amount</th>
								<th>Due Date</th>
								<th>Status</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>BILL-001</td>
								<td>Jan 2024</td>
								<td>Rs. 24,500</td>
								<td>2024-02-15</td>
								<td>
									<span className="customer-status pending">Due</span>
								</td>
							</tr>
							<tr>
								<td>BILL-002</td>
								<td>Dec 2023</td>
								<td>Rs. 22,100</td>
								<td>2024-01-15</td>
								<td>
									<span className="customer-status completed">Paid</span>
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
}

export default Dashboard;