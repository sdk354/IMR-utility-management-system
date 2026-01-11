import {useState, useEffect} from "react";
import {customerService} from "../../services/customerService";

export default function Profile() {
	const [form, setForm] = useState({name: "", email: "", phone: "", address: "", username: ""});
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const data = await customerService.getProfile();
				// Map backend fields to frontend form fields
				setForm({
					name: data.username || "", // If you don't have a 'name' field, use username
					username: data.username || "", email: data.email || "", phone: data.contactNo || "", // Map backend contactNo to phone
					address: data.street || ""    // Map backend street to address
				});
			} catch (err) {
				console.error("Failed to load profile", err);
			} finally {
				setLoading(false);
			}
		};
		loadProfile();
	}, []);

	const handleChange = (e) => {
		const {name, value} = e.target;
		let updatedForm = {...form, [name]: value};

		if (name === "name") {
			updatedForm.username = value
				.toLowerCase()
				.trim()
				.replace(/\s+/g, '_');
		}

		setForm(updatedForm);
		setMessage("");
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			// IMPORTANT: Only send primitive fields. Do NOT send the whole 'form' if it has nested objects.
			const cleanPayload = {
				username: form.username, email: form.email, phone: form.phone, address: form.address
			};

			await customerService.updateProfile(cleanPayload);
			setMessage("✓ Changes saved successfully");
			setTimeout(() => setMessage(""), 3000);
		} catch (err) {
			alert("Failed to save: " + err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) return <div className="customer-card">Loading profile...</div>;

	return (<>
		<div className="customer-page-header">
			<h1 className="customer-section-title">My Profile</h1>
		</div>

		<div style={{maxWidth: "700px"}}>
			<div className="customer-card">
				<h3 style={{
					marginBottom: "1.5rem",
					color: "#5d2e0f",
					borderBottom: "2px solid #f97316",
					paddingBottom: "0.75rem"
				}}>
					Personal Information
				</h3>

				<form onSubmit={handleSave}>
					<div className="customer-form-group">
						<label>Full Name</label>
						<input
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="e.g. Henry Smith"
						/>
					</div>

					<div className="customer-form-group">
						<label>Username (Auto-generated)</label>
						<input
							value={form.username}
							readOnly
							style={{backgroundColor: "#f9fafb", color: "#6b7280", cursor: "not-allowed"}}
						/>
					</div>

					<div className="customer-form-group">
						<label>Email Address</label>
						<input
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
						/>
					</div>

					<div className="customer-form-group">
						<label>Phone Number</label>
						<input
							name="phone"
							value={form.phone}
							onChange={handleChange}
						/>
					</div>

					<div className="customer-form-group">
						<label>Home Address</label>
						<textarea
							name="address"
							value={form.address}
							onChange={handleChange}
							style={{minHeight: "100px"}}
						/>
					</div>

					{message && (
						<div className="small" style={{color: "#059669", fontWeight: "600", marginBottom: "1rem"}}>
							{message}
						</div>)}

					<div style={{
						display: "flex",
						gap: "1rem",
						marginTop: "2rem",
						borderTop: "1px solid #eee",
						paddingTop: "1.5rem"
					}}>
						<button
							type="submit"
							className="customer-btn-primary"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Saving..." : "Save Changes"}
						</button>
						<button
							type="button"
							className="customer-btn-secondary"
							onClick={() => window.location.reload()}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	</>);
}