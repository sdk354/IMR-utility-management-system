import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock auth: if email non-empty go to dashboard
    navigate("/customer/dashboard");
  };

  return (
    <div className="customer-bg">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="header">
          <div className="title">Customer Login</div>
          <nav><Link to="/" className="small link">Back to portal</Link></nav>
        </div>

        <div className="box">
          <p className="small">Sign in to access your account</p>

          <form onSubmit={handleSubmit} style={{ marginTop: 14 }}>
            <div className="form-row">
              <label>Email address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
            </div>

            <div className="form-row">
              <label>Password</label>
              <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
            </div>

            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button className="btn btn-orange" style={{ minWidth: 140 }}>Sign In</button>
              <Link to="/customer/dashboard" className="small link">or continue as demo</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
