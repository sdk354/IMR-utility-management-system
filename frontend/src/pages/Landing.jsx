import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="app-center">
      <div className="card">
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>Utility Management System</h2>
        <p className="small" style={{ marginBottom: 18 }}>Select a portal.</p>

        <div style={{ display: "flex", gap: 14 }}>
          <Link to="/customer/login" className="btn btn-orange" style={{ flex: 1 }}>Customer Login</Link>
          <Link to="/admin/login" className="btn btn-blue" style={{ flex: 1 }}>Admin Login</Link>
        </div>
      </div>
    </div>
  );
}
