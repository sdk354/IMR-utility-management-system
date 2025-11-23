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
    // mock save - in real app call API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ background: "#F5F7FA", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* Page header */}
        <h1 style={{ marginBottom: "20px", color: "#ea580c" }}>My Profile</h1>

        {/* Card */}
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
        }}>
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
              <button
                type="submit"
                style={{
                  background: "#ea580c",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 16px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Save changes
              </button>

              <Link to="/customer/profile/password" className="small link" style={{ alignSelf: "center" }}>
                Change password
              </Link>
            </div>

            {saved && <div className="mt-2 small" style={{ color: "#059669" }}>Saved (mock)</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
