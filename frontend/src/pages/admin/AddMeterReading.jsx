import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {meterService} from '../../services/meterService';
import {authService} from '../../services/authService';
import '../../styles/globals.css';

function AddMeterReading() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const meterIdFromUrl = searchParams.get('meterId');

	const [loading, setLoading] = useState(false);
	const [meterDetails, setMeterDetails] = useState(null);

	const [formData, setFormData] = useState({
		meterId: meterIdFromUrl || '',
		readingValue: '',
		readingDate: new Date().toISOString().split('T')[0],
		remarks: ''
	});

	useEffect(() => {
		if (meterIdFromUrl) {
			meterService.getMeterById(meterIdFromUrl)
				.then(data => setMeterDetails(data))
				.catch(err => console.error("Error fetching meter:", err));
		}
	}, [meterIdFromUrl]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = authService.getCurrentUser();

		if (meterDetails && parseFloat(formData.readingValue) <= parseFloat(meterDetails.lastReading || 0)) {
			alert(`New reading must be higher than the last reading (${meterDetails.lastReading || 0})`);
			return;
		}

		setLoading(true);
		try {
			const actualUserId = user?.id || user?.userId || user?.user?.id || 1;

			const payload = {
				meterId: parseInt(formData.meterId || meterIdFromUrl),
				readingValue: parseFloat(formData.readingValue),
				readingDate: formData.readingDate + " 00:00:00",
				remarks: formData.remarks,
				userId: actualUserId
			};

			await meterService.addReading(payload);
			alert('Reading added successfully!');
			navigate('/admin/meters');
		} catch (error) {
			const msg = error.response?.data?.message || "Failed to add reading.";
			alert(msg);
		} finally {
			setLoading(false);
		}
	};

	return (<div className="admin-page">
		<div className="admin-page-header">
			<h2>New Meter Reading: {meterDetails?.serialNumber || ''}</h2>
		</div>

		<div className="admin-form-container">
			<div className="admin-card reading-card-width">
				{meterDetails && (<div className="reading-info-card">
					<div className="info-row">
						<span>Account Holder:</span>
						<strong>{meterDetails.customerName || 'Unassigned'}</strong>
					</div>
					<div className="info-row">
						<span>Previous Reading:</span>
						<strong>{meterDetails.lastReading || 0} {meterDetails.utilityTypeId === 1 ? 'kWh' : 'm³'}</strong>
					</div>
				</div>)}

				<form onSubmit={handleSubmit}>
					<div className="admin-form-grid">
						<div className="admin-form-group">
							<label>Meter No</label>
							<input
								type="text"
								className="admin-input readonly-input"
								value={meterDetails?.serialNumber || formData.meterId}
								readOnly
							/>
						</div>

						<div className="admin-form-group">
							<label>New Reading</label>
							<div className="input-unit-wrapper">
								<input
									type="number"
									name="readingValue"
									className="admin-input"
									placeholder="0.00"
									value={formData.readingValue}
									onChange={handleChange}
									step="0.01"
									required
								/>
								<span className="unit-label">
                                {meterDetails?.utilityTypeId === 1 ? 'kWh' : 'm³'}
                            </span>
							</div>
						</div>

						<div className="admin-form-group">
							<label>Reading Date</label>
							<input
								type="date"
								name="readingDate"
								className="admin-input"
								value={formData.readingDate}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="admin-form-group full-width">
							<label>Remarks / Notes</label>
							<textarea
								name="remarks"
								className="admin-input"
								placeholder="e.g. Verified by technician, leak suspected, etc."
								value={formData.remarks}
								onChange={handleChange}
								rows="3"
								style={{resize: 'vertical', minHeight: '80px'}}
							/>
						</div>
					</div>

					<div className="admin-form-footer reading-footer">
						<button type="button" onClick={() => navigate('/admin/meters')}
								className="admin-btn-secondary">
							Cancel
						</button>
						<button type="submit" className="admin-btn-primary" disabled={loading}>
							{loading ? 'Saving...' : 'Add Reading'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>);
}

export default AddMeterReading;