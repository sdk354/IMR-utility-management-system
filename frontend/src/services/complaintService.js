const BASE_URL = 'http://localhost:8080/api/complaints';

const getAuthHeader = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return {
		'Authorization': `Bearer ${user?.token}`, 'Content-Type': 'application/json'
	};
};

export const complaintService = {
	getAllComplaints: async () => {
		const response = await fetch(BASE_URL, {
			headers: getAuthHeader()
		});
		if (!response.ok) throw new Error('Failed to fetch complaints');
		return await response.json();
	},

	createComplaint: async (complaintData) => {
		const response = await fetch(BASE_URL, {
			method: 'POST', headers: getAuthHeader(), body: JSON.stringify(complaintData)
		});
		if (!response.ok) {
			const error = await response.text();
			throw new Error(error || 'Failed to submit complaint');
		}
		return await response.json();
	},

	updateStatus: async (id, newStatus) => {
		const response = await fetch(`${BASE_URL}/${id}/status`, {
			method: 'PATCH', headers: getAuthHeader(), body: JSON.stringify({status: newStatus})
		});
		if (!response.ok) throw new Error('Failed to update status');
		return await response.json();
	}
};