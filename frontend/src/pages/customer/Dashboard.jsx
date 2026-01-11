import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {customerService} from "../../services/customerService";

function Dashboard() {
	const [stats, setStats] = useState({
		lastBillAmount: 0, dueDate: "N/A", consumptionTrend: [], currentUsage: 0, accountStatus: "Loading..."
	});
	const [bills, setBills] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				setLoading(true);
				const [statsData, billsData] = await Promise.all([customerService.getDashboardStats(), customerService.getBills()]);

				setStats(statsData);
				setBills(billsData);
			} catch (err) {
				console.error("Error loading customer data", err);
			} finally {
				setLoading(false);
			}
		};
		loadDashboardData();
	}, []);

	const colors = {
		primary: "#800000", primaryDark: "#4a0404", bgLight: "#f2d4d4", textMuted: "#994d4d"
	};

	return (<div>
		<div className="customer-page-header">
			<h1 className="customer-section-title">Dashboard</h1>
		</div>


		<div style={{
			background: colors.primary, padding: "2rem", borderRadius: "12px", color: "white", marginBottom: "2rem"
		}} className="customer-welcome-banner">
			<h2 style={{marginBottom: "1.5rem"}}>Welcome back!</h2>
			<div style={{display: "flex", gap: "1rem", flexWrap: "wrap"}}>
				<button
					onClick={() => navigate("/customer/bills")}
					style={{
						background: "white",
						color: colors.primary,
						border: "none",
						padding: "0.5rem 1rem",
						borderRadius: "6px",
						fontWeight: "bold",
						cursor: "pointer"
					}}
				>
					View Bills
				</button>
				<button
					onClick={() => navigate("/customer/payment")}
					style={{
						background: "white",
						color: colors.primary,
						border: "none",
						padding: "0.5rem 1rem",
						borderRadius: "6px",
						fontWeight: "bold",
						cursor: "pointer"
					}}
				>
					Make Payment
				</button>
			</div>
		</div>

		<div className="customer-dashboard-grid"
			 style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem"}}>

			<div className="customer-summary-card" style={{
				background: "white",
				padding: "1.5rem",
				borderRadius: "12px",
				display: "flex",
				alignItems: "center",
				gap: "1rem",
				boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
			}}>
				<div className="customer-summary-icon" style={{
					background: colors.bgLight,
					width: "50px",
					height: "50px",
					borderRadius: "10px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<span style={{fontSize: "1.5rem", color: colors.primary}}>⚡</span>
				</div>
				<div className="admin-summary-text-wrapper">
					<div className="customer-summary-title"
						 style={{color: colors.textMuted, fontSize: "0.85rem"}}>Current Usage
					</div>
					<div className="customer-summary-value"
						 style={{color: colors.primaryDark, fontSize: "1.25rem", fontWeight: "bold"}}>
						{loading ? "..." : `${stats.currentUsage} kWh`}
					</div>
				</div>
			</div>


			<div className="customer-summary-card" style={{
				background: "white",
				padding: "1.5rem",
				borderRadius: "12px",
				display: "flex",
				alignItems: "center",
				gap: "1rem",
				boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
			}}>
				<div className="customer-summary-icon" style={{
					background: colors.bgLight,
					width: "50px",
					height: "50px",
					borderRadius: "10px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<span style={{fontSize: "1.5rem", color: colors.primary}}>💳</span>
				</div>
				<div className="admin-summary-text-wrapper">
					<div className="customer-summary-title"
						 style={{color: colors.textMuted, fontSize: "0.85rem"}}>Last Bill Amount
					</div>
					<div className="customer-summary-value"
						 style={{color: colors.primaryDark, fontSize: "1.25rem", fontWeight: "bold"}}>
						Rs. {loading ? "..." : stats.lastBillAmount.toLocaleString()}
					</div>
					<div className="customer-summary-change" style={{color: "#7f1d1d", fontSize: "0.8rem"}}>
						Due: {stats.dueDate}
					</div>
				</div>
			</div>


			<div className="customer-summary-card" style={{
				background: "white",
				padding: "1.5rem",
				borderRadius: "12px",
				display: "flex",
				alignItems: "center",
				gap: "1rem",
				boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
			}}>
				<div className="customer-summary-icon" style={{
					background: "#d1fae5",
					width: "50px",
					height: "50px",
					borderRadius: "10px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<span style={{fontSize: "1.5rem", color: "#065f46"}}>✓</span>
				</div>
				<div className="admin-summary-text-wrapper">
					<div className="customer-summary-title"
						 style={{color: colors.textMuted, fontSize: "0.85rem"}}>Account Status
					</div>
					<div className="customer-summary-value"
						 style={{color: colors.primaryDark, fontSize: "1.25rem", fontWeight: "bold"}}>
						{loading ? "..." : stats.accountStatus}
					</div>
				</div>
			</div>
		</div>


		<div className="customer-card"
			 style={{marginTop: "2rem", background: "white", padding: "1.5rem", borderRadius: "12px"}}>
			<h3 style={{color: colors.primaryDark, marginBottom: "1.5rem"}}>Monthly Consumption Trend</h3>
			<div className="graph-container"
				 style={{display: "flex", alignItems: "flex-end", height: "200px", gap: "12px"}}>
				{stats.consumptionTrend && stats.consumptionTrend.map((usage, i) => (
					<div key={i} style={{flex: 1, textAlign: "center"}}>
						<div style={{
							height: `${(usage / 600) * 100}%`,
							background: colors.primary,
							borderRadius: "4px 4px 0 0",
							transition: "height 0.3s ease"
						}} title={`${usage} kWh`}></div>
						<span style={{fontSize: "0.7rem", color: colors.textMuted}}>M{i + 1}</span>
					</div>))}
			</div>
		</div>


		<div className="customer-card"
			 style={{marginTop: "2rem", background: "white", padding: "1.5rem", borderRadius: "12px"}}>
			<h3 style={{color: colors.primaryDark, marginBottom: "1.5rem"}}>Recent Bills</h3>
			<div className="customer-table-container" style={{overflowX: "auto"}}>
				<table className="customer-table" style={{width: "100%", borderCollapse: "collapse"}}>
					<thead>
					<tr style={{textAlign: "left", borderBottom: "1px solid #eee"}}>
						<th style={{padding: "1rem"}}>Bill ID</th>
						<th style={{padding: "1rem"}}>Date</th>
						<th style={{padding: "1rem"}}>Amount</th>
						<th style={{padding: "1rem"}}>Status</th>
					</tr>
					</thead>
					<tbody>
					{bills.map((bill) => (<tr key={bill.id} style={{borderBottom: "1px solid #fafafa"}}>
						<td style={{padding: "1rem"}}>#{bill.id}</td>
						<td style={{padding: "1rem"}}>{bill.billDate || bill.issuedDate}</td>
						<td style={{padding: "1rem"}}>Rs. {bill.totalAmount.toLocaleString()}</td>
						<td style={{padding: "1rem"}}>
                               <span style={{
								   padding: "4px 8px",
								   borderRadius: "4px",
								   fontSize: "0.8rem",
								   background: bill.status === "Paid" ? "#d1fae5" : "#fee2e2",
								   color: bill.status === "Paid" ? "#065f46" : "#991b1b"
							   }}>
                                  {bill.status}
                               </span>
						</td>
					</tr>))}
					</tbody>
				</table>
			</div>
		</div>
	</div>);
}

export default Dashboard;