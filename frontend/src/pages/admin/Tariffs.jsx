import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tariffService } from '../../services/tariffService';

function Tariffs() {
	const [tariffs, setTariffs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadTariffs = async () => {
			try {
				const data = await tariffService.getAllTariffs();
				setTariffs(data);
			} catch (err) {
				console.error("Failed to load tariffs:", err);
			} finally {
				setLoading(false);
			}
		};
		loadTariffs();
	}, []);

	const getUtilityLabel = (id) => {
		const labels = { 1: 'Electricity', 2: 'Water', 3: 'Gas' };
		return labels[id] || 'Other';
	};

	return (
		<div className="admin-page">
			<div className="admin-table-container">
				<div className="admin-page-header">
					<h3>Tariff Management</h3>
					<div className="admin-page-actions">
						<Link to="/admin/tariffs/add">
							<button className="admin-btn-primary">+ Add Tariff</button>
						</Link>
					</div>
				</div>
				<table className="admin-table">
					<thead>
					<tr>
						<th>Utility</th>
						<th>Slab (Units)</th>
						<th>Rate (Rs.)</th>
						<th>Fixed Charge</th>
						<th>Subsidy (%)</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{loading ? (
						<tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
					) : (
						tariffs.map((t) => (
							<tr key={t.id}>
								<td>{getUtilityLabel(t.utilityTypeId)}</td>
								<td>{t.slabFrom} - {t.slabTo}</td>
								<td style={{ fontWeight: 'bold' }}>Rs. {t.rate.toFixed(2)}</td>
								<td>Rs. {t.fixedCharge.toFixed(2)}</td>
								<td>{t.subsidiaryPercentage}%</td>
								<td>
									<Link to={`/admin/tariffs/add?edit=${t.id}`}>
										<button className="admin-btn-secondary">Edit</button>
									</Link>
								</td>
							</tr>
						))
					)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Tariffs;