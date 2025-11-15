import React from "react";
import { Link } from "react-router-dom";
import { MOCK_BILLS } from "../data/mock";

export default function Dashboard() {
  const latest = MOCK_BILLS[0];
  return (
    <div className="customer-bg">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="header">
          <div className="title">Dashboard</div>
          <nav>
            <Link to="/customer/bills">My Bills</Link>
            <Link to="/customer/profile" style={{ marginLeft: 8 }}>Profile</Link>
          </nav>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
          <div className="box">
            <h3 className="text-orange">Latest bill</h3>
            <div className="mt-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="small">Bill ID</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{latest.id}</div>
                <div className="small">Usage: {latest.usage}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="small">Amount due</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#c2410c" }}>${latest.amount.toFixed(2)}</div>
                <div className="small">Due: {latest.due}</div>
                <div className="mt-2">
                  <Link to={`/customer/bills/${latest.id}`} className="btn btn-orange" style={{ padding: "8px 12px" }}>View bill</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <h4 className="small">Quick links</h4>
            <div className="mt-2">
              <Link to="/customer/bills" className="link">→ View all bills</Link>
            </div>
            <div className="mt-2">
              <Link to="/customer/profile" className="link">→ Edit profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
