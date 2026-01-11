import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {billService} from '../../services/billService';
import {customerService} from '../../services/customerService';
import '../../styles/globals.css';

function AddEditBill() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const editId = searchParams.get('edit');

	const [loading, setLoading] = useState(false);
	const [customers, setCustomers] = useState([]);

	const initialFormState = {
		userId: '',
		totalAmount: '',
		totalConsumption: '',
		billingPeriodStart: '',
		billingPeriodEnd: '',
		dueDate: '',
		status: 'Unpaid'
	};

	const [formData, setFormData] = useState(initialFormState);

	const formatToDisplayName = (username) => {
		if (!username) return 'N/A';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await customerService.getAllCustomers();
				const allUsers = response.content || response || [];
				const onlyActualCustomers = allUsers.filter(u => u.role?.roleName?.trim().toLowerCase() === 'customer');
				setCustomers(onlyActualCustomers);

				if (editId) {
					const bill = await billService.getBillById(editId);
					setFormData({
						userId: bill.user?.id || '',
						totalAmount: bill.totalAmount || '',
						totalConsumption: bill.totalConsumption || '',
						billingPeriodStart: bill.billingPeriodStart || '',
						billingPeriodEnd: bill.billingPeriodEnd || '',
						dueDate: bill.dueDate || '',
						status: bill.status || 'Unpaid'
					});
				} else {
					setFormData(initialFormState);
				}
			} catch (err) {
				console.error("Initialization error:", err);
			}
		};
		loadData();
	}, [editId]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({
			...prev, [name]: name === 'userId' ? parseInt(value) : value
		}));
	};

	const handleStatusSelect = (statusValue) => {
		setFormData(prev => ({...prev, status: statusValue}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.userId) {
			alert("Please select a customer.");
			return;
		}
		setLoading(true);
		try {
			const payload = {
				totalAmount: parseFloat(formData.totalAmount),
				totalConsumption: parseFloat(formData.totalConsumption || 0),
				billingPeriodStart: formData.billingPeriodStart,
				billingPeriodEnd: formData.billingPeriodEnd,
				dueDate: formData.dueDate,
				status: formData.status,
				user: {id: parseInt(formData.userId)}
			};

			if (editId) {
				await billService.updateBill(editId, payload);
				alert('Bill updated successfully!');
			} else {
				await billService.createBill(payload);
				alert('Bill generated successfully!');
			}
			navigate('/admin/billing');
		} catch (error) {
			alert(error.response?.data?.message || "Failed to save bill.");
		} finally {
			setLoading(false);
		}
	};

	const statusOptions = [{label: 'Unpaid', value: 'Unpaid', color: '#ef4444'}, {
		label: 'Paid', value: 'Paid', color: '#10b981'
	}];

	return (<div className="admin-page">
		<div className="admin-page-header">
			<h2>{editId ? 'Edit Bill Details' : 'Generate New Bill'}</h2>
		</div>

		<div className="admin-form-container">
			<div className="admin-card" style={{maxWidth: '900px', margin: '0 auto'}}>
				<form onSubmit={handleSubmit}>
					<div className="admin-form-grid">

						<div className="admin-form-group full-width">
							<label>Assign Customer</label>
							<div className="select-wrapper" style={{position: 'relative'}}>
								<select
									name="userId"
									className="admin-input"
									style={{
										height: '45px',
										appearance: 'none',
										paddingLeft: '40px',
										cursor: 'pointer',
										background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E") no-repeat right 12px center/16px`
									}}
									value={formData.userId}
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
							<label>Total Amount (Rs.)</label>
							<input
								type="number"
								name="totalAmount"
								className="admin-input"
								step="0.01"
								value={formData.totalAmount}
								onChange={handleChange}
								placeholder="e.g., 2500.00"
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Consumption Units</label>
							<input
								type="number"
								name="totalConsumption"
								className="admin-input"
								step="0.01"
								value={formData.totalConsumption}
								onChange={handleChange}
								placeholder="e.g., 145.5"
								style={{height: '45px'}}
							/>
						</div>

						<div className="admin-form-group">
							<label>Period Start Date</label>
							<input
								type="date"
								name="billingPeriodStart"
								className="admin-input"
								value={formData.billingPeriodStart}
								onChange={handleChange}
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Period End Date</label>
							<input
								type="date"
								name="billingPeriodEnd"
								className="admin-input"
								value={formData.billingPeriodEnd}
								onChange={handleChange}
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Payment Due Date</label>
							<input
								type="date"
								name="dueDate"
								className="admin-input"
								value={formData.dueDate}
								onChange={handleChange}
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group full-width">
							<label>Payment Status</label>
							<div className="status-chip-group">
								{statusOptions.map((opt) => (<button
									key={opt.value}
									type="button"
									className={`status-chip ${formData.status === opt.value ? 'active' : ''}`}
									onClick={() => handleStatusSelect(opt.value)}
									style={{
										'--chip-color': opt.color, '--chip-bg': opt.color + '15'
									}}
								>
									<span className="dot"></span>
									{opt.label}
								</button>))}
							</div>
						</div>
					</div>

					<div className="admin-form-footer" style={{marginTop: '2.5rem'}}>
						<button type="button" onClick={() => navigate('/admin/billing')}
								className="admin-btn-secondary">Cancel
						</button>
						<button type="submit" className="admin-btn-primary" disabled={loading}>
							{loading ? 'Processing...' : (editId ? 'Update Bill' : 'Generate Bill')}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>);
}

export default AddEditBill;