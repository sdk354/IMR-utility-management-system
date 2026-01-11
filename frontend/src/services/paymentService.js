const API_BASE_URL = 'http://localhost:8080/api/payments';

const getAuthHeaders = () => {
	const userData = localStorage.getItem('user');
	if (!userData) return {'Content-Type': 'application/json'};

	const user = JSON.parse(userData);
	return {
		'Content-Type': 'application/json', 'Authorization': `Bearer ${user?.token}`
	};
};

export const paymentService = {
	getAllPayments: async () => {
		const response = await fetch(API_BASE_URL, {
			headers: getAuthHeaders()
		});
		if (!response.ok) throw new Error('Failed to fetch payments');
		return response.json();
	},

	getMyPayments: async () => {
		const response = await fetch(`${API_BASE_URL}/my-payments`, {
			headers: getAuthHeaders()
		});
		if (!response.ok) throw new Error('Failed to fetch your payment history');
		return response.json();
	},

	processPayment: async (paymentData) => {
		const response = await fetch(`${API_BASE_URL}/process`, {
			method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(paymentData)
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			const errorText = errorData?.message || await response.text();
			throw new Error(errorText || 'Failed to process payment');
		}
		return await response.json();
	}
};