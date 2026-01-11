import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {authService} from "../../services/authService";

function AdminLogin() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const data = await authService.login(username, password);

			/**
			 * ROLE-BASED ACCESS CONTROL
			 * Added "Temporary" to the blocklist.
			 */
			const restrictedRoles = ["Customer", "ROLE_USER", "Temporary"];

			if (restrictedRoles.includes(data.role)) {
				setError("Access Denied: This account type is restricted from the Admin Portal.");
				authService.logout();
			} else {
				navigate("/admin/dashboard");
			}
		} catch (err) {
			setError("Invalid username or password.");
		}
	};

	return (<div style={{
		height: "100vh",
		background: "linear-gradient(135deg, #0C2D55, #1A5FB4)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "20px"
	}}>
		<div style={{
			background: "white",
			padding: "40px",
			borderRadius: "20px",
			width: "420px",
			boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
			textAlign: "center"
		}}>
			<div style={{
				width: "70px",
				height: "70px",
				background: "#1A5FB4",
				borderRadius: "15px",
				margin: "0 auto 20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
				<span style={{fontSize: "32px", color: "white"}}>👤</span>
			</div>

			<h2 style={{marginBottom: "8px", color: "#0C2D55"}}>Admin Login</h2>
			<p style={{marginBottom: "20px", color: "#6b7280"}}>Sign in to access the admin portal</p>

			{error && (<div style={{
				color: "#d32f2f",
				backgroundColor: "#ffebee",
				padding: "10px",
				borderRadius: "5px",
				marginBottom: "20px",
				fontSize: "14px",
				border: "1px solid #ffcdd2"
			}}>
				{error}
			</div>)}

			<form onSubmit={handleSubmit}>
				<div style={{textAlign: "left", marginBottom: "15px"}}>
					<label style={{fontWeight: "500", color: "#374151"}}>Username</label>
					<input type="text" placeholder="Enter your username" value={username}
						   onChange={(e) => setUsername(e.target.value)} required style={{
						width: "100%",
						padding: "12px",
						borderRadius: "8px",
						border: "1px solid #ccc",
						marginTop: "5px",
						boxSizing: "border-box"
					}}/>
				</div>

				<div style={{textAlign: "left", marginBottom: "20px"}}>
					<label style={{fontWeight: "500", color: "#374151"}}>Password</label>
					<input type="password" placeholder="Enter your password" value={password}
						   onChange={(e) => setPassword(e.target.value)} required style={{
						width: "100%",
						padding: "12px",
						borderRadius: "8px",
						border: "1px solid #ccc",
						marginTop: "5px",
						boxSizing: "border-box"
					}}/>
				</div>

				<button type="submit" style={{
					background: "#4F8DFB",
					color: "white",
					padding: "12px",
					width: "100%",
					borderRadius: "8px",
					border: "none",
					fontSize: "16px",
					fontWeight: "600",
					cursor: "pointer",
					transition: "background 0.3s ease"
				}} onMouseOver={(e) => e.target.style.background = "#3b7ddd"}
						onMouseOut={(e) => e.target.style.background = "#4F8DFB"}>
					Sign In
				</button>
			</form>

			<Link to="/" style={{
				display: "block", marginTop: "20px", color: "#1A5FB4", fontSize: "14px", textDecoration: "none"
			}}>← Back to Portal Selection</Link>
		</div>
	</div>);
}

export default AdminLogin;