import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";

export default function CustomerLogin() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const data = await authService.login(username, pass);

			// LOGIC: Block guest accounts and Restricted Temporary accounts
			const restrictedRoles = ["ROLE_USER", "Temporary"];

			if (restrictedRoles.includes(data.role)) {
				setError("Access Denied: This account is restricted. Please contact support.");
				authService.logout();
			} else {
				navigate("/customer/dashboard");
			}
		} catch (err) {
			setError("Login failed. Please check your credentials.");
		}
	};

	const colors = {
		primary: "#800000",
		primaryHover: "#5a0000",
		accent: "#ffd1d1",
		textDark: "#3d0000",
		background: "linear-gradient(135deg, #4a0404, #800000)",
	};

	return (
		<div style={{ height: "100vh", background: colors.background, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
			<div style={{ background: "white", padding: "40px", borderRadius: "20px", width: "420px", boxShadow: "0 10px 40px rgba(0,0,0,0.3)", textAlign: "center" }}>
				<div style={{ width: "70px", height: "70px", background: colors.primary, borderRadius: "15px", margin: "0 auto 20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<span style={{ fontSize: "32px", color: "white" }}>⚡</span>
				</div>

				<h2 style={{ marginBottom: "8px", color: colors.textDark }}>Customer Login</h2>
				<p style={{ marginBottom: "20px", color: "#6b7280" }}>Sign in to access your account</p>

				{error && (
					<div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "5px", marginBottom: "20px", fontSize: "14px" }}>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div style={{ textAlign: "left", marginBottom: "15px" }}>
						<label style={{ fontWeight: "500", color: "#374151" }}>Username</label>
						<input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid ${colors.accent}`, marginTop: "5px", boxSizing: "border-box" }} />
					</div>

					<div style={{ textAlign: "left", marginBottom: "20px" }}>
						<label style={{ fontWeight: "500", color: "#374151" }}>Password</label>
						<input type="password" placeholder="Enter your password" value={pass} onChange={(e) => setPass(e.target.value)} required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid ${colors.accent}`, marginTop: "5px", boxSizing: "border-box" }} />
					</div>

					<button type="submit" style={{ background: colors.primary, color: "white", padding: "12px", width: "100%", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "500", cursor: "pointer", transition: "background 0.2s ease" }} onMouseOver={(e) => (e.target.style.background = colors.primaryHover)} onMouseOut={(e) => (e.target.style.background = colors.primary)}>
						Sign In
					</button>
				</form>

				<Link to="/" style={{ display: "block", marginTop: "20px", color: colors.primary, fontSize: "14px", textDecoration: "none", fontWeight: "500" }}>← Back to Portal Selection</Link>
			</div>
		</div>
	);
}