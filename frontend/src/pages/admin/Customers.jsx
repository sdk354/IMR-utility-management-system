import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {customerService} from '../../services/customerService';

function Customers() {
	const [allCustomers, setAllCustomers] = useState([]);
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showFilters, setShowFilters] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [citySearch, setCitySearch] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');

	const formatToDisplayName = (username) => {
		if (!username) return 'N/A';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const data = await customerService.getAllCustomers();
				const onlyCustomers = data.filter(user => user.role && user.role.roleName && user.role.roleName.toLowerCase() !== 'admin');
				setAllCustomers(onlyCustomers);
				setFilteredCustomers(onlyCustomers);
			} catch (error) {
				console.error("Failed to load customers:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchCustomers();
	}, []);

	useEffect(() => {
		let results = allCustomers;

		if (searchTerm) {
			results = results.filter(c => formatToDisplayName(c.username).toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toString().includes(searchTerm));
		}

		if (citySearch) {
			const term = citySearch.toLowerCase();
			results = results.filter(c => (c.city && c.city.toLowerCase().includes(term)) || (c.street && c.street.toLowerCase().includes(term)) || (c.streetNo && c.streetNo.toLowerCase().includes(term)));
		}

		if (statusFilter !== 'All') {
			results = results.filter(c => c.status === statusFilter);
		}

		setFilteredCustomers(results);
	}, [searchTerm, citySearch, statusFilter, allCustomers]);

	const getStatusClass = (status) => {
		switch (status?.toLowerCase()) {
			case 'active':
				return 'admin-status completed';
			case 'inactive':
				return 'admin-status incompleted';
			case 'pending':
				return 'admin-status pending';
			default:
				return 'admin-status';
		}
	};

	const statusOptions = [{label: 'All', value: 'All'}, {label: 'Active', value: 'Active'}, {
		label: 'Inactive', value: 'Inactive'
	}, {label: 'Pending', value: 'Pending'}];

	return (<div className="admin-page">
		<div className="admin-table-container">
			<div className="admin-page-header">
				<h3>Customer Details</h3>
				<div className="admin-page-actions">
					<button
						className={`admin-btn-secondary ${showFilters ? 'active' : ''}`}
						onClick={() => setShowFilters(!showFilters)}
					>
						{showFilters ? 'Hide Filters' : 'Filters'}
					</button>
					<Link to="/admin/customers/add">
						<button className="admin-btn-primary">+ Add New Customer</button>
					</Link>
				</div>
			</div>

			{showFilters && (<div className="admin-filter-panel">
				<div className="filter-grid-container">
					<div className="filter-field">
						<label className="small-label">Search Name / Email / ID</label>
						<input
							type="text"
							className="admin-input"
							placeholder="Type to search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<div className="filter-field">
						<label className="small-label">Search City / Address</label>
						<input
							type="text"
							className="admin-input"
							placeholder="e.g. Galle Road or Colombo"
							value={citySearch}
							onChange={(e) => setCitySearch(e.target.value)}
						/>
					</div>

					<div className="filter-field status-field">
						<label className="small-label">Status</label>
						<div className="filter-chip-group">
							{statusOptions.map((opt) => (<button
								key={opt.value}
								type="button"
								className={`filter-chip ${statusFilter === opt.value ? 'active' : ''}`}
								onClick={() => setStatusFilter(opt.value)}
							>
								{opt.label}
							</button>))}
						</div>
					</div>

					<div className="filter-actions">
						<button
							type="button"
							className="reset-link"
							onClick={() => {
								setSearchTerm('');
								setStatusFilter('All');
								setCitySearch('');
							}}
						>
							Reset All
						</button>
					</div>
				</div>
			</div>)}

			<table className="admin-table">
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Phone No</th>
					<th>Email</th>
					<th>Address</th>
					<th>City</th>
					<th>Status</th>
					<th>Payments</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{loading ? (<tr>
					<td colSpan="9" style={{textAlign: 'center'}}>Loading customers...</td>
				</tr>) : filteredCustomers.length === 0 ? (<tr>
					<td colSpan="9" style={{textAlign: 'center'}}>No matches found.</td>
				</tr>) : (filteredCustomers.map((customer) => (<tr key={customer.id}>
					<td>#{customer.id}</td>
					<td>{formatToDisplayName(customer.username)}</td>
					<td>{customer.contactNo || 'N/A'}</td>
					<td>{customer.email}</td>
					<td>{customer.streetNo ? `${customer.streetNo}, ` : ''}{customer.street || 'N/A'}</td>
					<td>{customer.city || 'N/A'}</td>
					<td>
                            <span className={getStatusClass(customer.status)}>
                                {customer.status || 'Unknown'}
                            </span>
					</td>
					<td>
						<Link to={`/admin/customers/view/${customer.id}`}>
							<button className="admin-btn-secondary">View</button>
						</Link>
					</td>
					<td>
						<Link to={`/admin/customers/add?edit=${customer.id}`}>
							<button className="admin-btn-secondary">Edit</button>
						</Link>
					</td>
				</tr>)))}
				</tbody>
			</table>
		</div>
	</div>);
}

export default Customers;