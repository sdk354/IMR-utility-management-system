import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#ff8c00" }}>My Profile</h1>

      <div
        style={{
          marginTop: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          maxWidth: "500px",
        }}
      >
        <p><b>Name:</b> Ivan</p>
        <p><b>Email:</b> ivan@example.com</p>
        <p><b>Address:</b> Galle</p>
      </div>

      <Link to="/customer/bills" style={{ color: "#ff8c00" }}>
        ← Back to Bills
      </Link>
    </div>
  );
}
