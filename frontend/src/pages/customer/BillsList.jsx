import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customerService } from "../../services/customerService";

export default function BillsList() {
	const [bills, setBills] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBills = async () => {
			try {
				setLoading(true);
				// This calls apiRequest("/bills/my-bills") via your customerService
				const data = await customerService.getBills();
				setBills(data || []);
			} catch (error) {
				console.error("Failed to fetch bills:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchBills();
	}, []);

	const formatCurrency = (val) => {
		return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(val || 0);
	};

	return (
		<>
			<div className="customer-page-header">
				<h1 className="customer-section-title">My Bills</h1>
			</div>
			<div className="customer-table-container">
				<table className="customer-table">
					<thead>
					<tr>
						<th>Bill ID</th>
						<th>Bill Date</th>
						<th>Usage</th>
						<th>Amount</th>
						<th>Due Date</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
					</thead>
					<tbody>
					{loading ? (
						<tr><td colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>Loading...</td></tr>
					) : bills.length > 0 ? (
						bills.map(b => (
							<tr key={b.id}>
								<td><strong>#{b.id}</strong></td>
								<td>{b.billDate || b.issuedDate}</td>
								<td>{b.totalConsumption} kWh</td>
								<td><strong>{formatCurrency(b.totalAmount)}</strong></td>
								<td>{b.dueDate}</td>
								<td>
                    <span className={`customer-status ${b.status?.toLowerCase() === "paid" ? "completed" : "pending"}`}>
                      {b.status}
                    </span>
								</td>
								<td>
									<Link to={`/customer/bills/${b.id}`} className="link" style={{ color: "#800000", fontWeight: "600" }}>View</Link>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "#800000" }}>
								No bills found in your account history.
							</td>
						</tr>
					)}
					</tbody>
				</table>
			</div>
		</>
	);
}