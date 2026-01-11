import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {tariffService} from '../../services/tariffService';

function AddTariff() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const editId = searchParams.get('edit');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const initialFormState = {
		utilityTypeId: 1,
		slabFrom: '',
		slabTo: '',
		rate: '',
		fixedCharge: '',
		subsidiaryPercentage: '',
		effectiveFrom: '',
		effectiveTo: ''
	};

	const [formData, setFormData] = useState(initialFormState);

	const utilityOptions = [{label: 'Electricity', v: 1, color: '#f59e0b'}, {
		label: 'Water', v: 2, color: '#3b82f6'
	}, {label: 'Gas', v: 3, color: '#ec4899'}];

	useEffect(() => {
		if (editId) {
			const fetchTariff = async () => {
				try {
					const data = await tariffService.getTariffById(editId);
					setFormData({
						utilityTypeId: data.utilityTypeId || 1,
						slabFrom: data.slabFrom || '',
						slabTo: data.slabTo || '',
						rate: data.rate || '',
						fixedCharge: data.fixedCharge || '',
						subsidiaryPercentage: data.subsidiaryPercentage || '',
						effectiveFrom: data.effectiveFrom || '',
						effectiveTo: data.effectiveTo || ''
					});
				} catch (err) {
					setError("Failed to load tariff details.");
					console.error(err);
				}
			};
			fetchTariff();
		} else {
			setFormData(initialFormState);
		}
	}, [editId]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({
			...prev, [name]: value
		}));
	};

	const handleToggleSelect = (name, val) => {
		setFormData(prev => ({...prev, [name]: val}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (editId) {
				await tariffService.updateTariff(editId, formData);
				alert('Tariff updated successfully!');
			} else {
				await tariffService.createTariff(formData);
				alert('New tariff created successfully!');
			}
			navigate('/admin/tariffs');
		} catch (err) {
			setError(err.message || "Failed to save tariff.");
		} finally {
			setLoading(false);
		}
	};

	return (<div className="admin-page">
		<div className="admin-page-header">
			<h2>{editId ? 'Edit Tariff Details' : 'Add New Tariff'}</h2>
		</div>

		<div className="admin-form-container">
			<div className="admin-card" style={{maxWidth: '800px', margin: '0 auto'}}>
				{error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="admin-form-grid">

						{/* UPDATED: Utility Type Chips */}
						<div className="admin-form-group full-width">
							<label>Utility Type</label>
							<div className="status-chip-group">
								{utilityOptions.map((opt) => (<button
									key={opt.v}
									type="button"
									className={`status-chip ${formData.utilityTypeId === opt.v ? 'active' : ''}`}
									onClick={() => handleToggleSelect('utilityTypeId', opt.v)}
									style={{
										'--chip-color': opt.color, '--chip-bg': `${opt.color}15`
									}}
								>
									<span className="dot"></span>
									{opt.label}
								</button>))}
							</div>
						</div>

						<div className="admin-form-group">
							<label>Rate (per unit)</label>
							<input
								type="number"
								name="rate"
								className="admin-input"
								step="0.01"
								value={formData.rate}
								onChange={handleChange}
								placeholder="e.g. 8.00"
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Slab From (Units)</label>
							<input
								type="number"
								name="slabFrom"
								className="admin-input"
								value={formData.slabFrom}
								onChange={handleChange}
								placeholder="e.g. 0"
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Slab To (Units)</label>
							<input
								type="number"
								name="slabTo"
								className="admin-input"
								value={formData.slabTo}
								onChange={handleChange}
								placeholder="e.g. 30"
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Fixed Charge (Rs.)</label>
							<input
								type="number"
								name="fixedCharge"
								className="admin-input"
								step="0.01"
								value={formData.fixedCharge}
								onChange={handleChange}
								placeholder="e.g. 150.00"
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Subsidy (%)</label>
							<input
								type="number"
								name="subsidiaryPercentage"
								className="admin-input"
								step="0.1"
								value={formData.subsidiaryPercentage}
								onChange={handleChange}
								placeholder="e.g. 5.0"
								style={{height: '45px'}}
							/>
						</div>

						<div className="admin-form-group">
							<label>Effective From</label>
							<input
								type="date"
								name="effectiveFrom"
								className="admin-input"
								value={formData.effectiveFrom}
								onChange={handleChange}
								style={{height: '45px'}}
								required
							/>
						</div>

						<div className="admin-form-group">
							<label>Effective To</label>
							<input
								type="date"
								name="effectiveTo"
								className="admin-input"
								value={formData.effectiveTo}
								onChange={handleChange}
								style={{height: '45px'}}
							/>
						</div>
					</div>

					<div className="admin-form-footer" style={{marginTop: '2.5rem'}}>
						<button type="button" onClick={() => navigate('/admin/tariffs')}
								className="admin-btn-secondary">
							Cancel
						</button>
						<button type="submit" className="admin-btn-primary" disabled={loading}>
							{loading ? 'Saving...' : (editId ? 'Update Tariff' : 'Save Tariff')}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>);
}

export default AddTariff;