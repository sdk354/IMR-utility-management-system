import React from "react";

function CustomerComplaints() {
  return (
    <div
      style={{
        background: "#F5F7FA",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      {/* changed header color to unified orange */}
      <h1 style={{ marginBottom: "20px", color: "#ea580c" }}>
        Submit Support Request
      </h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          maxWidth: "700px",
        }}
      >
        <h3 style={{ marginBottom: "20px", color: "#0C2D55" }}>
          Support Form
        </h3>

        {/* added id and htmlFor for accessibility, defaultValue on select */}
        <label htmlFor="issue-type" style={{ fontWeight: "500" }}>
          Issue Type
        </label>
        <select
          id="issue-type"
          name="issueType"
          defaultValue=""
          aria-label="Issue Type"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <option value="" disabled>
            Select issue type...
          </option>
          <option>Billing Issue</option>
          <option>Meter Reading</option>
          <option>General Inquiry</option>
        </select>

        <label htmlFor="subject" style={{ fontWeight: "500" }}>
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Brief description of your issue"
          aria-label="Subject"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        />

        <label htmlFor="description" style={{ fontWeight: "500" }}>
          Description
        </label>
        <textarea
          id="description"
          placeholder="Provide detailed information"
          aria-label="Description"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minHeight: "140px",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        ></textarea>

        {/* explicit button type */}
        <button
          type="button"
          style={{
            background: "#ea580c",
            padding: "12px",
            width: "150px",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Submit Request
        </button>
      </div>

      {/* Support Tickets Table */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          maxWidth: "900px",
          marginTop: "40px",
        }}
      >
        <h3 style={{ marginBottom: "20px", color: "#0C2D55" }}>
          My Support Tickets
        </h3>

        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
          aria-label="Support tickets"
        >
          <thead>
            <tr style={{ background: "#E8EEF3", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Ticket ID</th>
              <th style={{ padding: "12px" }}>Subject</th>
              <th style={{ padding: "12px" }}>Type</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Status</th>
            </tr>
            
          </thead>

          <tbody>
            <tr>
              <td style={{ padding: "12px" }}>TKT-001</td>
              <td style={{ padding: "12px" }}>Billing discrepancy</td>
              <td style={{ padding: "12px" }}>Billing Issue</td>
              <td style={{ padding: "12px" }}>2024-01-18</td>
              <td style={{ padding: "12px", color: "#E09E00" }}>In Progress</td>
            </tr>

            <tr>
              <td style={{ padding: "12px" }}>TKT-002</td>
              <td style={{ padding: "12px" }}>Meter reading question</td>
              <td style={{ padding: "12px" }}>General Inquiry</td>
              <td style={{ padding: "12px" }}>2024-01-10</td>
              <td style={{ padding: "12px", color: "#11A763" }}>Resolved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerComplaints;