import { useState, useEffect } from 'react';
import { complaintService } from '../../services/complaintService';

function Complaints() {
	const [complaints, setComplaints] = useState([]);
	const [loading, setLoading] = useState(true);

	const formatToDisplayName = (username) => {
		if (!username) return 'N/A';
		return username
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const fetchComplaints = async () => {
		try {
			const data = await complaintService.getAllComplaints();
			setComplaints(Array.isArray(data) ? data : data.content || []);
		} catch (error) {
			console.error("Fetch failed:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchComplaints();
	}, []);

	// Function to handle the checkbox toggle
	const handleToggleStatus = async (complaint) => {
		const nextStatus = complaint.status === 'Resolved' ? 'Pending' : 'Resolved';
		try {
			await complaintService.updateStatus(complaint.id || complaint.complaintID, nextStatus);
			// Refresh list to show updated state
			fetchComplaints();
		} catch (error) {
			alert("Could not update status: " + error.message);
		}
	};

	return (
		<div className="admin-page">
			<div className="admin-table-container">
				<div className="admin-page-header">
					<h3>Complaint Management</h3>
				</div>
				<table className="admin-table">
					<thead>
					<tr>
						<th style={{ width: '80px', textAlign: 'center' }}>Resolved</th>
						<th>ID</th>
						<th>Customer</th>
						<th>Complaint Message</th>
						<th>Date Submitted</th>
					</tr>
					</thead>
					<tbody>
					{loading ? (
						<tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading complaints...</td></tr>
					) : complaints.length === 0 ? (
						<tr><td colSpan="5" style={{ textAlign: 'center' }}>No complaints found.</td></tr>
					) : (
						complaints.map((c) => (
							<tr key={c.id || c.complaintID} style={{ opacity: c.status === 'Resolved' ? 0.6 : 1 }}>
								<td style={{ textAlign: 'center' }}>
									<input
										type="checkbox"
										checked={c.status === 'Resolved'}
										onChange={() => handleToggleStatus(c)}
										style={{ cursor: 'pointer', width: '18px', height: '18px' }}
									/>
								</td>
								<td>#C{String(c.id || c.complaintID).padStart(3, '0')}</td>
								<td>
									<div style={{ fontWeight: '500' }}>
										{formatToDisplayName(c.user?.username)}
									</div>
									<small style={{ color: '#64748b' }}>{c.user?.email}</small>
								</td>
								<td style={{
									maxWidth: '400px',
									whiteSpace: 'normal',
									textDecoration: c.status === 'Resolved' ? 'line-through' : 'none'
								}}>
									{c.complaintText} {/* Updated to match database */}
								</td>
								<td>
									{/* Format the complex timestamp from DB */}
									{new Date(c.complaintDate).toLocaleDateString()}
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

export default Complaints;