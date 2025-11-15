import React from "react";
import { Link } from "react-router-dom";

function AdminLogin() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0C2D55, #1A5FB4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            background: "#1A5FB4",
            borderRadius: "15px",
            margin: "0 auto 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "32px", color: "white" }}>👤</span>
        </div>

        <h2 style={{ marginBottom: "8px", color: "#0C2D55" }}>Admin Login</h2>
        <p style={{ marginBottom: "30px", color: "#6b7280" }}>
          Sign in to access the admin portal
        </p>

        <div style={{ textAlign: "left", marginBottom: "15px" }}>
          <label style={{ fontWeight: "500", color: "#374151" }}>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ fontWeight: "500", color: "#374151" }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          style={{
            background: "#4F8DFB",
            color: "white",
            padding: "12px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>

        <Link
          to="/"
          style={{
            display: "block",
            marginTop: "20px",
            color: "#1A5FB4",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          ← Back to Portal Selection
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
