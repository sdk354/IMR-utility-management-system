import {useState, useEffect} from "react";
import {paymentService} from "../../services/paymentService";

function CustomerPayments() {
	const [payments, setPayments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [form, setForm] = useState({account: "", amount: "", method: ""});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		loadPayments();
	}, []);

	const loadPayments = async () => {
		try {
			setLoading(true);
			const data = await paymentService.getMyPayments();
			setPayments(data);
		} catch (err) {
			console.error("Failed to load payments:", err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const {name, value} = e.target;
		setForm(prev => ({...prev, [name]: value}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const paymentData = {
				billId: parseInt(form.account), amount: parseFloat(form.amount), paymentMethod: form.method
			};

			await paymentService.processPayment(paymentData);

			alert("Payment processed successfully!");
			setForm({account: "", amount: "", method: ""});
			await loadPayments();
		} catch (err) {
			alert(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (<>
			<div className="customer-page-header">
				<h1 className="customer-section-title">Payments</h1>
			</div>

			<div style={{marginBottom: "2.5rem"}}>
				<div className="customer-card">
					<h3 style={{
						marginBottom: "1.5rem",
						color: "#5d2e0f",
						borderBottom: "2px solid #f97316",
						paddingBottom: "0.75rem"
					}}>
						Make a Payment
					</h3>

					<form onSubmit={handleSubmit} style={{maxWidth: "600px"}}>
						<div className="customer-form-group">
							<label>Bill ID</label>
							<input
								type="text"
								name="account"
								value={form.account}
								onChange={handleChange}
								placeholder="Enter bill ID"
								required
							/>
						</div>

						<div className="customer-form-group">
							<label>Amount (Rs.)</label>
							<input
								type="number"
								name="amount"
								value={form.amount}
								onChange={handleChange}
								placeholder="Enter amount"
								required
							/>
						</div>

						<div className="customer-form-group">
							<label>Payment Method</label>
							<select
								name="method"
								value={form.method}
								onChange={handleChange}
								className="customer-select"
								required
							>
								<option value="" disabled>Select method...</option>
								<option value="Bank Transfer">Bank Transfer</option>
								<option value="Credit Card">Credit Card</option>
								<option value="Debit Card">Debit Card</option>
								<option value="Mobile Wallet">Mobile Wallet</option>
							</select>
						</div>

						<button
							type="submit"
							className="customer-btn-primary"
							style={{width: "100%"}}
							disabled={isSubmitting}
						>
							{isSubmitting ? "Processing..." : "Pay Now"}
						</button>
					</form>
				</div>
			</div>

			<div>
				<h3 style={{marginBottom: "1.5rem", color: "#5d2e0f"}}>Payment History</h3>
				<div className="customer-table-container">
					<table className="customer-table">
						<thead>
						<tr>
							<th>Payment ID</th>
							<th>Receipt No</th>
							<th>Date</th>
							<th>Method</th>
							<th>Amount</th>
						</tr>
						</thead>
						<tbody>
						{loading ? (<tr>
								<td colSpan="5" style={{textAlign: "center", padding: "2rem"}}>Loading...</td>
							</tr>) : payments.length > 0 ? (payments.map(p => (<tr key={p.id}>
									<td><strong>PAY-{String(p.id).padStart(3, '0')}</strong></td>
									<td>{p.receiptNo}</td>
									<td>{new Date(p.paymentDate).toLocaleDateString()}</td>
									<td>{p.paymentMethod}</td>
									<td><strong>Rs. {parseFloat(p.amount).toFixed(2)}</strong></td>
								</tr>))) : (<tr>
								<td colSpan="5" style={{textAlign: "center", padding: "2rem", color: "#a0714f"}}>No
									payments found
								</td>
							</tr>)}
						</tbody>
					</table>
				</div>
			</div>
		</>);
}

export default CustomerPayments;