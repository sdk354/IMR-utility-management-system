import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import CustomerPayments from "./CustomerPayments";
import CustomerComplaints from "./CustomerComplaints";
import Profile from "./Profile";
import CustomerBills from "./CustomerBills"; // added import

function Dashboard() {
  const [view, setView] = useState("home"); // 'home' | 'bills' | 'payment' | 'support' | 'profile'

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="portal-title">Customer Portal</h2>

        <ul className="sidebar-links">
          <li>
            <Link to="/customer/dashboard" onClick={(e) => { e.preventDefault(); setView("home"); }}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/customer/bills" onClick={(e) => { e.preventDefault(); setView("bills"); }}>
              📄 My Bills
            </Link>
          </li>
          <li>
            <Link to="/customer/payment" onClick={(e) => { e.preventDefault(); setView("payment"); }}>
              💳 Payments
            </Link>
          </li>
          <li>
            <Link to="/customer/support" onClick={(e) => { e.preventDefault(); setView("support"); }}>
              🛠️ Complaints
            </Link>
          </li>
          <li>
            <Link to="/customer/profile" onClick={(e) => { e.preventDefault(); setView("profile"); }}>
              👤 Profile
            </Link>
          </li>
        </ul>

        <Link className="back-button" to="/">⬅ Back to Portal Selection</Link>
      </aside>

      {/* Main Content */}
      <main className="main-area">

        {view === "home" && (
          <>
            <h1>Dashboard</h1>

            {/* Welcome Banner */}
            <div className="welcome-card">
              <h2>Welcome back, John!</h2>
              <p>
                Manage your electricity account, view bills, and track your power consumption.
              </p>

              <div className="banner-buttons">
                <Link to="/customer/bills" className="banner-btn orange" onClick={(e) => { e.preventDefault(); setView("bills"); }}>
                  View Bills
                </Link>
                <Link to="/customer/payment" className="banner-btn orange" onClick={(e) => { e.preventDefault(); setView("payment"); }}>
                  Make Payment
                </Link>
                <Link to="/customer/submit-reading" className="banner-btn orange" onClick={(e) => { e.preventDefault(); /* handle submit-reading if needed */ }}>
                  Submit Reading
                </Link>
                <Link to="/customer/support" className="banner-btn orange" onClick={(e) => { e.preventDefault(); setView("support"); }}>
                  Get Support
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-row">
              <div className="stat-card">
                <h4>Current Month Usage</h4>
                <h2>456 kWh</h2>
                <p className="green">↑ 8% from last month</p>
              </div>

              <div className="stat-card yellow-border">
                <h4>Last Bill Amount</h4>
                <h2>Rs. 24,500</h2>
                <p className="small-text">Due: Feb 15, 2024</p>
              </div>

              <div className="stat-card">
                <h4>Average Daily Usage</h4>
                <h2>15.2 kWh</h2>
                <p className="small-text">Per day average</p>
              </div>

              <div className="stat-card green-border">
                <h4>Account Status</h4>
                <h2>Active</h2>
                <p className="green">All payments up to date</p>
              </div>
            </div>

            {/* Graph Section */}
            <div className="graph-card">
              <h3>Monthly Consumption Trend</h3>
              <div className="chart">
                {/*
                  420, 450, 430, 460, 445, 470, 455, 465, 440, 450, 445, 455
                */}
                {[
                  420, 450, 430, 460, 445, 470, 455, 465, 440, 450, 445, 455
                ].map((height, i) => (
                  <div key={i} className="bar-container">
                    <div className="bar" style={{ height: `${height}px` }}></div>
                    <span className="bar-label">
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
          <div style={{ background: "#F5F7FA", minHeight: "100vh", padding: 0 }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h1 style={{ marginBottom: 20, color: "#ea580c" }}>My Bills</h1>

              <div style={{
                background: "white",
                padding: 25,
                borderRadius: 12,
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
              }}>
                {/* Bills table */}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#E8EEF3", textAlign: "left" }}>
                      <th style={{ padding: 12 }}>Bill ID</th>
                      <th style={{ padding: 12 }}>Period</th>
                      <th style={{ padding: 12 }}>Amount</th>
                      <th style={{ padding: 12 }}>Due Date</th>
                      <th style={{ padding: 12 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: 12 }}>BILL-001</td>
                      <td style={{ padding: 12 }}>Jan 2024</td>
                      <td style={{ padding: 12 }}>Rs. 24,500</td>
                      <td style={{ padding: 12 }}>2024-02-15</td>
                      <td style={{ padding: 12, color: "#E09E00" }}>Due</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 12 }}>BILL-002</td>
                      <td style={{ padding: 12 }}>Dec 2023</td>
                      <td style={{ padding: 12 }}>Rs. 22,100</td>
                      <td style={{ padding: 12 }}>2024-01-15</td>
                      <td style={{ padding: 12, color: "#11A763" }}>Paid</td>
                    </tr>
                  </tbody>
                </table>

                {/* removed any "Go to profile" link/button */}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
