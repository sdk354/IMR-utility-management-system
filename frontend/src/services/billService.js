const API_URL = 'http://localhost:8080/api/bills';

// Helper to get headers with the Auth token
const getAuthHeaders = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const token = user?.token;
	return {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
};

const handleResponse = async (response) => {
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
};

export const billService = {
	// Updated to accept a flag for Admin/Customer context
	getAllBills: async (isAdminView = false, usePublic = false) => {
		let url;
		if (usePublic) {
			url = `${API_URL}/public`; // 👈 no auth required
		} else {
			url = isAdminView ? `${API_URL}?adminView=true` : API_URL;
		}

		const response = await fetch(url, {
			headers: usePublic ? { 'Content-Type': 'application/json' } : getAuthHeaders()
		});
		return handleResponse(response);
	},

	createBill: async (billData) => {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(billData),
		});
		return handleResponse(response);
	}
};
