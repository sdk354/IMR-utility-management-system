import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerPayments from "./Payments";
import CustomerComplaints from "./Complaints";
import Profile from "./Profile";

function Dashboard() {
  const [view, setView] = useState("home");
  const navigate = useNavigate();

  return (
    <div>
      {view === "home" && (
        <>
          <div className="customer-page-header">
            <h1 className="customer-section-title">Dashboard</h1>
          </div>

          {/* Welcome Banner */}
          <div style={{
            background: "#f97316",
            padding: "2rem",
            borderRadius: "12px",
            color: "white",
            marginBottom: "2rem"
          }}>
            <h2 style={{ marginBottom: "1.5rem" }}>Welcome back!</h2>

            <div style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap"
            }}>
              <button
                onClick={() => navigate("/customer/bills")}
                className="customer-btn-primary"
                style={{ background: "white", color: "#f97316" }}
              >
                View Bills
              </button>
              <button
                onClick={() => navigate("/customer/payment")}
                className="customer-btn-primary"
                style={{ background: "white", color: "#f97316" }}
              >
                Make Payment
              </button>
              <button
                onClick={() => navigate("/customer/support")}
                className="customer-btn-primary"
                style={{ background: "white", color: "#f97316" }}
              >
                Get Support
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="customer-dashboard-grid">
            <div className="customer-summary-card">
              <div className="customer-summary-icon" style={{ background: "#fed7aa" }}>
                <span style={{ fontSize: "1.5rem" }}>⚡</span>
              </div>
              <div>
                <div className="customer-summary-title">Current Month Usage</div>
                <div className="customer-summary-value">456 kWh</div>
                <div className="customer-summary-change up">↑ 8% from last month</div>
              </div>
            </div>

            <div className="customer-summary-card">
              <div className="customer-summary-icon" style={{ background: "#ffd4a8" }}>
                <span style={{ fontSize: "1.5rem" }}>💳</span>
              </div>
              <div>
                <div className="customer-summary-title">Last Bill Amount</div>
                <div className="customer-summary-value">Rs. 24,500</div>
                <div className="customer-summary-change" style={{ color: "#e09e00" }}>Due: Feb 15</div>
              </div>
            </div>

            <div className="customer-summary-card">
              <div className="customer-summary-icon" style={{ background: "#fed7aa" }}>
                <span style={{ fontSize: "1.5rem" }}>📊</span>
              </div>
              <div>
                <div className="customer-summary-title">Average Daily Usage</div>
                <div className="customer-summary-value">15.2 kWh</div>
                <div className="customer-summary-change">Per day</div>
              </div>
            </div>

            <div className="customer-summary-card">
              <div className="customer-summary-icon" style={{ background: "#d1fae5" }}>
                <span style={{ fontSize: "1.5rem" }}>✓</span>
              </div>
              <div>
                <div className="customer-summary-title">Account Status</div>
                <div className="customer-summary-value">Active</div>
                <div className="customer-summary-change up">All payments up to date</div>
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="customer-card" style={{ marginTop: "2rem" }}>
            <h3 style={{ marginBottom: "1.5rem", color: "#5d2e0f" }}>Monthly Consumption Trend</h3>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              height: "300px",
              paddingBottom: "1rem",
              overflow: "auto"
            }}>
              {[
                420, 450, 430, 460, 445, 470, 455, 465, 440, 450, 445, 455
              ].map((height, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "28px",
                      height: `${height}px`,
                      background: "#f97316",
                      borderRadius: "5px",
                      margin: "0 auto"
                    }}
                  ></div>
                  <span style={{ fontSize: "0.75rem", color: "#a0714f", marginTop: "0.5rem", display: "block" }}>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {view === "payment" && <CustomerPayments />}
      {view === "support" && <CustomerComplaints />}
      {view === "profile" && <Profile />}

      {view === "bills" && (
        <>
          <h2 className="customer-section-title">My Bills</h2>
          <div className="customer-table-container">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Period</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BILL-001</td>
                  <td>Jan 2024</td>
                  <td>Rs. 24,500</td>
                  <td>2024-02-15</td>
                  <td>
                    <span className="customer-status pending">Due</span>
                  </td>
                </tr>
                <tr>
                  <td>BILL-002</td>
                  <td>Dec 2023</td>
                  <td>Rs. 22,100</td>
                  <td>2024-01-15</td>
                  <td>
                    <span className="customer-status completed">Paid</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
