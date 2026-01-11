import { useState, useEffect } from "react";
import { complaintService } from "../../services/complaintService";

function CustomerComplaints() {
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({ issueType: "", subject: "", description: "" });

	useEffect(() => {
		fetchTickets();
	}, []);

	const fetchTickets = async () => {
		try {
			setLoading(true);
			const data = await complaintService.getAllComplaints();
			setTickets(data);
		} catch (err) {
			console.error("Error loading tickets:", err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			// Send separate fields; the backend Controller handles the merging
			const payload = {
				type: form.issueType,
				subject: form.subject,
				description: form.description
			};
			await complaintService.createComplaint(payload);
			alert("Ticket submitted successfully!");
			setForm({ issueType: "", subject: "", description: "" });
			fetchTickets();
		} catch (err) {
			alert(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="customer-page-header">
				<h1 className="customer-section-title">Support Tickets</h1>
			</div>

			<div style={{ marginBottom: "2.5rem" }}>
				<div className="customer-card">
					<h3 style={{ marginBottom: "1.5rem", color: "#5d2e0f", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>
						Submit Support Request
					</h3>

					<form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
						<div className="customer-form-group">
							<label htmlFor="issue-type">Issue Type</label>
							<select id="issue-type" name="issueType" value={form.issueType} onChange={handleChange} className="customer-select" required>
								<option value="" disabled>Select issue type...</option>
								<option value="Billing Issue">Billing Issue</option>
								<option value="Meter Reading">Meter Reading</option>
								<option value="General Inquiry">General Inquiry</option>
								<option value="Payment Issue">Payment Issue</option>
								<option value="Connection Problem">Connection Problem</option>
							</select>
						</div>

						<div className="customer-form-group">
							<label htmlFor="subject">Subject</label>
							<input id="subject" type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Brief description" required />
						</div>

						<div className="customer-form-group">
							<label htmlFor="description">Description</label>
							<textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Details..." style={{ minHeight: "140px" }} required></textarea>
						</div>

						<button type="submit" className="customer-btn-primary" disabled={isSubmitting}>
							{isSubmitting ? "Submitting..." : "Submit Request"}
						</button>
					</form>
				</div>
			</div>

			<div>
				<h3 style={{ marginBottom: "1.5rem", color: "#5d2e0f" }}>My Support Tickets</h3>
				<div className="customer-table-container">
					<table className="customer-table">
						<thead>
						<tr>
							<th>Ticket ID</th>
							<th>Details</th>
							<th>Date</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
						</thead>
						<tbody>
						{loading ? (
							<tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>Loading tickets...</td></tr>
						) : tickets.length > 0 ? (
							tickets.map(t => (
								<tr key={t.id}>
									<td><strong>TKT-{String(t.id).padStart(3, '0')}</strong></td>
									{/* Shows the merged [Type] Subject: Description string */}
									<td style={{ maxWidth: "350px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
										{t.complaintText}
									</td>
									<td>{t.complaintDate ? new Date(t.complaintDate).toLocaleDateString() : 'N/A'}</td>
									<td>
                                <span className={`customer-status ${t.status?.toLowerCase() === "resolved" ? "completed" : "pending"}`}>
                                    {t.status}
                                </span>
									</td>
									<td>
										<button className="link" onClick={() => alert(t.complaintText)} style={{ background: "none", border: "none", color: "#f97316", fontWeight: "600", cursor: "pointer" }}>
											View
										</button>
									</td>
								</tr>
							))
						) : (
							<tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#a0714f" }}>No support tickets found</td></tr>
						)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default CustomerComplaints;