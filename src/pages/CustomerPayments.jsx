import React from "react";

function CustomerPayments() {
  return (
    <div
      style={{
        background: "#F5F7FA",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      {/* header color unified to --primary-orange value (#ea580c) */}
      <h1 style={{ marginBottom: "20px", color: "#ea580c" }}>
        Make a Payment
      </h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          width: "450px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#0C2D55" }}>
          Payment Details
        </h3>

        <label style={{ fontWeight: "500", color: "#333" }}>Account Number</label>
        <input
          type="text"
          placeholder="Enter account number"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        />

        <label style={{ fontWeight: "500", color: "#333" }}>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            marginTop: "5px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#ea580c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default CustomerPayments;