import { Link } from "react-router-dom";
import { MOCK_BILLS } from "../../data/mock";

export default function BillsList() {
  return (
    <>
      <div className="customer-page-header">
        <h1 className="customer-section-title">My Bills</h1>
        <div className="customer-page-actions">
          <button className="customer-btn-secondary">Export</button>
          <button className="customer-btn-primary">Print</button>
        </div>
      </div>

      <div className="customer-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Period</th>
              <th>Usage</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BILLS && MOCK_BILLS.length > 0 ? (
              MOCK_BILLS.map(b => (
                <tr key={b.id}>
                  <td><strong>{b.id}</strong></td>
                  <td>{b.date}</td>
                  <td>{b.usage}</td>
                  <td><strong>Rs. {b.amount.toFixed(2)}</strong></td>
                  <td>{b.due}</td>
                  <td>
                    <span className={`customer-status ${b.status === "Paid" ? "completed" : "pending"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/customer/bills/${b.id}`} className="link" style={{ color: "#f97316", fontWeight: "600" }}>View</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "#a0714f" }}>
                  No bills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
