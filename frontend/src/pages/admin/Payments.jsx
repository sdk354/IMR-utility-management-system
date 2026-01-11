import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';

function Payments() {
	const [payments, setPayments] = useState([]);
	const [loading, setLoading] = useState(true);

	// Added the name formatter
	const formatToDisplayName = (username) => {
		if (!username || username === 'Unassigned') return username || 'Unassigned';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const data = await paymentService.getAllPayments();
				setPayments(data);
			} catch (error) {
				console.error("Fetch error:", error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPayments();
	}, []);

	return (
		<div className="admin-page">
			<div className="admin-table-container">
				<div className="admin-page-header">
					<h3>Payment Management</h3>
					<div className="admin-page-actions">
						<Link to="/admin/payments/recordpayment">
							<button className="admin-btn-primary">+ Record Payment</button>
						</Link>
					</div>
				</div>
				<table className="admin-table">
					<thead>
					<tr>
						<th>Payment ID</th>
						<th>Customer</th>
						<th>Bill ID</th>
						<th>Amount</th>
						<th>Method</th>
						<th>Date</th>
					</tr>
					</thead>
					<tbody>
					{loading ? (
						<tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
					) : (
						payments.map((p) => (
							<tr key={p.paymentID}>
								<td>PAY-{p.paymentID}</td>
								{/* Applied formatToDisplayName here */}
								<td>{formatToDisplayName(p.username)}</td>
								<td>#{p.billID}</td>
								<td style={{ fontWeight: 'bold' }}>
									Rs. {p.amount?.toLocaleString()}
								</td>
								<td>{p.paymentMethod}</td>
								<td>{p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : 'N/A'}</td>
							</tr>
						))
					)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Payments;