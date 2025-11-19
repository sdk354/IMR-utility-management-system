import { Link } from "react-router-dom";

export default function Bills() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#ff8c00" }}>My Bills</h1>

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
        <h3>Bill #001</h3>
        <p>Amount: Rs 4500</p>
        <p>Status: Unpaid</p>
      </div>

      <Link to="/customer/profile" style={{ color: "#ff8c00" }}>
        Go to Profile →
      </Link>
    </div>
  );
}
