import {Link} from "react-router-dom";
import "../styles/globals.css";

export default function Landing() {
	return (<div className="landing-wrapper">
		<div className="landing-card">
			<h1 className="landing-title">Utility Management System</h1>
			<p className="landing-subtitle">
				Choose your portal below.
			</p>

			<div className="landing-portal-grid">
				<Link to="/customer/login" className="portal-btn portal-btn-maroon">
					Customer Portal
				</Link>
				<Link to="/admin/login" className="portal-btn portal-btn-blue">
					Admin Portal
				</Link>
			</div>

			<p className="landing-footer">
				Secure access • Fast management • Customer‑first design
			</p>
		</div>
	</div>);
}