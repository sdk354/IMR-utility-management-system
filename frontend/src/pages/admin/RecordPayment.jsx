import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {paymentService} from '../../services/paymentService';
import {billService} from '../../services/billService';

function RecordPayment() {
	const navigate = useNavigate();

	const [unpaidBills, setUnpaidBills] = useState([]);
	const [formData, setFormData] = useState({
		billId: '', amount: '', paymentMethod: 'Online'
	});

	const [loading, setLoading] = useState(false);
	const [fetchingBills, setFetchingBills] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchUnpaid = async () => {
			try {
				const data = await billService.getAllBills(false, true);
				const pending = data.filter(bill => bill.status === 'Pending' || !bill.paid);
				setUnpaidBills(pending);
			} catch (err) {
				console.error("Failed to fetch bills:", err);
				setError("Could not load unpaid bills.");
			} finally {
				setFetchingBills(false);
			}
		};
		fetchUnpaid();
	}, []);

	const handleChange = (e) => {
		const {name, value} = e.target;

		if (name === 'billId') {
			const selectedBill = unpaidBills.find(b => b.billID.toString() === value);
			setFormData(prev => ({
				...prev, billId: value, amount: selectedBill ? selectedBill.totalAmount : ''
			}));
		} else {
			setFormData(prev => ({...prev, [name]: value}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.billId) {
			setError("Please select a bill.");
			return;
		}

		setLoading(true);
		try {
			await paymentService.processPayment({
				billId: parseInt(formData.billId),
				amount: parseFloat(formData.amount),
				paymentMethod: formData.paymentMethod
			});
			alert('Payment recorded successfully!');
			navigate('/admin/payments');
		} catch (err) {
			setError(err.message || 'Transaction failed.');
		} finally {
			setLoading(false);
		}
	};

	return (<div className="admin-page">
		<div className="admin-page-header">
			<h2>Record New Payment</h2>
		</div>

		<div className="admin-form-container">
			<div className="admin-card" style={{maxWidth: '700px'}}>
				{error && <div className="error-box" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}

				<form onSubmit={handleSubmit}>
					<div className="admin-form-grid">

						<div className="admin-form-group">
							<label>Select Unpaid Bill</label>
							<select
								name="billId"
								value={formData.billId}
								onChange={handleChange}
								required
								disabled={fetchingBills}
							>
								<option value="">-- Select a Bill --</option>
								{unpaidBills.map(bill => (<option key={bill.billID} value={bill.billID}>
									Bill #{bill.billID} - {bill.user?.username || 'N/A'} (Rs. {bill.totalAmount})
								</option>))}
							</select>
							{fetchingBills && <small>Loading bills...</small>}
						</div>

						<div className="admin-form-group">
							<label>Amount (Rs.)</label>
							<input
								type="number"
								name="amount"
								value={formData.amount}
								onChange={handleChange}
								placeholder="0.00"
								required
							/>
							<small>Auto-filled from bill total</small>
						</div>

						<div className="admin-form-group">
							<label>Payment Method</label>
							<select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
								<option value="Online">Online</option>
								<option value="Cash">Cash</option>
								<option value="Card">Card</option>
								<option value="Bank Transfer">Bank Transfer</option>
							</select>
						</div>
					</div>

					<div className="admin-page-actions" style={{marginTop: '2rem'}}>
						<button type="button" onClick={() => navigate('/admin/payments')}
								className="admin-btn-secondary">
							Cancel
						</button>
						<button type="submit" className="admin-btn-primary" disabled={loading || fetchingBills}>
							{loading ? 'Processing...' : 'Record Payment'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>);
}

export default RecordPayment;