import { useState } from "react";
import { MOCK_PROFILE } from "../../data/mock";
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
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <div className="customer-page-header">
        <h1 className="customer-section-title">My Profile</h1>
        <div className="customer-page-actions">
          <Link to="/customer/profile/password" className="customer-btn-secondary">Change Password</Link>
          <button className="customer-btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>

      <div style={{ maxWidth: "700px" }}>
        <div className="customer-card">
          <h3 style={{ marginBottom: "1.5rem", color: "#5d2e0f", borderBottom: "2px solid #f97316", paddingBottom: "0.75rem" }}>Personal Information</h3>
          <form onSubmit={handleSave}>
            <div className="customer-form-group">
              <label>Name</label>
              <input value={form.name} onChange={handleChange("name")} />
            </div>

            <div className="customer-form-group">
              <label>Email</label>
              <input value={form.email} onChange={handleChange("email")} type="email" />
            </div>

            <div className="customer-form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={handleChange("phone")} />
            </div>

            <div className="customer-form-group">
              <label>Address</label>
              <textarea value={form.address} onChange={handleChange("address")} style={{ minHeight: "100px" }} />
            </div>

            {saved && (
              <div className="small" style={{ color: "#059669", fontWeight: "600", marginTop: "1rem" }}>
                ✓ Changes saved
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
