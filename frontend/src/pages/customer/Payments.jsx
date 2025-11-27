import { useState } from "react";

const MOCK_PAYMENTS = [
  { id: "PAY-001", date: "2024-01-18", method: "Bank Transfer", amount: 2500, status: "Completed" },
  { id: "PAY-002", date: "2024-01-10", method: "Credit Card", amount: 2500, status: "Completed" },
  { id: "PAY-003", date: "2024-01-05", method: "Mobile Wallet", amount: 2500, status: "Completed" },
];

function CustomerPayments() {
  const [form, setForm] = useState({ account: "", amount: "", method: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ account: "", amount: "", method: "" });
  };

  return (
    <>
      <div className="customer-page-header">
        <h1 className="customer-section-title">Payments</h1>
        <div className="customer-page-actions">
          <button className="customer-btn-secondary">Download</button>
          <button className="customer-btn-primary">Print History</button>
        </div>
      </div>

      <div style={{ marginBottom: "2.5rem" }}>
        <div className="customer-card">
          <h3 style={{ marginBottom: "1.5rem", color: "#5d2e0f", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Make a Payment</h3>

          <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
            <div className="customer-form-group">
              <label>Account Number</label>
              <input type="text" name="account" value={form.account} onChange={handleChange} placeholder="Enter account number" />
            </div>

            <div className="customer-form-group">
              <label>Amount (Rs.)</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Enter amount" />
            </div>

            <div className="customer-form-group">
              <label>Payment Method</label>
              <select name="method" value={form.method} onChange={handleChange} className="customer-select" defaultValue="">
                <option value="" disabled>Select payment method...</option>
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Mobile Wallet</option>
              </select>
            </div>

            <button type="submit" className="customer-btn-primary" style={{ width: "100%" }}>Pay Now</button>
          </form>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1.5rem", color: "#5d2e0f" }}>Payment History</h3>
        <div className="customer-table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PAYMENTS && MOCK_PAYMENTS.length > 0 ? (
                MOCK_PAYMENTS.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.id}</strong></td>
                    <td>{p.date}</td>
                    <td>{p.method}</td>
                    <td><strong>Rs. {p.amount.toFixed(2)}</strong></td>
                    <td><span className={`customer-status ${p.status === "Completed" ? "completed" : "pending"}`}>{p.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#a0714f" }}>No payment history found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomerPayments;
