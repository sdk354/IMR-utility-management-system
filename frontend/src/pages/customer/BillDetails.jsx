import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { customerService } from "../../services/customerService";

export default function BillDetails() {
	const { id } = useParams();
	const [bill, setBill] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBill = async () => {
			try {
				setLoading(true);
				const data = await customerService.getBillById(id);
				setBill(data);
			} catch (error) {
				console.error("Failed to load bill details:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchBill();
	}, [id]);

	if (loading) return <div className="customer-card">Loading details...</div>;

	if (!bill) return (
		<>
			<div className="customer-page-header">
				<h1 className="customer-section-title">Bill Not Found</h1>
			</div>
			<div className="customer-card">
				<p className="small" style={{ marginBottom: "1rem" }}>The bill you're looking for doesn't exist.</p>
				<Link to="/customer/bills" className="customer-btn-primary" style={{ display: "inline-block" }}>← Back to Bills</Link>
			</div>
		</>
	);

	return (
		<>
			<div className="customer-page-header">
				<h1 className="customer-section-title">Bill #{bill.id}</h1>
				<Link to="/customer/bills" className="link" style={{ color: "#f97316" }}>← Back to Bills</Link>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
				{/* Bill Summary */}
				<div className="customer-card">
					<h3 style={{ color: "#5d2e0f", marginBottom: "1.5rem", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Billing Period</h3>
					<div style={{ marginBottom: "1.5rem" }}>
						<div className="small">Issued Date</div>
						<div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#5d2e0f" }}>{bill.billDate || bill.issuedDate}</div>
					</div>
					<div style={{ marginBottom: "1.5rem" }}>
						<div className="small">Due Date</div>
						<div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#5d2e0f" }}>{bill.dueDate}</div>
					</div>
					<div>
						<div className="small">Usage</div>
						<div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f97316" }}>{bill.totalConsumption} kWh</div>
					</div>
				</div>

				{/* Payment Section */}
				<div className="customer-card">
					<h3 style={{ color: "#5d2e0f", marginBottom: "1.5rem", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Payment Details</h3>
					<div style={{ marginBottom: "1.5rem" }}>
						<div className="small">Total Amount Due</div>
						<div style={{ fontSize: "2rem", fontWeight: 900, color: "#f97316" }}>Rs. {bill.totalAmount?.toFixed(2)}</div>
					</div>
					<div style={{ marginBottom: "1.5rem" }}>
						<div className="small">Status</div>
						<span className={`customer-status ${bill.status?.toLowerCase() === "paid" ? "completed" : "pending"}`} style={{ display: "inline-block", marginTop: "0.5rem" }}>
              {bill.status}
            </span>
					</div>
					{bill.status?.toLowerCase() !== "paid" && (
						<Link to="/customer/payments" className="customer-btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
							Pay Now
						</Link>
					)}
				</div>
			</div>

			{/* Bill Breakdown */}
			<div className="customer-card">
				<h3 style={{ color: "#5d2e0f", marginBottom: "1.5rem", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Bill Breakdown</h3>
				<table className="customer-table">
					<tbody>
					<tr>
						<td>Base Charge</td>
						<td style={{ textAlign: "right", fontWeight: 600 }}>Rs. 500.00</td>
					</tr>
					<tr>
						<td>Consumption Charge</td>
						<td style={{ textAlign: "right", fontWeight: 600 }}>
							Rs. {(bill.totalAmount - 500 > 0 ? bill.totalAmount - 500 : 0).toFixed(2)}
						</td>
					</tr>
					<tr style={{ borderTop: "2px solid #ffd4a8" }}>
						<td style={{ fontWeight: 700, fontSize: "1.1rem", color: "#5d2e0f" }}>Total Amount</td>
						<td style={{ textAlign: "right", fontWeight: 700, fontSize: "1.1rem", color: "#f97316" }}>
							Rs. {bill.totalAmount?.toFixed(2)}
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}