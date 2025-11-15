import React, { useState } from "react";
import { MOCK_PROFILE } from "../data/mock";
import { Link } from "react-router-dom";

export default function Profile() {
  const [form, setForm] = useState({ ...MOCK_PROFILE });
  const [saved, setSaved] = useState(false);

  const handleChange = (k) => (e) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // mock save - in real app call API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="customer-bg">
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div className="header">
          <div className="title">My Profile</div>
          <nav><Link to="/customer/dashboard" className="small link">Dashboard</Link></nav>
        </div>

        <div className="box">
          <form onSubmit={handleSave}>
            <div className="form-row">
              <label>Name</label>
              <input value={form.name} onChange={handleChange("name")} />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input value={form.email} onChange={handleChange("email")} type="email" />
            </div>

            <div className="form-row">
              <label>Phone</label>
              <input value={form.phone} onChange={handleChange("phone")} />
            </div>

            <div className="form-row">
              <label>Address</label>
              <textarea value={form.address} onChange={handleChange("address")} />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-orange">Save changes</button>
              <Link to="/customer/profile/password" className="small link">Change password</Link>
            </div>

            {saved && <div className="mt-2 small" style={{ color: "#059669" }}>Saved (mock)</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
