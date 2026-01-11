import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {dashboardService} from '../../services/dashboardService';
import {
	AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function Dashboard() {
	const [stats, setStats] = useState({
		totalCustomers: 0, activeMeters: 0, outstandingBalance: 0, todaysCollections: 0, revenueTrend: []
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				const data = await dashboardService.getStats();
				setStats(data);
			} catch (error) {
				console.error("Failed to load dashboard stats:", error);
			} finally {
				setLoading(false);
			}
		};
		loadDashboardData();
	}, []);

	const formatCurrency = (val) => {
		return new Intl.NumberFormat('en-LK', {style: 'currency', currency: 'LKR'}).format(val || 0);
	};

	const chartData = stats.revenueTrend ? stats.revenueTrend.map(item => ({
		name: item[0], revenue: item[1]
	})) : [];

	return (<div className="admin-page">
		<div className="admin-dashboard-grid">
			<div className="admin-summary-card">
				<div className="admin-summary-icon blue">
					<span className="icon-users"></span>
				</div>
				<div>
					<div className="admin-summary-title">Total Customers</div>
					<div className="admin-summary-value">{loading ? "..." : stats.totalCustomers}</div>
					<div className="admin-summary-change up">Live Data</div>
				</div>
			</div>

			<div className="admin-summary-card">
				<div className="admin-summary-icon green">
					<span className="icon-gauge"></span>
				</div>
				<div>
					<div className="admin-summary-title">Active Meters</div>
					<div className="admin-summary-value">{loading ? "..." : stats.activeMeters}</div>
					<div className="admin-summary-change up">System Wide</div>
				</div>
			</div>

			<div className="admin-summary-card">
				<div className="admin-summary-icon orange">
					<span className="icon-money"></span>
				</div>
				<div>
					<div className="admin-summary-title">Outstanding Balance</div>
					<div
						className="admin-summary-value">{loading ? "..." : formatCurrency(stats.outstandingBalance)}</div>
					<div className="admin-summary-change down">Unpaid Bills</div>
				</div>
			</div>

			<div className="admin-summary-card">
				<div className="admin-summary-icon teal">
					<span className="icon-collection"></span>
				</div>
				<div>
					<div className="admin-summary-title">Today's Collections</div>
					<div
						className="admin-summary-value">{loading ? "..." : formatCurrency(stats.todaysCollections)}</div>
					<div className="admin-summary-change up">{new Date().toLocaleDateString()}</div>
				</div>
			</div>
		</div>

		<div className="admin-card" style={{marginTop: '2rem'}}>
			<div className="admin-card-header">
				<h3 className="admin-section-title">Monthly Revenue Trend</h3>
				<button className="admin-btn-secondary">Export</button>
			</div>

			<div style={{width: '100%', height: 350, marginTop: '1rem'}}>
				{loading ? (
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
						Loading Chart...
					</div>) : (<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={chartData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
						<defs>
							<linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
								<stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							tick={{fill: '#6b7280', fontSize: 12}}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{fill: '#6b7280', fontSize: 12}}
							tickFormatter={(val) => `Rs.${val / 1000}k`}
						/>
						<Tooltip
							formatter={(value) => [formatCurrency(value), "Revenue"]}
							contentStyle={{
								borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
							}}
						/>
						<Area
							type="monotone"
							dataKey="revenue"
							stroke="#3b82f6"
							strokeWidth={3}
							fillOpacity={1}
							fill="url(#colorRev)"
						/>
					</AreaChart>
				</ResponsiveContainer>)}
			</div>
		</div>

		<div className="admin-flex-row" style={{marginTop: '2rem', gap: '1.5rem'}}>
			<div className="admin-card" style={{flex: 1}}>
				<h3 className="admin-section-title">Quick Actions</h3>
				<div className="admin-quick-actions">
					<Link to="/admin/customers/add">
						<button className="admin-quick-btn blue"><span className="icon-plus"></span> Add New
							Customer
						</button>
					</Link>
					<Link to="/admin/meters/register">
						<button className="admin-quick-btn indigo"><span className="icon-gauge"></span> Register New
							Meter
						</button>
					</Link>
					<Link to="/admin/payments/recordpayment">
						<button className="admin-quick-btn green"><span className="icon-credit-card"></span> Record
							Payment
						</button>
					</Link>
					<Link to="/admin/tariffs/add">
						<button className="admin-quick-btn purple"><span className="icon-tag"></span> Add Tariff
						</button>
					</Link>
					<Link to="/admin/complaints">
						<button className="admin-quick-btn orange"><span className="icon-message-alert"></span> View
							Complaints
						</button>
					</Link>
					<Link to="/admin/reports">
						<button className="admin-quick-btn gray"><span className="icon-chart"></span> View Reports
						</button>
					</Link>
				</div>
			</div>
		</div>
	</div>);
}

export default Dashboard;