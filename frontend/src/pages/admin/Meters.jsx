import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { meterService } from '../../services/meterService';

function Meters() {
	const [allMeters, setAllMeters] = useState([]);
	const [filteredMeters, setFilteredMeters] = useState([]);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [pageSize] = useState(10);

	const [showFilters, setShowFilters] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [typeFilter, setTypeFilter] = useState('All');
	const [statusFilter, setStatusFilter] = useState('All');

	const formatToDisplayName = (username) => {
		if (!username || username === 'Unassigned') return username || 'Unassigned';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	useEffect(() => {
		const fetchMeters = async () => {
			setLoading(true);
			try {
				const response = await meterService.getAllMeters(currentPage, pageSize);
				const meterArray = response && response.content ? response.content : [];
				setAllMeters(meterArray);
				setFilteredMeters(meterArray);
				setTotalPages(response.totalPages || 0);
			} catch (error) {
				console.error("Failed to load meters:", error);
				setAllMeters([]);
				setFilteredMeters([]);
			} finally {
				setLoading(false);
			}
		};
		fetchMeters();
	}, [currentPage, pageSize]);

	useEffect(() => {
		let results = allMeters;

		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			results = results.filter(m =>
				(m.serialNumber && m.serialNumber.toLowerCase().includes(term)) ||
				(m.customerName && formatToDisplayName(m.customerName).toLowerCase().includes(term))
			);
		}

		if (typeFilter !== 'All') {
			const typeMapping = { 'Electricity': 1, 'Water': 2, 'Gas': 3 };
			results = results.filter(m => m.utilityTypeId === typeMapping[typeFilter]);
		}

		if (statusFilter !== 'All') {
			results = results.filter(m => m.status === statusFilter);
		}

		setFilteredMeters(results);
	}, [searchTerm, typeFilter, statusFilter, allMeters]);

	const getStatusClass = (status) => {
		switch (status) {
			case 'Live': return 'admin-status completed';
			case 'Under Repair': return 'admin-status pending';
			case 'Suspended': return 'admin-status incompleted';
			default: return 'admin-status';
		}
	};

	return (
		<div className="admin-page">
			<div className="admin-table-container">
				<div className="admin-page-header">
					<h3>Meter Management</h3>
					<div className="admin-page-actions">
						<button
							className={`admin-btn-secondary ${showFilters ? 'active' : ''}`}
							onClick={() => setShowFilters(!showFilters)}
						>
							{showFilters ? 'Hide Filters' : 'Filters'}
						</button>
						<Link to="/admin/meters/register">
							<button className="admin-btn-primary">+ Register Meter</button>
						</Link>
					</div>
				</div>

				{showFilters && (
					<div className="admin-filter-panel">
						<div className="filter-grid-container">
							<div className="filter-field">
								<label className="small-label">Search Meter No / Customer</label>
								<input
									type="text"
									className="admin-input"
									placeholder="Type to search..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							<div className="filter-field">
								<label className="small-label">Utility Type</label>
								<div className="filter-chip-group">
									{['All', 'Electricity', 'Water', 'Gas'].map((type) => (
										<button
											key={type}
											className={`filter-chip ${typeFilter === type ? 'active' : ''}`}
											onClick={() => setTypeFilter(type)}
										>
											{type}
										</button>
									))}
								</div>
							</div>

							<div className="filter-field">
								<label className="small-label">Status</label>
								<div className="filter-chip-group">
									{['All', 'Live', 'Under Repair', 'Suspended'].map((status) => (
										<button
											key={status}
											className={`filter-chip ${statusFilter === status ? 'active' : ''}`}
											onClick={() => setStatusFilter(status)}
										>
											{status}
										</button>
									))}
								</div>
							</div>

							<div className="filter-actions">
								<button
									className="reset-link"
									onClick={() => { setSearchTerm(''); setTypeFilter('All'); setStatusFilter('All'); }}
								>
									Reset All
								</button>
							</div>
						</div>
					</div>
				)}

				<table className="admin-table">
					<thead>
					<tr>
						<th>Meter No</th>
						<th>Customer</th>
						<th>Utility Type</th>
						<th>Status</th>
						<th>Actions</th>
						<th>Reading</th>
					</tr>
					</thead>
					<tbody>
					{loading ? (
						<tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
					) : filteredMeters.length === 0 ? (
						<tr><td colSpan="6" style={{ textAlign: 'center' }}>No matches found.</td></tr>
					) : (
						filteredMeters.map((meter) => (
							<tr key={meter.id}>
								<td>{meter.serialNumber}</td>
								<td>{formatToDisplayName(meter.customerName)}</td>
								<td>
									{{ 1: 'Electricity', 2: 'Water', 3: 'Gas' }[meter.utilityTypeId] || 'Unknown'}
								</td>
								<td>
                               <span className={getStatusClass(meter.status)}>
                                  {meter.status}
                               </span>
								</td>
								<td>
									<Link to={`/admin/meters/register?edit=${meter.id}`}>
										<button className="admin-btn-secondary">Edit</button>
									</Link>
								</td>
								<td>
									<Link to={`/admin/meters/newreading?meterId=${meter.id}`}>
										<button className="admin-btn-secondary">+</button>
									</Link>
								</td>
							</tr>
						))
					)}
					</tbody>
				</table>

				<div className="admin-pagination-footer" style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '1rem 0',
					borderTop: '1px solid #eee',
					marginTop: '1rem'
				}}>
					<div className="pagination-info">
						Showing Page {currentPage + 1} of {totalPages}
					</div>
					<div className="pagination-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
						<button
							className="admin-btn-secondary"
							disabled={currentPage === 0 || loading}
							onClick={() => setCurrentPage(prev => prev - 1)}
						>
							Previous
						</button>
						<button
							className="admin-btn-secondary"
							disabled={currentPage >= totalPages - 1 || loading}
							onClick={() => setCurrentPage(prev => prev + 1)}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Meters;