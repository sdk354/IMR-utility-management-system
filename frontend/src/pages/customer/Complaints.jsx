import { useState } from "react";

const MOCK_TICKETS = [
  { id: "TKT-001", subject: "Billing discrepancy", type: "Billing Issue", date: "2024-01-18", status: "In Progress" },
  { id: "TKT-002", subject: "Meter reading question", type: "General Inquiry", date: "2024-01-10", status: "Resolved" },
  { id: "TKT-003", subject: "Payment not received", type: "Payment Issue", date: "2024-01-05", status: "Resolved" },
];

function CustomerComplaints() {
  const [form, setForm] = useState({ issueType: "", subject: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ issueType: "", subject: "", description: "" });
  };

  return (
    <>
      <div className="customer-page-header">
        <h1 className="customer-section-title">Support Tickets</h1>
        <div className="customer-page-actions">
          <button className="customer-btn-secondary">Export</button>
          <button className="customer-btn-primary">Print</button>
        </div>
      </div>

      <div style={{ marginBottom: "2.5rem" }}>
        <div className="customer-card">
          <h3 style={{ marginBottom: "1.5rem", color: "#5d2e0f", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Submit Support Request</h3>

          <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
            <div className="customer-form-group">
              <label htmlFor="issue-type">Issue Type</label>
              <select id="issue-type" name="issueType" value={form.issueType} onChange={handleChange} className="customer-select" defaultValue="">
                <option value="" disabled>Select issue type...</option>
                <option>Billing Issue</option>
                <option>Meter Reading</option>
                <option>General Inquiry</option>
                <option>Payment Issue</option>
                <option>Connection Problem</option>
              </select>
            </div>

            <div className="customer-form-group">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Brief description of your issue" />
            </div>

            <div className="customer-form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Provide detailed information about your issue" style={{ minHeight: "140px" }} ></textarea>
            </div>

            <button type="submit" className="customer-btn-primary">Submit Request</button>
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
                <th>Subject</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TICKETS && MOCK_TICKETS.length > 0 ? (
                MOCK_TICKETS.map(t => (
                  <tr key={t.id}>
                    <td><strong>{t.id}</strong></td>
                    <td>{t.subject}</td>
                    <td>{t.type}</td>
                    <td>{t.date}</td>
                    <td><span className={`customer-status ${t.status === "Resolved" ? "completed" : "pending"}`}>{t.status}</span></td>
                    <td><a href="#" className="link" style={{ color: "#f97316", fontWeight: "600" }}>View</a></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#a0714f" }}>No support tickets found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomerComplaints;
