import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { billService } from '../../services/billService';

function Billing() {
	const [bills, setBills] = useState([]);
	const [loading, setLoading] = useState(true);

	// Added the name formatter
	const formatToDisplayName = (username) => {
		if (!username || username === 'Unassigned' || username === 'N/A') return username || 'N/A';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	useEffect(() => {
		const fetchBills = async () => {
			try {
				const data = await billService.getAllBills(false, true);
				setBills(data);
			} catch (error) {
				console.error("Fetch failed:", error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchBills();
	}, []);

	const getStatusClass = (status) => {
		return status === 'Paid' ? 'admin-status completed' : 'admin-status pending';
	};

	return (
		<div className="admin-page">
			<div className="admin-table-container">
				<div className="admin-page-header">
					<h3>Billing Management</h3>
					<div className="admin-page-actions">
						<Link to="/admin/billing/add">
							<button className="admin-btn-primary">+ New Bill</button>
						</Link>
					</div>
				</div>

				<table className="admin-table">
					<thead>
					<tr>
						<th>Bill ID</th>
						<th>Customer</th>
						<th>Period</th>
						<th>Amount</th>
						<th>Issued Date</th>
						<th>Due Date</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{loading ? (
						<tr><td colSpan="8" style={{ textAlign: 'center' }}>Loading...</td></tr>
					) : (
						bills.map((bill) => (
							<tr key={bill.billID}>
								<td>#{bill.billID}</td>
								{/* Applied formatToDisplayName here */}
								<td>{formatToDisplayName(bill.user?.username)}</td>
								<td>
									{bill.billingPeriodStart} to {bill.billingPeriodEnd}
								</td>
								<td style={{ fontWeight: 'bold' }}>
									Rs. {bill.totalAmount?.toLocaleString()}
								</td>
								<td>{bill.issuedDate}</td>
								<td>{bill.dueDate}</td>
								<td>
                            <span className={getStatusClass(bill.status)}>
                                {bill.status}
                            </span>
								</td>
								<td>
									<Link to={`/admin/billing/add?edit=${bill.billID}`}>
										<button className="admin-btn-secondary">Edit</button>
									</Link>
								</td>
							</tr>
						))
					)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Billing;