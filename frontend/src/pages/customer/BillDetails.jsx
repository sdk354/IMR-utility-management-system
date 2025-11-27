import { useParams, Link } from "react-router-dom";
import { MOCK_BILLS } from "../../data/mock";

export default function BillDetails() {
  const { id } = useParams();
  const bill = MOCK_BILLS.find(b => b.id === id);
  
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
        <h1 className="customer-section-title">Bill {bill.id}</h1>
        <Link to="/customer/bills" className="link" style={{ color: "#f97316" }}>← Back to Bills</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Bill Summary */}
        <div className="customer-card">
          <h3 style={{ color: "#5d2e0f", marginBottom: "1.5rem", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Billing Period</h3>
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="small">Period</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#5d2e0f" }}>{bill.date}</div>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="small">Due Date</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#5d2e0f" }}>{bill.due}</div>
          </div>
          <div>
            <div className="small">Usage</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f97316" }}>{bill.usage}</div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="customer-card">
          <h3 style={{ color: "#5d2e0f", marginBottom: "1.5rem", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Payment Details</h3>
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="small">Total Amount Due</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#f97316" }}>Rs. {bill.amount.toFixed(2)}</div>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="small">Status</div>
            <span className={`customer-status ${bill.status === "Paid" ? "completed" : "pending"}`} style={{ display: "inline-block", marginTop: "0.5rem" }}>
              {bill.status}
            </span>
          </div>
          {bill.status === "Unpaid" && (
            <button className="customer-btn-primary" style={{ width: "100%" }}>Pay Now (mock)</button>
          )}
          {bill.status === "Paid" && (
            <button className="customer-btn-secondary" style={{ width: "100%" }}>Download Receipt</button>
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
              <td>Consumption Charge ({bill.usage})</td>
              <td style={{ textAlign: "right", fontWeight: 600 }}>Rs. {(bill.amount * 0.70).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Taxes & Surcharges</td>
              <td style={{ textAlign: "right", fontWeight: 600 }}>Rs. {(bill.amount * 0.15).toFixed(2)}</td>
            </tr>
            <tr style={{ borderTop: "2px solid #ffd4a8" }}>
              <td style={{ fontWeight: 700, fontSize: "1.1rem", color: "#5d2e0f" }}>Total Amount</td>
              <td style={{ textAlign: "right", fontWeight: 700, fontSize: "1.1rem", color: "#f97316" }}>Rs. {bill.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
