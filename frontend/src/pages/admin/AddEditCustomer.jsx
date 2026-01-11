import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { customerService } from '../../services/customerService';

function AddEditCustomer() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const editId = searchParams.get('edit');

	const [displayName, setDisplayName] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		contactNo: '',
		email: '',
		street: '',
		streetNo: '',
		city: '',
		status: 'Active',
	});

	const [loading, setLoading] = useState(false);

	const formatToUsername = (name) => {
		return name.toLowerCase().trim().replace(/\s+/g, '_');
	};

	const formatToDisplayName = (username) => {
		if (!username) return '';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	useEffect(() => {
		if (editId) {
			const fetchCustomer = async () => {
				try {
					const data = await customerService.getCustomerById(editId);
					setFormData({
						username: data.username || '',
						password: '',
						contactNo: data.contactNo || '',
						email: data.email || '',
						street: data.street || '',
						streetNo: data.streetNo || '',
						city: data.city || '',
						status: data.status || 'Active',
					});
					setDisplayName(formatToDisplayName(data.username));
				} catch (error) {
					console.error("Error fetching customer:", error);
					alert("Could not load customer data.");
				}
			};
			fetchCustomer();
		}
	}, [editId]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleNameChange = (e) => {
		const val = e.target.value;
		setDisplayName(val);
		setFormData(prev => ({ ...prev, username: formatToUsername(val) }));
	};

	const handleStatusSelect = (statusValue) => {
		setFormData(prev => ({ ...prev, status: statusValue }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (editId) {
				await customerService.updateCustomer(editId, formData);
				alert('Customer updated successfully!');
			} else {
				await customerService.saveCustomer(formData);
				alert('Customer added successfully!');
			}
			navigate('/admin/customers');
		} catch (error) {
			console.error("Save error:", error);
			alert("Failed to save customer details.");
		} finally {
			setLoading(false);
		}
	};

	const statusOptions = [
		{ label: 'Active', value: 'Active', color: '#10b981' },
		{ label: 'Inactive', value: 'Inactive', color: '#ef4444' },
		{ label: 'Pending', value: 'Pending', color: '#f59e0b' }
	];

	return (
		<div className="admin-page">
			<div className="admin-page-header">
				<h2>{editId ? 'Edit' : 'Add New'} Customer Details</h2>
			</div>

			<div className="admin-form-container">
				<div className="admin-card">
					<form onSubmit={handleSubmit}>
						<div className="admin-form-grid">
							<div className="admin-form-group">
								<label>Customer Name</label>
								<input type="text" value={displayName} onChange={handleNameChange} placeholder="e.g., James Snow" required />
								<small className="form-helper">
									Saved as: <strong>{formData.username || '...'}</strong>
								</small>
							</div>

							<div className="admin-form-group">
								<label>Password {editId && "(Leave blank to keep current)"}</label>
								<div className="password-input-wrapper">
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										value={formData.password}
										onChange={handleChange}
										placeholder="••••••••"
										required={!editId}
									/>
									<button
										type="button"
										className="password-toggle-btn"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? "HIDE" : "SHOW"}
									</button>
								</div>
							</div>

							<div className="admin-form-group">
								<label>Phone No</label>
								<input type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="e.g., 0763356273" />
							</div>

							<div className="admin-form-group">
								<label>Email</label>
								<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., jsnow@email.com" required />
							</div>

							<div className="admin-form-group">
								<label>Street Number</label>
								<input type="text" name="streetNo" value={formData.streetNo} onChange={handleChange} placeholder="e.g., 123/A" />
							</div>

							<div className="admin-form-group">
								<label>Street</label>
								<input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="e.g., Galle Road" />
							</div>

							<div className="admin-form-group">
								<label>City</label>
								<input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g., Colombo" />
							</div>

							<div className="admin-form-group full-width">
								<label>Account Status</label>
								<div className="status-chip-group">
									{statusOptions.map((opt) => (
										<button
											key={opt.value}
											type="button"
											className={`status-chip ${formData.status === opt.value ? 'active' : ''}`}
											onClick={() => handleStatusSelect(opt.value)}
											style={{
												'--chip-color': opt.color,
												'--chip-bg': opt.color + '15'
											}}
										>
											<span className="dot"></span>
											{opt.label}
										</button>
									))}
								</div>
							</div>
						</div>

						<div className="admin-form-footer">
							<button type="button" onClick={() => navigate('/admin/customers')} className="admin-btn-secondary">Cancel</button>
							<button type="submit" className="admin-btn-primary" disabled={loading}>
								{loading ? 'Saving...' : 'Submit'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddEditCustomer;