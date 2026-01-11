import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

function PastPayments() {
	const { id } = useParams(); // Grabs the ID from the URL (/admin/customers/view/:id)
	const navigate = useNavigate();

	const [payments, setPayments] = useState([]);
	const [customerName, setCustomerName] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				// 1. Fetch the user details to display their name in the header
				const user = await apiRequest(`/users/${id}`);
				setCustomerName(user.username);

				// 2. Fetch the payments linked to this specific user ID
				const paymentData = await apiRequest(`/payments/user/${id}`);
				setPayments(paymentData);
			} catch (error) {
				console.error("Error fetching payment history:", error);
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchHistory();
	}, [id]);

	const formatCurrency = (val) => {
		return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(val || 0);
	};

	return (
		<div className="admin-page">
			<div className="admin-table-container">
				<div className="admin-page-header">
					<h3>Past Payments for: <span style={{color: '#3b82f6'}}>{customerName || "..."}</span></h3>
					<button onClick={() => navigate(-1)} className="admin-btn-secondary">
						← Back to Customers
					</button>
				</div>

				<table className="admin-table">
					<thead>
					<tr>
						<th>Payment ID</th>
						<th>Bill Number</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Method</th>
					</tr>
					</thead>
					<tbody>
					{loading ? (
						<tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading payment history...</td></tr>
					) : payments.length === 0 ? (
						<tr><td colSpan="5" style={{ textAlign: 'center' }}>No payment records found for this customer.</td></tr>
					) : (
						payments.map((payment) => (
							<tr key={payment.id}>
								<td>PAY-{payment.id.toString().padStart(4, '0')}</td>
								<td>{payment.bill ? `BILL-${payment.bill.id}` : 'N/A'}</td>
								<td>{formatCurrency(payment.amountPaid)}</td>
								<td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
								<td>{payment.paymentMethod || 'Cash'}</td>
							</tr>
						))
					)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default PastPayments;