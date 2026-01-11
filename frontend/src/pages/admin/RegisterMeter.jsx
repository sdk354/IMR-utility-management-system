import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {meterService} from '../../services/meterService';
import {customerService} from '../../services/customerService';

function RegisterMeter() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const editId = searchParams.get('edit');

	const [formData, setFormData] = useState({
		serialNumber: '',
		utilityTypeId: 1,
		status: 'Live',
		installationDate: new Date().toISOString().split('T')[0],
		customerId: ''
	});

	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(false);

	const formatToDisplayName = (username) => {
		if (!username) return 'N/A';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const customerData = await customerService.getAllCustomers();
				const onlyActualCustomers = customerData.filter(u => u.role?.roleName?.trim().toLowerCase() === 'customer');
				setCustomers(onlyActualCustomers);

				if (editId) {
					const data = await meterService.getMeterById(editId);
					setFormData({
						serialNumber: data.serialNumber || '',
						utilityTypeId: data.utilityTypeId || 1,
						status: data.status || 'Live',
						installationDate: data.installationDate || '',
						customerId: data.customerId || ''
					});
				}
			} catch (error) {
				console.error("Data load error:", error);
			}
		};
		loadInitialData();
	}, [editId]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({
			...prev, [name]: (name === 'utilityTypeId' || name === 'customerId') ? parseInt(value) : value
		}));
	};

	const handleToggleSelect = (name, val) => {
		setFormData(prev => ({...prev, [name]: val}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.customerId) {
			alert("Please select a customer.");
			return;
		}
		setLoading(true);
		try {
			if (editId) {
				await meterService.updateMeter(editId, formData);
				alert('Meter updated successfully!');
			} else {
				await meterService.createMeter(formData);
				alert('Meter registered successfully!');
			}
			navigate('/admin/meters');
		} catch (error) {
			const serverMessage = error.response?.data?.message || "Failed to save meter.";
			alert(serverMessage);
		} finally {
			setLoading(false);
		}
	};

	const utilityOptions = [{label: 'Electricity', v: 1, color: '#f59e0b'}, {label: 'Water', v: 2, color: '#3b82f6'}, {
		label: 'Gas', v: 3, color: '#ec4899'
	}];

	return (<div className="admin-page">
		<div className="admin-page-header">
			<h2>{editId ? 'Edit Meter Details' : 'Register New Meter'}</h2>
		</div>

		<div className="admin-form-container">
			<div className="admin-card" style={{maxWidth: '800px', margin: '0 auto'}}>
				<form onSubmit={handleSubmit}>
					<div className="admin-form-grid">
						<div className="admin-form-group">
							<label>Meter Serial Number</label>
							<input
								type="text"
								name="serialNumber"
								className="admin-input"
								placeholder="e.g. MTR-9901"
								value={formData.serialNumber}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Assign Customer</label>
							<div className="select-wrapper" style={{position: 'relative'}}>
								<select
									name="customerId"
									className="admin-input"
									style={{
										appearance: 'none',
										paddingLeft: '40px',
										cursor: 'pointer',
										background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E") no-repeat right 12px center/16px`
									}}
									value={formData.customerId}
									onChange={handleChange}
									required
								>
									<option value="">-- Choose Customer --</option>
									{customers.map(c => (<option key={c.id} value={c.id}>
										{formatToDisplayName(c.username)} (ID: #{c.id})
									</option>))}
								</select>
								<span style={{
									position: 'absolute',
									left: '12px',
									top: '50%',
									transform: 'translateY(-50%)',
									opacity: 0.5
								}}>👤</span>
							</div>
						</div>

						<div className="admin-form-group">
							<label>Installation Date</label>
							<input
								type="date"
								name="installationDate"
								className="admin-input"
								value={formData.installationDate}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="admin-form-group full-width">
							<label>Utility Type</label>
							<div className="status-chip-group">
								{utilityOptions.map((opt) => (<button
									key={opt.v}
									type="button"
									className={`status-chip ${formData.utilityTypeId === opt.v ? 'active' : ''}`}
									onClick={() => handleToggleSelect('utilityTypeId', opt.v)}
									style={{'--chip-color': opt.color, '--chip-bg': `${opt.color}15`}}
								>
									<span className="dot"></span>
									{opt.label}
								</button>))}
							</div>
						</div>

						<div className="admin-form-group full-width">
							<label>Meter Status</label>
							<div className="status-chip-group">
								{[{l: 'Live', v: 'Live', c: '#10b981'}, {
									l: 'Under Repair', v: 'Under Repair', c: '#f59e0b'
								}, {l: 'Suspended', v: 'Suspended', c: '#ef4444'}].map((opt) => (<button
									key={opt.v}
									type="button"
									className={`status-chip ${formData.status === opt.v ? 'active' : ''}`}
									onClick={() => handleToggleSelect('status', opt.v)}
									style={{'--chip-color': opt.c, '--chip-bg': opt.c + '15'}}
								>
									<span className="dot"></span>
									{opt.l}
								</button>))}
							</div>
						</div>
					</div>

					<div className="admin-form-footer" style={{marginTop: '2.5rem'}}>
						<button type="button" onClick={() => navigate('/admin/meters')}
								className="admin-btn-secondary">Cancel
						</button>
						<button type="submit" className="admin-btn-primary" disabled={loading}>
							{loading ? 'Processing...' : editId ? 'Update Meter' : 'Register Meter'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>);
}

export default RegisterMeter;