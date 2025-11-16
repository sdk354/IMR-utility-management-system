import React from "react";
import { Link } from "react-router-dom";
import { MOCK_BILLS } from "../data/mock";

export default function BillsList() {
  return (
    <div className="customer-bg">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="header">
          <div className="title">My Bills</div>
          <nav>
            <Link to="/customer/dashboard">Dashboard</Link>
            <Link to="/customer/profile" style={{ marginLeft: 8 }}>Profile</Link>
          </nav>
        </div>

        <div className="box bill-list">
          {MOCK_BILLS.map(b => (
            <div key={b.id} className="bill-item">
              <div>
                <div style={{ fontWeight: 700 }}>{b.id} <span className="small">• {b.usage}</span></div>
                <div className="small">Period: {b.date} — Due: {b.due}</div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 18 }}>${b.amount.toFixed(2)}</div>
                <div className="mt-2">
                  <span className={b.status === "Paid" ? "badge-paid" : "badge-unpaid"}>{b.status}</span>
                </div>
                <div className="mt-2">
                  <Link to={`/customer/bills/${b.id}`} className="link">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
